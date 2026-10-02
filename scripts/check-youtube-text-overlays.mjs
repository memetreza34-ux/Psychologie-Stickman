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
const countWords = (value) => String(value ?? '').trim().split(/\s+/u).filter(Boolean).length;
const toTexts = (value) => (Array.isArray(value) ? value : [value]).map((item) => String(item ?? '').trim()).filter(Boolean);
const allowedKinds = new Set(['cover', 'keyword', 'term', 'speech', 'schema', 'comparison', 'text_illustration']);

for (const file of files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;

  const finalTextPolicy = String(plan.finalTextPolicy ?? plan.finalTextOverlayPolicy ?? '').trim();
  if (finalTextPolicy !== 'FLOW_VISIBLE_TEXT_ONLY_V3') {
    warnings.push(`${relative}: historical text policy retained.`);
    continue;
  }

  if (String(plan.visibleTextRenderer ?? '').toUpperCase() !== 'GOOGLE_FLOW') failures.push(`${relative}: visibleTextRenderer must be GOOGLE_FLOW.`);
  if (plan.renderGermanLabelsInRemotion !== false) failures.push(`${relative}: renderGermanLabelsInRemotion must be false.`);

  const moments = Array.isArray(plan.flowTextMoments) ? plan.flowTextMoments : [];
  const seen = new Set();
  let coverCount = 0;

  moments.forEach((moment, index) => {
    const scene = Number(moment.scene);
    const texts = toTexts(moment.text);
    const kind = String(moment.kind ?? (scene === 1 ? 'cover' : 'keyword')).toLowerCase();

    if (!Number.isInteger(scene) || scene < 1 || scene > scenes.length) {
      failures.push(`${relative}: flowTextMoments[${index}] has invalid scene.`);
      return;
    }
    if (seen.has(scene)) failures.push(`${relative}: duplicate text moment for scene ${scene}.`);
    seen.add(scene);
    if (!allowedKinds.has(kind)) failures.push(`${relative}: unsupported text kind '${kind}'.`);
    if (!texts.length) failures.push(`${relative}: scene ${scene} text is empty.`);
    if (texts.length > 4) failures.push(`${relative}: scene ${scene} has too many text strings.`);

    if (scene === 1) {
      coverCount += 1;
      const words = countWords(texts[0] ?? '');
      if (words < 2 || words > 7) failures.push(`${relative}: cover title must contain 2-7 words.`);
    } else {
      for (const text of texts) if (countWords(text) > 5) failures.push(`${relative}: scene ${scene} text exceeds 5 words.`);
    }
  });

  if (moments.length && coverCount !== 1) failures.push(`${relative}: exactly one Scene-01 cover text moment is required.`);
  const maxMoments = Math.max(1, Math.ceil(scenes.length * 0.3));
  if (moments.length > maxMoments) failures.push(`${relative}: text density exceeds 30%.`);
}

if (warnings.length) {
  console.warn('\nYOUTUBE FLOW TEXT QA: WARNINGS\n');
  warnings.forEach((x) => console.warn(`- ${x}`));
}
if (failures.length) {
  console.error('\nYOUTUBE FLOW TEXT QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('\nYOUTUBE FLOW TEXT QA: PASS\n');
