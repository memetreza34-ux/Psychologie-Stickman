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

const ACTIVE = 'CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1';
const failures = [];
const warnings = [];
let activePlans = 0;
let legacyPlans = 0;
let activePrompts = 0;

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem !== ACTIVE) {
    legacyPlans += 1;
    warnings.push(`${rel}: legacy visual project retained; new productions use ${ACTIVE}.`);
    continue;
  }
  activePlans += 1;
  if (plan.characterSystem !== 'STYLIZED_STICKMAN_CAST_V1') failures.push(`${rel}: wrong/missing characterSystem.`);
  if (plan.environmentPolicy !== 'BELIEVABLE_CINEMATIC_ENVIRONMENT_V1') failures.push(`${rel}: wrong/missing environmentPolicy.`);
  if (plan.renderingPolicy !== 'SOFT_CEL_SHADED_FILM_FRAME_V1') failures.push(`${rel}: wrong/missing renderingPolicy.`);
  if (plan.representationPolicy !== 'MIXED_PSYCHOLOGY_VISUALS_V1') failures.push(`${rel}: wrong/missing representationPolicy.`);
  if (plan.scriptHookPolicy !== 'HOOK_FIRST_EXPLAIN_EARLY_V1') failures.push(`${rel}: missing hook policy.`);
  if (plan.renderGermanLabelsInRemotion !== false) failures.push(`${rel}: Remotion visible labels must remain disabled.`);
}

for (const file of prompts) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  if (!/CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1|CINEMATIC ILLUSTRATED PSYCHOLOGY WORLD/iu.test(text)) continue;
  activePrompts += 1;
  const required = [
    ['active visual marker', /CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1|CINEMATIC ILLUSTRATED PSYCHOLOGY WORLD/iu],
    ['stylized stickman cast', /STYLIZED_STICKMAN|stickman-inspired/iu],
    ['soft cel shading', /soft cel shading/iu],
    ['believable environment', /believable environment|believable locations/iu],
    ['mixed scene types', /SCHEMA_EXPLAINER/iu],
    ['object metaphor', /OBJECT_METAPHOR/iu],
    ['no 3D', /no 3D|NOT 3D/iu],
  ];
  for (const [label, pattern] of required) if (!pattern.test(text)) failures.push(`${rel}: missing ${label}.`);
  if (/MINIMAL_EDITORIAL_STICKMAN_V2|MINIMAL EDITORIAL STICKMAN WORLD v2/iu.test(text)) failures.push(`${rel}: old Minimal Editorial v2 marker remains in active prompt.`);
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
console.log(`\nVISUAL CONTENT QA: PASS — ${activePlans} active plan(s), ${activePrompts} active prompt(s), ${legacyPlans} legacy plan(s).\n`);
