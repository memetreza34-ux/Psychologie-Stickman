#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';
import {countCoverWords, resolveCoverPolicy} from './lib/cover-policy.mjs';

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
let flowCoverChecked = 0;
let remotionCoverChecked = 0;
let legacy = 0;
const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

for (const file of files) {
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  if (String(plan.format ?? '').toLowerCase() !== 'youtube') continue;
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length || scenes[0]?.isCover !== true) continue;

  const labels = Array.isArray(plan.sceneLabels) ? plan.sceneLabels : [];
  const coverLabels = labels.filter((label) => label.scene === 1 && (label.variant ?? 'keyword') === 'cover');
  const keywordLabels = labels.filter((label) => (label.variant ?? 'keyword') !== 'cover');
  const coverPolicy = resolveCoverPolicy(plan, file);
  const isV2 = plan.finalTextOverlayPolicy === 'FLOW_COVER_TITLE_KEYWORDS_V2' || coverPolicy.isGoogleFlow;
  const isV1 = plan.finalTextOverlayPolicy === 'SELECTIVE_GERMAN_KEYWORDS_V1';

  if (!isV2 && !isV1) {
    legacy += 1;
    warnings.push(`${relative}: legacy text policy; upgrade before the next Scene-01 generation.`);
    continue;
  }

  if (isV2) {
    flowCoverChecked += 1;
    const headlineWords = countCoverWords(coverPolicy.coverHeadline);
    if (!coverPolicy.isGoogleFlow) failures.push(`${relative}: V2 requires coverTextRenderer=GOOGLE_FLOW.`);
    if (headlineWords < 2 || headlineWords > 7) failures.push(`${relative}: Flow cover headline must contain 2-7 words.`);
    if (coverPolicy.flowSourceImageTextPolicy !== 'SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY') failures.push(`${relative}: wrong Flow source-image text policy for V2.`);
    if (coverLabels.length > 0) warnings.push(`${relative}: legacy cover label remains in Phase 1 metadata; mapping will strip it so Remotion does not duplicate the Flow title.`);
  } else {
    remotionCoverChecked += 1;
    if (coverLabels.length !== 1) failures.push(`${relative}: legacy V1 requires exactly one scene-1 Remotion cover label.`);
    else {
      const words = countWords(coverLabels[0].text);
      if (words < 2 || words > 7) failures.push(`${relative}: cover headline must contain 2-7 words.`);
    }
  }

  const labelsForValidation = isV2 ? keywordLabels : labels;
  const scenesWithLabels = new Set();
  labelsForValidation.forEach((label, index) => {
    const variant = label.variant ?? 'keyword';
    if (!Number.isInteger(label.scene) || label.scene < 1 || label.scene > scenes.length) {
      failures.push(`${relative}: label ${index} references invalid scene ${label.scene}.`);
      return;
    }
    if (scenesWithLabels.has(label.scene)) failures.push(`${relative}: scene ${label.scene} has more than one Remotion overlay.`);
    scenesWithLabels.add(label.scene);
    if (isV2 && variant !== 'keyword') failures.push(`${relative}: V2 Remotion labels may only use variant="keyword".`);
    if (variant === 'cover' && label.scene !== 1) failures.push(`${relative}: cover variant is only allowed on scene 1.`);
    if (variant === 'keyword' && countWords(label.text) > 5) failures.push(`${relative}: scene ${label.scene} keyword exceeds 5 words.`);
    if (!['cover', 'keyword'].includes(variant)) failures.push(`${relative}: scene ${label.scene} uses unsupported variant '${variant}'.`);
  });

  const visibleTextMoments = labelsForValidation.length + (isV2 ? 1 : 0);
  const maxMoments = Math.max(1, Math.ceil(scenes.length * 0.3));
  if (visibleTextMoments > maxMoments) failures.push(`${relative}: visible text density ${visibleTextMoments}/${scenes.length} exceeds 30% (${maxMoments}).`);

  const share = scenes.length ? visibleTextMoments / scenes.length : 0;
  if (scenes.length >= 20 && share < 0.12) warnings.push(`${relative}: only ${visibleTextMoments}/${scenes.length} scenes use visible text moments.`);
  if (plan.visibleTextLanguage && plan.visibleTextLanguage !== 'de') failures.push(`${relative}: visibleTextLanguage must be 'de'.`);
  if (plan.renderGermanLabelsInRemotion === false && keywordLabels.length) failures.push(`${relative}: Remotion keywords exist but renderGermanLabelsInRemotion=false.`);

  console.log(`${relative}: ${visibleTextMoments}/${scenes.length} visible text moments (${Math.round(share * 100)}%); cover=${isV2 ? 'Google Flow' : 'Remotion legacy'}.`);
}

if (warnings.length) {
  console.warn('\nYOUTUBE TEXT OVERLAY QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error('\nYOUTUBE TEXT OVERLAY QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`\nYOUTUBE TEXT OVERLAY QA: PASS — ${flowCoverChecked} Flow-cover project(s), ${remotionCoverChecked} Remotion-cover legacy project(s), ${legacy} older project(s).\n`);
