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
const allowedRepresentation = new Set(['CHARACTER_SCENE', 'OBJECT_FOCUS', 'ENVIRONMENT_SCENE', 'SCHEMA_EXPLAINER', 'COMPARE_VISUAL', 'TEXT_ILLUSTRATION', 'OBJECT_METAPHOR']);
const flatRiskTypes = new Set(['SCHEMA_EXPLAINER', 'TEXT_ILLUSTRATION']);

for (const file of files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;
  if (plan.visualDirectorPolicy !== 'OBSERVABLE_SCENE_FIRST_V1') continue;

  const activeWorld = plan.visualWorld === 'PSYCHOLOGY_STICKMAN_WORLD_V1' || plan.visualWorldStatus === 'ACTIVE';
  if (!activeWorld) {
    warnings.push(`${relative}: historical/non-active visual world; strict representation-first QA skipped.`);
    continue;
  }

  const representationCounts = {};
  let currentCharacterRun = 0;
  let longestCharacterRun = 0;
  let currentFlatRun = 0;
  let longestFlatRun = 0;

  for (const scene of scenes) {
    const n = scene.scene ?? scene.number ?? '?';
    if (!allowedComposition.has(scene.compositionType)) failures.push(`${relative}: scene ${n} missing/invalid compositionType.`);
    if (!allowedSocial.has(scene.socialDensity)) failures.push(`${relative}: scene ${n} missing/invalid socialDensity.`);
    const sceneType = String(scene.sceneType ?? '').trim();
    if (!sceneType) failures.push(`${relative}: scene ${n} missing sceneType.`);
    else if (!allowedRepresentation.has(sceneType)) failures.push(`${relative}: scene ${n} uses invalid representation '${sceneType}'.`);
    if (!String(scene.viewerTakeaway ?? '').trim()) failures.push(`${relative}: scene ${n} missing viewerTakeaway.`);
    if (!String(scene.observableEvidence ?? '').trim()) failures.push(`${relative}: scene ${n} missing observableEvidence.`);
    if (!String(scene.dominantRelation ?? '').trim()) failures.push(`${relative}: scene ${n} missing dominantRelation.`);
    if (!String(scene.representationReason ?? '').trim()) failures.push(`${relative}: scene ${n} missing representationReason.`);

    representationCounts[sceneType] = (representationCounts[sceneType] ?? 0) + 1;

    if (sceneType === 'CHARACTER_SCENE') {
      currentCharacterRun += 1;
      longestCharacterRun = Math.max(longestCharacterRun, currentCharacterRun);
    } else currentCharacterRun = 0;

    const explicitFlatCompare = sceneType === 'COMPARE_VISUAL' && /schema|diagram|graphic|circle|arrow|panel|board|flat/iu.test(`${scene.observableEvidence ?? ''} ${scene.camera ?? ''}`);
    if (flatRiskTypes.has(sceneType) || explicitFlatCompare) {
      currentFlatRun += 1;
      longestFlatRun = Math.max(longestFlatRun, currentFlatRun);
    } else currentFlatRun = 0;

    const textItems = Array.isArray(scene.flowText) ? scene.flowText : (scene.flowText ? [scene.flowText] : []);
    if (textItems.length > 3 && sceneType !== 'COMPARE_VISUAL') warnings.push(`${relative}: scene ${n} has ${textItems.length} visible text items; verify phone readability.`);

    if (/tiny|small figures|mini[- ]?figures|many arrows|dense arrows|many panels|mini[- ]?panels/iu.test(`${scene.observableEvidence ?? ''} ${scene.visualTask ?? ''}`)) {
      warnings.push(`${relative}: scene ${n} explicitly risks tiny/dense visual elements; simplify for mobile.`);
    }
  }

  const types = Object.keys(representationCounts).filter(Boolean);
  const characterCount = representationCounts.CHARACTER_SCENE ?? 0;
  const characterShare = scenes.length ? characterCount / scenes.length : 0;

  if (scenes.length >= 10 && types.length === 1) failures.push(`${relative}: all scenes use one representation; representation-first planning was not applied.`);

  if (scenes.length >= 10 && characterShare >= 0.75) {
    const justification = String(plan.characterHeavyJustification ?? '').trim();
    const message = `${relative}: ${characterCount}/${scenes.length} scenes (${Math.round(characterShare * 100)}%) are full CHARACTER_SCENE.`;
    if (!justification) failures.push(`${message} Add characterHeavyJustification only if human behavior is genuinely essential; otherwise rework representations.`);
    else warnings.push(`${message} Explicit justification present; verify it is genuinely necessary.`);
  }

  if (longestCharacterRun >= 4) warnings.push(`${relative}: ${longestCharacterRun} consecutive CHARACTER_SCENEs; review for object/text/environment alternatives.`);
  if (longestFlatRun >= 3) warnings.push(`${relative}: ${longestFlatRun} consecutive flat explainer-risk scenes; review for richer environment/object/camera staging instead of repeated board/diagram layouts.`);
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
