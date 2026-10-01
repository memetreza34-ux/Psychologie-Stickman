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
const allowedComposition = new Set(['standard', 'split', 'contrast', 'montage']);
const allowedSocial = new Set(['solo', 'duo', 'group', 'none']);

for (const file of files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;
  if (plan.visualDirectorPolicy !== 'OBSERVABLE_SCENE_FIRST_V1') continue;

  const representationCounts = {};
  for (const scene of scenes) {
    const n = scene.scene ?? scene.number ?? '?';
    if (!allowedComposition.has(scene.compositionType)) failures.push(`${relative}: scene ${n} missing/invalid compositionType.`);
    if (!allowedSocial.has(scene.socialDensity)) failures.push(`${relative}: scene ${n} missing/invalid socialDensity.`);
    if (!String(scene.sceneType ?? '').trim()) failures.push(`${relative}: scene ${n} missing sceneType.`);
    if (!String(scene.viewerTakeaway ?? '').trim()) failures.push(`${relative}: scene ${n} missing viewerTakeaway.`);
    if (!String(scene.observableEvidence ?? '').trim()) failures.push(`${relative}: scene ${n} missing observableEvidence.`);
    if (!String(scene.dominantRelation ?? '').trim()) failures.push(`${relative}: scene ${n} missing dominantRelation.`);
    representationCounts[scene.sceneType] = (representationCounts[scene.sceneType] ?? 0) + 1;
  }

  if (scenes.length >= 10 && Object.keys(representationCounts).length === 1) warnings.push(`${relative}: all scenes use one representation; verify this is intentional.`);
  if (plan.visualWorldStatus === 'UNDEFINED') warnings.push(`${relative}: visual world is UNDEFINED; Phase 2 generation must remain blocked.`);
}

if (warnings.length) {
  console.warn('\nVISUAL VARIETY QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error('\nVISUAL VARIETY QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nVISUAL VARIETY QA: PASS\n');
