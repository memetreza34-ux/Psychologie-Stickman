#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
const plans = [];
const prompts = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'phase1-scenes.json') plans.push(full);
    else if (entry.name === 'google-flow-prompt.txt') prompts.push(full);
  }
};
walk(root);

const ACTIVE = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const CHARACTER = 'STYLIZED_STICKMAN_CAST_V2';
const UNIFIED = 'UNIFIED_STICKMAN_HUMANS_V2';
const OPTIONAL = 'OPTIONAL_HUMANS_MIXED_VISUALS_V1';
const MOOD = 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1';
const DIRECTOR = 'OBSERVABLE_SCENE_FIRST_V1';
const FLOW = 'NATURAL_FLOW_MASTER_V2';
const failures = [];
const warnings = [];
let activePlans = 0;
let legacyPlans = 0;
let activePrompts = 0;

const allowedMoods = new Set(['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE']);
const allowedPower = new Set(['NEUTRAL', 'SELF_VS_SELF', 'PEER_TO_PEER', 'DOMINANT_VS_TARGET', 'AUTHORITY_VS_GROUP', 'GROUP_VS_INDIVIDUAL', 'SYSTEM_VS_INDIVIDUAL', 'STATUS_CONTRAST', 'NONE']);

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem !== ACTIVE) {
    legacyPlans += 1;
    continue;
  }

  const isNew = plan.visualDirectorPolicy === DIRECTOR || plan.flowPromptPolicy === FLOW;
  if (!isNew) {
    legacyPlans += 1;
    warnings.push(`${rel}: historical V2 plan retained; future projects use ${DIRECTOR} + ${FLOW}.`);
    continue;
  }

  activePlans += 1;
  if (plan.characterSystem !== CHARACTER) failures.push(`${rel}: characterSystem must be ${CHARACTER}.`);
  if (plan.humanCharacterPolicy !== UNIFIED) failures.push(`${rel}: humanCharacterPolicy must be ${UNIFIED}.`);
  if (plan.characterPresencePolicy !== OPTIONAL) failures.push(`${rel}: characterPresencePolicy must be ${OPTIONAL}.`);
  if (plan.moodPolicy !== MOOD) failures.push(`${rel}: moodPolicy must be ${MOOD}.`);
  if (plan.visualDirectorPolicy !== DIRECTOR) failures.push(`${rel}: visualDirectorPolicy must be ${DIRECTOR}.`);
  if (plan.flowPromptPolicy !== FLOW) failures.push(`${rel}: flowPromptPolicy must be ${FLOW}.`);
  if ('promptContract' in plan) failures.push(`${rel}: retired promptContract must not appear in new plans.`);
  if (plan.environmentPolicy !== 'BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2') failures.push(`${rel}: wrong/missing environmentPolicy.`);
  if (plan.renderingPolicy !== 'SOFT_CEL_SHADED_FILM_FRAME_V2') failures.push(`${rel}: wrong/missing renderingPolicy.`);
  if (plan.representationPolicy !== 'MIXED_HUMAN_BEHAVIOR_VISUALS_V2') failures.push(`${rel}: wrong/missing representationPolicy.`);
  if (plan.scriptHookPolicy !== 'HOOK_FIRST_EXPLAIN_EARLY_V1') failures.push(`${rel}: missing hook policy.`);
  if (plan.renderGermanLabelsInRemotion !== false) failures.push(`${rel}: Remotion visible labels must remain disabled.`);

  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  for (const scene of scenes) {
    const n = scene.number ?? scene.scene ?? '?';
    const moodMode = String(scene.moodMode ?? '').toUpperCase();
    const intensity = Number(scene.moodIntensity);
    const power = String(scene.powerDynamic ?? '').toUpperCase();
    if (!allowedMoods.has(moodMode)) failures.push(`${rel}: scene ${n} has invalid/missing moodMode.`);
    if (!Number.isInteger(intensity) || intensity < 0 || intensity > 4) failures.push(`${rel}: scene ${n} moodIntensity must be integer 0-4.`);
    if (!allowedPower.has(power)) failures.push(`${rel}: scene ${n} has invalid/missing powerDynamic.`);
    if (String(scene.continuityPolicy ?? '').trim() === '') failures.push(`${rel}: scene ${n} needs continuityPolicy.`);
    if (String(scene.observableEvidence ?? '').trim() === '') failures.push(`${rel}: scene ${n} needs observableEvidence.`);
    if (String(scene.dominantRelation ?? '').trim() === '') failures.push(`${rel}: scene ${n} needs dominantRelation.`);
    if (String(scene.lightingMood ?? '').trim() === '') failures.push(`${rel}: scene ${n} needs lightingMood.`);
    if (String(scene.colorDirection ?? '').trim() === '') failures.push(`${rel}: scene ${n} needs colorDirection.`);
  }
}

for (const file of prompts) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(ACTIVE)) continue;

  if (!text.includes(FLOW)) {
    warnings.push(`${rel}: historical Flow prompt retained; future prompts use ${FLOW}.`);
    continue;
  }

  activePrompts += 1;
  const required = [
    ['active visual marker', new RegExp(ACTIVE, 'iu')],
    ['character marker', new RegExp(CHARACTER, 'iu')],
    ['natural Flow V2 marker', new RegExp(FLOW, 'iu')],
    ['observable-scene rule', /observable|concrete visible|visible evidence/iu],
    ['soft cel shading', /soft cel shading/iu],
    ['no 3D', /no 3D|NOT 3D|3D\/Pixar/iu],
    ['zero-readable-text policy', /ZERO READABLE TEXT|No visible text/iu],
  ];
  for (const [label, pattern] of required) if (!pattern.test(text)) failures.push(`${rel}: missing ${label}.`);

  if (/FLOW_SCENE_PROMPT_CONTRACT_V1/iu.test(text)) failures.push(`${rel}: retired FLOW_SCENE_PROMPT_CONTRACT_V1 remains in a new prompt.`);
  if (/Universal Editorial Stickman World v1\.3|MINIMAL_EDITORIAL_STICKMAN_V2|CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1/iu.test(text)) failures.push(`${rel}: retired visual-world marker remains in active V2 prompt.`);
}

if (warnings.length) {
  console.warn('\nVISUAL CONTENT QA: WARNINGS\n');
  warnings.forEach((x) => console.warn(`- ${x}`));
}
if (failures.length) {
  console.error('\nVISUAL CONTENT QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`\nVISUAL CONTENT QA: PASS — ${activePlans} new observable V2 plan(s), ${activePrompts} new V2 prompt(s), ${legacyPlans} historical plan(s) retained.\n`);
