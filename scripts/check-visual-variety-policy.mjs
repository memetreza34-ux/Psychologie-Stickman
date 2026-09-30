#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const youtubeRoot = path.resolve('youtube');
const phase1Files = [];
const promptFiles = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'phase1-scenes.json') phase1Files.push(full);
    else if (entry.isFile() && entry.name === 'google-flow-prompt.txt') promptFiles.push(full);
  }
};
walk(youtubeRoot);

const failures = [];
const warnings = [];
let newPlans = 0;
let legacyPlans = 0;
let newPrompts = 0;

const allowedComposition = new Set(['standard', 'split', 'contrast', 'montage']);
const allowedSocial = new Set(['solo', 'duo', 'group', 'none']);
const allowedMoods = new Set(['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE']);

for (const file of phase1Files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  if (String(plan.format ?? '').toLowerCase() !== 'youtube') continue;
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;

  const isV2 = plan.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
  const observableV1 = plan.visualDirectorPolicy === 'OBSERVABLE_SCENE_FIRST_V1' || plan.visualPlanningPolicy === 'SEMANTIC_OBSERVABLE_VISUALS_V1';

  if (!observableV1) {
    legacyPlans += 1;
    if (isV2) warnings.push(`${relative}: legacy V2 visual plan retained; new projects use OBSERVABLE_SCENE_FIRST_V1.`);
    continue;
  }

  newPlans += 1;
  if (plan.visualPlanningPolicy !== 'SEMANTIC_OBSERVABLE_VISUALS_V1') failures.push(`${relative}: missing SEMANTIC_OBSERVABLE_VISUALS_V1.`);
  if (plan.flowPromptPolicy !== 'NATURAL_FLOW_MASTER_V2') failures.push(`${relative}: new observable plan must use NATURAL_FLOW_MASTER_V2.`);
  if (plan.socialScenePolicy !== 'SEMANTIC_SOCIAL_DENSITY_V1') failures.push(`${relative}: new observable plan must use SEMANTIC_SOCIAL_DENSITY_V1.`);
  if ('promptContract' in plan) failures.push(`${relative}: retired promptContract must not be present in new observable plans.`);
  if ('compositionTargets' in plan) failures.push(`${relative}: new observable plans must not impose composition quotas.`);

  const representationCounts = {};
  const moods = new Set();
  for (const scene of scenes) {
    const n = scene.scene ?? scene.number ?? '?';
    if (!allowedComposition.has(scene.compositionType)) failures.push(`${relative}: scene ${n} missing/invalid compositionType.`);
    if (!allowedSocial.has(scene.socialDensity)) failures.push(`${relative}: scene ${n} missing/invalid socialDensity.`);
    if (!String(scene.sceneType ?? '').trim()) failures.push(`${relative}: scene ${n} missing sceneType.`);
    if (!String(scene.viewerTakeaway ?? '').trim()) failures.push(`${relative}: scene ${n} missing viewerTakeaway.`);
    if (!String(scene.observableEvidence ?? '').trim()) failures.push(`${relative}: scene ${n} missing observableEvidence.`);
    if (!String(scene.dominantRelation ?? '').trim()) failures.push(`${relative}: scene ${n} missing dominantRelation.`);
    if (!String(scene.literalMetaphorWarning ?? '').trim()) failures.push(`${relative}: scene ${n} missing literalMetaphorWarning.`);
    if (!String(scene.visualTask ?? '').trim()) failures.push(`${relative}: scene ${n} missing visualTask.`);
    if (!String(scene.camera ?? '').trim()) failures.push(`${relative}: scene ${n} missing camera.`);

    if (isV2) {
      const mood = String(scene.moodMode ?? '').toUpperCase();
      if (!allowedMoods.has(mood)) failures.push(`${relative}: scene ${n} missing/invalid moodMode.`);
      else moods.add(mood);
    }
    representationCounts[scene.sceneType] = (representationCounts[scene.sceneType] ?? 0) + 1;
  }

  // Variety is reviewed, never forced.
  if (scenes.length >= 10 && Object.keys(representationCounts).length === 1) warnings.push(`${relative}: all scenes use one representation; verify that content genuinely calls for it.`);
  if (isV2 && scenes.length >= 8 && moods.size === 1) warnings.push(`${relative}: all scenes use one mood; verify this is intentional.`);

  console.log(`${relative}: observable plan, representations=${JSON.stringify(representationCounts)}${isV2 ? `, moods=${[...moods].join('/')}` : ''}.`);
}

for (const file of promptFiles) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('CINEMATIC_HUMAN_BEHAVIOR_V2')) continue;

  const isV2Prompt = /NATURAL_FLOW_MASTER_V2/iu.test(content);
  if (!isV2Prompt) {
    warnings.push(`${relative}: historical Flow prompt retained; future prompts use NATURAL_FLOW_MASTER_V2.`);
    continue;
  }

  newPrompts += 1;
  if (/FLOW_SCENE_PROMPT_CONTRACT_V1/iu.test(content)) failures.push(`${relative}: retired FLOW_SCENE_PROMPT_CONTRACT_V1 must not appear in a V2 natural prompt.`);
  if (/SCENE TYPE:|SOCIAL DENSITY:|POWER DYNAMIC:|VISUAL TASK:/iu.test(content)) failures.push(`${relative}: technical planning labels leaked into the final natural Flow prompt.`);
  if (!/observable|concrete visible|visible action|visible evidence/iu.test(content)) failures.push(`${relative}: prompt lacks observable-scene instruction.`);
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

console.log(`\nVISUAL VARIETY QA: PASS — ${newPlans} observable plan(s), ${newPrompts} V2 prompt(s), ${legacyPlans} legacy plan(s) retained.\n`);
