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

  const hardenedSequence = plan.visualSequencePolicy === 'VISUAL_SEQUENCE_HARDENING_V1';
  const representationCounts = {};
  let currentCharacterRun = 0;
  let longestCharacterRun = 0;
  let currentFlatRun = 0;
  let longestFlatRun = 0;
  let currentMotifRun = 0;
  let longestMotifRun = 0;
  let previousMotif = null;
  let motifFailureReported = false;

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

    if (hardenedSequence) {
      const motifKey = String(scene.motifKey ?? '').trim();
      const visualChangeReason = String(scene.visualChangeReason ?? '').trim();
      const panelCount = Number(scene.panelCount);

      if (!motifKey) failures.push(`${relative}: scene ${n} missing motifKey under VISUAL_SEQUENCE_HARDENING_V1.`);
      if (!visualChangeReason) failures.push(`${relative}: scene ${n} missing visualChangeReason under VISUAL_SEQUENCE_HARDENING_V1.`);
      if (!Number.isInteger(panelCount) || panelCount < 1) failures.push(`${relative}: scene ${n} missing/invalid panelCount under VISUAL_SEQUENCE_HARDENING_V1.`);
      if (Number.isInteger(panelCount) && panelCount > 2) {
        const justification = String(scene.panelCountJustification ?? '').trim();
        if (!justification) failures.push(`${relative}: scene ${n} has panelCount=${panelCount}; default maximum is 2. Split/reframe or add exceptional panelCountJustification.`);
        else warnings.push(`${relative}: scene ${n} has panelCount=${panelCount} with exceptional justification; verify mobile readability manually.`);
      }

      if (motifKey && motifKey === previousMotif) currentMotifRun += 1;
      else currentMotifRun = motifKey ? 1 : 0;
      previousMotif = motifKey || null;
      longestMotifRun = Math.max(longestMotifRun, currentMotifRun);

      if (currentMotifRun >= 3 && !motifFailureReported) {
        const justification = String(scene.motifProgressionJustification ?? plan.motifProgressionJustification ?? '').trim();
        if (!justification) {
          failures.push(`${relative}: scenes include ${currentMotifRun}+ adjacent uses of motifKey '${motifKey}' without motifProgressionJustification. Redesign the motif progression.`);
          motifFailureReported = true;
        } else warnings.push(`${relative}: repeated motifKey '${motifKey}' has explicit justification; verify action/context/camera materially progress.`);
      }

      const combined = `${scene.observableEvidence ?? ''} ${scene.camera ?? ''} ${scene.dominantRelation ?? ''}`;
      if (/three[- ]?(?:stage|part|panel|state)|3[- ]?(?:stage|part|panel|state)|three distinct states/iu.test(combined) && !(Number.isInteger(panelCount) && panelCount > 2 && String(scene.panelCountJustification ?? '').trim())) {
        failures.push(`${relative}: scene ${n} still describes a 3-part/3-stage visual under the max-two-state policy.`);
      }
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
  if (hardenedSequence && longestMotifRun >= 3) warnings.push(`${relative}: longest repeated motifKey run is ${longestMotifRun}; verify any explicit justification is genuinely necessary.`);
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
