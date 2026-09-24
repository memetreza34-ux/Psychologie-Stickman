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
let checked = 0;
let legacy = 0;

const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

for (const file of files) {
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  if (String(plan.format ?? '').toLowerCase() !== 'youtube') continue;
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length || scenes[0]?.isCover !== true) continue;

  const isNewPolicy = plan.finalTextOverlayPolicy === 'SELECTIVE_GERMAN_KEYWORDS_V1';
  if (!isNewPolicy) {
    legacy += 1;
    warnings.push(`${relative}: legacy COVER_LOCK project without SELECTIVE_GERMAN_KEYWORDS_V1; upgrade before its next final Phase-3 render.`);
    continue;
  }

  checked += 1;
  const labels = Array.isArray(plan.sceneLabels) ? plan.sceneLabels : [];
  const coverLabels = labels.filter((label) => label.scene === 1 && (label.variant ?? 'keyword') === 'cover');

  if (coverLabels.length !== 1) {
    failures.push(`${relative}: requires exactly one scene-1 cover label with variant="cover".`);
  } else {
    const words = countWords(coverLabels[0].text);
    if (words < 2 || words > 7) failures.push(`${relative}: cover headline must contain 2-7 words.`);
  }

  const scenesWithLabels = new Set();
  labels.forEach((label, index) => {
    const variant = label.variant ?? 'keyword';
    if (!Number.isInteger(label.scene) || label.scene < 1 || label.scene > scenes.length) {
      failures.push(`${relative}: sceneLabels[${index}] references invalid scene ${label.scene}.`);
      return;
    }
    if (scenesWithLabels.has(label.scene)) failures.push(`${relative}: scene ${label.scene} has more than one overlay.`);
    scenesWithLabels.add(label.scene);

    if (variant === 'cover' && label.scene !== 1) failures.push(`${relative}: cover variant is only allowed on scene 1.`);
    if (variant === 'keyword' && countWords(label.text) > 5) failures.push(`${relative}: scene ${label.scene} keyword exceeds 5 words.`);
    if (!['cover', 'keyword'].includes(variant)) failures.push(`${relative}: scene ${label.scene} uses unsupported variant '${variant}'.`);
  });

  const maxLabels = Math.max(1, Math.ceil(scenes.length * 0.3));
  if (labels.length > maxLabels) {
    failures.push(`${relative}: overlay density ${labels.length}/${scenes.length} exceeds the 30% hard maximum (${maxLabels}).`);
  }

  const share = scenes.length ? labels.length / scenes.length : 0;
  if (scenes.length >= 20 && share < 0.12) {
    warnings.push(`${relative}: only ${labels.length}/${scenes.length} scenes use overlays; confirm that the video does not miss useful key-term moments.`);
  }

  if (plan.flowSourceImageTextPolicy !== 'NONE') {
    failures.push(`${relative}: Flow source-image text policy must be NONE.`);
  }
  if (plan.visibleTextLanguage !== 'de') {
    failures.push(`${relative}: visibleTextLanguage must be 'de'.`);
  }
  if (plan.renderGermanLabelsInRemotion !== true) {
    failures.push(`${relative}: renderGermanLabelsInRemotion must be true.`);
  }

  console.log(`${relative}: ${labels.length}/${scenes.length} overlay scenes (${Math.round(share * 100)}%); cover=${coverLabels.length}.`);
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

console.log(`\nYOUTUBE TEXT OVERLAY QA: PASS — ${checked} new-policy project(s) checked; ${legacy} legacy project(s) warned.\n`);
