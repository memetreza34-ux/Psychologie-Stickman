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

  if (plan.visualPlanningPolicy !== 'VARIED_COMPOSITION_V1') {
    legacyPlans += 1;
    warnings.push(`${relative}: legacy visual-planning policy; future projects must use VARIED_COMPOSITION_V1.`);
    continue;
  }

  modernPlans += 1;
  if (plan.socialScenePolicy !== 'SOCIAL_VARIETY_V1') failures.push(`${relative}: missing SOCIAL_VARIETY_V1.`);
  if ((plan.flowTextStylePolicy ?? '') !== 'EDITORIAL_INTEGRATED_V1' && plan.finalTextPolicy === 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push(`${relative}: V3 project must use EDITORIAL_INTEGRATED_V1.`);

  const allowedComposition = new Set(['standard', 'split', 'contrast', 'montage']);
  const allowedSocial = new Set(['solo', 'duo', 'group']);
  const compositionCounts = {standard: 0, split: 0, contrast: 0, montage: 0};
  let socialCount = 0;
  let groupCount = 0;
  let consecutiveStandard = 0;
  let maxConsecutiveStandard = 0;

  for (const scene of scenes) {
    if (!allowedComposition.has(scene.compositionType)) failures.push(`${relative}: scene ${scene.scene} missing/invalid compositionType.`);
    else compositionCounts[scene.compositionType] += 1;
    if (!allowedSocial.has(scene.socialDensity)) failures.push(`${relative}: scene ${scene.scene} missing/invalid socialDensity.`);
    if (scene.socialDensity === 'duo' || scene.socialDensity === 'group') socialCount += 1;
    if (scene.socialDensity === 'group') groupCount += 1;

    if (scene.compositionType === 'standard') consecutiveStandard += 1;
    else consecutiveStandard = 0;
    maxConsecutiveStandard = Math.max(maxConsecutiveStandard, consecutiveStandard);

    if (!/KOMPOSITION:/u.test(scene.visualTask ?? '')) failures.push(`${relative}: scene ${scene.scene} visualTask lacks KOMPOSITION instruction.`);
    if (!/SOZIALDICHTE:/u.test(scene.visualTask ?? '')) failures.push(`${relative}: scene ${scene.scene} visualTask lacks SOZIALDICHTE instruction.`);
  }

  if (scenes.length >= 20) {
    const standardShare = compositionCounts.standard / scenes.length;
    const comparisonCount = compositionCounts.split + compositionCounts.contrast;
    const socialShare = socialCount / scenes.length;
    if (comparisonCount === 0) warnings.push(`${relative}: no split/contrast scene planned.`);
    if (compositionCounts.montage === 0) warnings.push(`${relative}: no montage scene planned.`);
    if (standardShare > 0.85) warnings.push(`${relative}: ${Math.round(standardShare * 100)}% standard compositions; likely too repetitive.`);
    if (standardShare < 0.55) warnings.push(`${relative}: only ${Math.round(standardShare * 100)}% standard compositions; review collage/split overload.`);
    if (socialShare < 0.2) warnings.push(`${relative}: only ${Math.round(socialShare * 100)}% duo/group scenes; review social variety.`);
    if (groupCount === 0) warnings.push(`${relative}: no group scene planned.`);
    if (maxConsecutiveStandard > 5) warnings.push(`${relative}: ${maxConsecutiveStandard} consecutive standard scenes; review monotony.`);
  }

  console.log(`${relative}: standard=${compositionCounts.standard}, split=${compositionCounts.split}, contrast=${compositionCounts.contrast}, montage=${compositionCounts.montage}, social=${socialCount}/${scenes.length}.`);
}

for (const file of promptFiles) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  if (!/VISUAL PLANNING POLICY:\s*VARIED_COMPOSITION_V1/iu.test(content)) continue;
  modernPrompts += 1;

  const requiredBlocks = [
    ['VISUAL VARIETY — HARD LOCK', /VISUAL VARIETY\s*[—-]\s*HARD LOCK/iu],
    ['SOCIAL SCENE VARIETY — HARD LOCK', /SOCIAL SCENE VARIETY\s*[—-]\s*HARD LOCK/iu],
    ['TYPOGRAPHY AESTHETIC — HARD LOCK', /TYPOGRAPHY AESTHETIC\s*[—-]\s*HARD LOCK/iu],
    ['COVER STRENGTH — HARD LOCK', /COVER STRENGTH\s*[—-]\s*HARD LOCK/iu],
  ];
  for (const [label, pattern] of requiredBlocks) if (!pattern.test(content)) failures.push(`${relative}: missing ${label}.`);

  const sceneBlocks = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  for (let i = 0; i < sceneBlocks.length; i += 1) {
    const start = sceneBlocks[i].index ?? 0;
    const end = sceneBlocks[i + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    const scene = Number(sceneBlocks[i][1]);
    if (!/COMPOSITION:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks COMPOSITION declaration.`);
    if (!/SOCIAL DENSITY:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks SOCIAL DENSITY declaration.`);
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
