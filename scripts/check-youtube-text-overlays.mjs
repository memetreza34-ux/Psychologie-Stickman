#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const root = path.resolve('youtube');
const files = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'phase1-scenes.json') files.push(full);
  }
};
walk(root);

const failures = [];
const warnings = [];
let flowOnlyChecked = 0;
let legacy = 0;
const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;
const toTexts = (value) => (Array.isArray(value) ? value : [value]).map((item) => String(item ?? '').trim()).filter(Boolean);
const allowedKinds = new Set(['cover', 'keyword', 'schema', 'comparison', 'text_illustration']);

for (const file of files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  if (String(plan.format ?? '').toLowerCase() !== 'youtube') continue;
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;

  const sidecarPath = path.join(path.dirname(file), 'flow-text-policy.json');
  const sidecar = fs.existsSync(sidecarPath) ? JSON.parse(fs.readFileSync(sidecarPath, 'utf8')) : null;
  const finalTextPolicy = String(sidecar?.finalTextPolicy ?? plan.finalTextPolicy ?? plan.finalTextOverlayPolicy ?? '').trim();
  const isV3 = finalTextPolicy === 'FLOW_VISIBLE_TEXT_ONLY_V3';

  if (!isV3) {
    legacy += 1;
    warnings.push(`${relative}: legacy text policy. New YouTube projects must use FLOW_VISIBLE_TEXT_ONLY_V3 with all visible text baked by Google Flow.`);
    continue;
  }

  flowOnlyChecked += 1;
  const renderer = String(sidecar?.visibleTextRenderer ?? plan.visibleTextRenderer ?? '').toUpperCase();
  const remotionText = sidecar?.renderGermanLabelsInRemotion ?? plan.renderGermanLabelsInRemotion;
  const moments = Array.isArray(sidecar?.flowTextMoments) ? sidecar.flowTextMoments : (Array.isArray(plan.flowTextMoments) ? plan.flowTextMoments : []);
  const labels = Array.isArray(plan.sceneLabels) ? plan.sceneLabels : [];
  const isV2 = plan.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';

  if (renderer !== 'GOOGLE_FLOW') failures.push(`${relative}: V3 requires visibleTextRenderer=GOOGLE_FLOW.`);
  if (remotionText !== false) failures.push(`${relative}: V3 requires renderGermanLabelsInRemotion=false.`);
  if ((sidecar?.flowSourceImageTextPolicy ?? plan.flowSourceImageTextPolicy) !== 'PLANNED_EXACT_GERMAN_TEXT_ONLY') failures.push(`${relative}: wrong Flow text policy for V3.`);
  if (labels.length > 0) warnings.push(`${relative}: legacy sceneLabels still exist in Phase 1 metadata; map-phase1 must strip them under V3.`);

  const seen = new Set();
  let coverCount = 0;
  moments.forEach((moment, index) => {
    const scene = Number(moment.scene);
    const texts = toTexts(moment.text);
    const kind = String(moment.kind ?? (scene === 1 ? 'cover' : 'keyword')).trim().toLowerCase();
    if (!Number.isInteger(scene) || scene < 1 || scene > scenes.length) {
      failures.push(`${relative}: flowTextMoments[${index}] references invalid scene ${moment.scene}.`);
      return;
    }
    if (seen.has(scene)) failures.push(`${relative}: scene ${scene} has more than one Flow text moment.`);
    seen.add(scene);
    if (!texts.length) failures.push(`${relative}: scene ${scene} Flow text is empty.`);
    if (texts.length > 4) failures.push(`${relative}: scene ${scene} has ${texts.length} text strings; maximum is 4.`);
    if (!allowedKinds.has(kind)) failures.push(`${relative}: scene ${scene} has unsupported Flow text kind '${kind}'.`);

    if (scene === 1) {
      coverCount += 1;
      if (kind !== 'cover') failures.push(`${relative}: scene 1 Flow text must use kind=cover.`);
      const titleWords = countWords(texts[0] ?? '');
      if (titleWords < 2 || titleWords > 7) failures.push(`${relative}: cover title must contain 2-7 words.`);
      texts.slice(1).forEach((text) => {
        if (countWords(text) > 4) failures.push(`${relative}: scene 1 secondary text '${text}' must contain at most 4 words.`);
      });
    } else {
      texts.forEach((text) => {
        if (countWords(text) < 1 || countWords(text) > 5) failures.push(`${relative}: scene ${scene} Flow text '${text}' must contain 1-5 words.`);
      });
      if (!isV2 && kind !== 'keyword') failures.push(`${relative}: legacy later Flow text scene ${scene} must use kind=keyword.`);
    }
  });

  if (coverCount !== 1) failures.push(`${relative}: V3 requires exactly one Scene-01 Flow cover moment.`);
  const maxMoments = Math.max(1, Math.ceil(scenes.length * 0.3));
  if (moments.length > maxMoments) failures.push(`${relative}: Flow text density ${moments.length}/${scenes.length} exceeds 30% (${maxMoments}).`);
  const share = scenes.length ? moments.length / scenes.length : 0;
  if (scenes.length >= 20 && share < 0.12) warnings.push(`${relative}: only ${moments.length}/${scenes.length} scenes have planned Flow text; confirm this is intentional.`);

  const scene1 = scenes.find((scene, index) => Number(scene?.number ?? scene?.scene ?? index + 1) === 1);
  if (isV2 && scene1) {
    const flowTexts = toTexts(scene1.flowText);
    const coverMoment = moments.find((moment) => Number(moment.scene) === 1);
    const momentTexts = toTexts(coverMoment?.text);
    if (flowTexts.length && JSON.stringify(flowTexts) !== JSON.stringify(momentTexts)) {
      failures.push(`${relative}: Scene 01 flowText must match Scene-01 flowTextMoments exactly.`);
    }
  }

  console.log(`${relative}: ${moments.length}/${scenes.length} Flow text moments (${Math.round(share * 100)}%); Remotion text disabled.`);
}

if (warnings.length) {
  console.warn('\nYOUTUBE FLOW TEXT QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error('\nYOUTUBE FLOW TEXT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`\nYOUTUBE FLOW TEXT QA: PASS — ${flowOnlyChecked} Flow-only project(s) checked; ${legacy} legacy project(s) warned.\n`);
