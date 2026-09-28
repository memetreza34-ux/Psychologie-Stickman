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
let modernPlans = 0;
let legacyPlans = 0;
let modernPrompts = 0;

for (const file of phase1Files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const plan = resolvePhase1Plan(raw, file);
  if (String(plan.format ?? '').toLowerCase() !== 'youtube') continue;
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  if (!scenes.length) continue;

  const isV2 = plan.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
  const modernPlanning = isV2 || plan.visualPlanningPolicy === 'VARIED_COMPOSITION_V1';
  if (!modernPlanning) {
    legacyPlans += 1;
    warnings.push(`${relative}: legacy visual-planning policy retained.`);
    continue;
  }

  modernPlans += 1;
  if (isV2) {
    if (plan.promptContract !== 'FLOW_SCENE_PROMPT_CONTRACT_V1') failures.push(`${relative}: v2 plan missing FLOW_SCENE_PROMPT_CONTRACT_V1.`);
    if (plan.moodPolicy !== 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1') failures.push(`${relative}: v2 plan missing ADAPTIVE_PSYCHOLOGICAL_MOOD_V1.`);
    if ((plan.flowTextStylePolicy ?? '') !== 'CINEMATIC_WORLD_INTEGRATED_V2' && plan.finalTextPolicy === 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push(`${relative}: v2 project must use CINEMATIC_WORLD_INTEGRATED_V2.`);
  } else {
    if (plan.socialScenePolicy !== 'SOCIAL_VARIETY_V1') failures.push(`${relative}: missing SOCIAL_VARIETY_V1.`);
    if ((plan.flowTextStylePolicy ?? '') !== 'EDITORIAL_INTEGRATED_V1' && plan.finalTextPolicy === 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push(`${relative}: V3 legacy-modern project must use EDITORIAL_INTEGRATED_V1.`);
  }

  const allowedComposition = new Set(['standard', 'split', 'contrast', 'montage']);
  const allowedSocial = new Set(['solo', 'duo', 'group', 'none']);
  const allowedMoods = new Set(['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE']);
  const compositionCounts = {standard: 0, split: 0, contrast: 0, montage: 0};
  let socialCount = 0;
  let groupCount = 0;
  let consecutiveStandard = 0;
  let maxConsecutiveStandard = 0;
  const moods = new Set();

  for (const scene of scenes) {
    const n = scene.scene ?? scene.number ?? '?';
    if (!allowedComposition.has(scene.compositionType)) failures.push(`${relative}: scene ${n} missing/invalid compositionType.`);
    else compositionCounts[scene.compositionType] += 1;
    if (!allowedSocial.has(scene.socialDensity)) failures.push(`${relative}: scene ${n} missing/invalid socialDensity.`);
    if (scene.socialDensity === 'duo' || scene.socialDensity === 'group') socialCount += 1;
    if (scene.socialDensity === 'group') groupCount += 1;

    if (isV2) {
      const mood = String(scene.moodMode ?? '').toUpperCase();
      if (!allowedMoods.has(mood)) failures.push(`${relative}: scene ${n} missing/invalid moodMode.`);
      else moods.add(mood);
      const intensity = Number(scene.moodIntensity);
      if (!Number.isInteger(intensity) || intensity < 0 || intensity > 4) failures.push(`${relative}: scene ${n} moodIntensity must be 0-4.`);
      if (!String(scene.powerDynamic ?? '').trim()) failures.push(`${relative}: scene ${n} missing powerDynamic.`);
    }

    if (scene.compositionType === 'standard') consecutiveStandard += 1;
    else consecutiveStandard = 0;
    maxConsecutiveStandard = Math.max(maxConsecutiveStandard, consecutiveStandard);

    const visualTask = String(scene.visualTask ?? '');
    if (!visualTask) failures.push(`${relative}: scene ${n} visualTask is required.`);
    if (isV2 && !String(scene.camera ?? '').trim()) failures.push(`${relative}: scene ${n} camera is required.`);
    if (isV2 && !String(scene.lightingMood ?? '').trim()) failures.push(`${relative}: scene ${n} lightingMood is required.`);
    if (isV2 && !String(scene.colorDirection ?? '').trim()) failures.push(`${relative}: scene ${n} colorDirection is required.`);
  }

  if (scenes.length >= 12) {
    const standardShare = compositionCounts.standard / scenes.length;
    const comparisonCount = compositionCounts.split + compositionCounts.contrast;
    const socialShare = socialCount / scenes.length;
    if (comparisonCount === 0) warnings.push(`${relative}: no split/contrast scene planned.`);
    if (compositionCounts.montage === 0) warnings.push(`${relative}: no montage scene planned; acceptable only if semantics do not need one.`);
    if (standardShare > 0.85) warnings.push(`${relative}: ${Math.round(standardShare * 100)}% standard compositions; likely too repetitive.`);
    if (socialShare < 0.15) warnings.push(`${relative}: only ${Math.round(socialShare * 100)}% duo/group scenes; review if topic is socially driven.`);
    if (maxConsecutiveStandard > 6) warnings.push(`${relative}: ${maxConsecutiveStandard} consecutive standard scenes; review monotony.`);
    if (isV2 && moods.size === 1 && scenes.length >= 8) warnings.push(`${relative}: all scenes use one mood mode (${[...moods][0]}); verify that this is intentional.`);
  }

  console.log(`${relative}: standard=${compositionCounts.standard}, split=${compositionCounts.split}, contrast=${compositionCounts.contrast}, montage=${compositionCounts.montage}, social=${socialCount}/${scenes.length}${isV2 ? `, moods=${[...moods].join('/')}` : ''}.`);
}

for (const file of promptFiles) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  const isV2 = content.includes('CINEMATIC_HUMAN_BEHAVIOR_V2');
  const isLegacyModern = /VISUAL PLANNING POLICY:\s*VARIED_COMPOSITION_V1/iu.test(content);
  if (!isV2 && !isLegacyModern) continue;
  modernPrompts += 1;

  if (isV2) {
    if (!content.includes('FLOW_SCENE_PROMPT_CONTRACT_V1')) failures.push(`${relative}: v2 prompt missing FLOW_SCENE_PROMPT_CONTRACT_V1.`);
    const sceneBlocks = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
    for (let i = 0; i < sceneBlocks.length; i += 1) {
      const start = sceneBlocks[i].index ?? 0;
      const end = sceneBlocks[i + 1]?.index ?? content.length;
      const block = content.slice(start, end);
      const scene = Number(sceneBlocks[i][1]);
      if (!/COMPOSITION:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks COMPOSITION declaration.`);
      if (!/SOCIAL DENSITY:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks SOCIAL DENSITY declaration.`);
      if (!/MOOD MODE:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks MOOD MODE declaration.`);
      if (!/MOOD INTENSITY:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks MOOD INTENSITY declaration.`);
      if (!/POWER DYNAMIC:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks POWER DYNAMIC declaration.`);
      if (!/CAMERA:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks CAMERA declaration.`);
      if (!/LIGHTING:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks LIGHTING declaration.`);
      if (!/COLOR:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks COLOR declaration.`);
    }
  } else {
    const requiredBlocks = [
      ['VISUAL VARIETY — HARD LOCK', /VISUAL VARIETY\s*[—-]\s*HARD LOCK/iu],
      ['SOCIAL SCENE VARIETY — HARD LOCK', /SOCIAL SCENE VARIETY\s*[—-]\s*HARD LOCK/iu],
      ['TYPOGRAPHY AESTHETIC — HARD LOCK', /TYPOGRAPHY AESTHETIC\s*[—-]\s*HARD LOCK/iu],
      ['COVER STRENGTH — HARD LOCK', /COVER STRENGTH\s*[—-]\s*HARD LOCK/iu],
    ];
    for (const [label, pattern] of requiredBlocks) if (!pattern.test(content)) failures.push(`${relative}: missing ${label}.`);
  }
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

console.log(`\nVISUAL VARIETY QA: PASS — ${modernPlans} modern plan(s), ${modernPrompts} modern Flow prompt(s), ${legacyPlans} legacy plan(s) warned.\n`);
