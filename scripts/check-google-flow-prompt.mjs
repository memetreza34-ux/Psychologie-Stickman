#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const roots = [path.resolve('youtube'), path.resolve('reels')];
const files = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'google-flow-prompt.txt') files.push(full);
  }
};
roots.forEach(walk);

const failures = [];
const warnings = [];
const countWords = (s) => String(s ?? '').trim().split(/\s+/u).filter(Boolean).length;

const V2_MARKER = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const CONTRACT_MARKER = 'FLOW_SCENE_PROMPT_CONTRACT_V1';

const requiredSceneFields = [
  'SPEECH CONTEXT — DO NOT RENDER AS TEXT:',
  'SCENE TYPE:',
  'COMPOSITION:',
  'SOCIAL DENSITY:',
  'MOOD MODE:',
  'MOOD INTENSITY:',
  'POWER DYNAMIC:',
  'VISUAL IDEA:',
  'VISUAL TASK:',
  'CHARACTER / SUBJECT DIRECTION:',
  'ACTION / RELATION:',
  'ENVIRONMENT:',
  'CAMERA:',
  'LIGHTING:',
  'COLOR:',
  'CONTINUITY:',
  'TEXT POLICY:',
  'PLANNED GERMAN TEXT:',
  'NEGATIVE LOCKS:',
  'PROMPT:',
];

const requiredPromptSubBlocks = [
  '[GOAL]',
  '[WORLD LOCK]',
  '[CHARACTER LOCK]',
  '[PSYCHOLOGICAL MOOD]',
  '[SCENE CONTENT]',
  '[CAMERA + COMPOSITION]',
  '[LIGHT + COLOR]',
  '[TEXT LOCK]',
  '[NEGATIVE LOCK]',
  '[FINAL CHECK]',
];

const allowedMoodModes = new Set(['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE']);
const allowedPowerDynamics = new Set([
  'NEUTRAL',
  'SELF_VS_SELF',
  'PEER_TO_PEER',
  'DOMINANT_VS_TARGET',
  'AUTHORITY_VS_GROUP',
  'GROUP_VS_INDIVIDUAL',
  'SYSTEM_VS_INDIVIDUAL',
  'STATUS_CONTRAST',
  'NONE',
]);

const assertOrdered = ({block, labels, rel, scene, scope}) => {
  let cursor = -1;
  for (const label of labels) {
    const next = block.indexOf(label);
    if (next < 0) {
      failures.push(`${rel}: scene ${scene} missing ${scope} block '${label}'.`);
      continue;
    }
    if (next <= cursor) failures.push(`${rel}: scene ${scene} ${scope} block '${label}' is out of order.`);
    cursor = Math.max(cursor, next);
  }
};

for (const file of files.filter((p) => !p.split(path.sep).includes('00-vorlage'))) {
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  const scenes = [...text.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  if (!scenes.length) {
    failures.push(`${rel}: no SCENE blocks found.`);
    continue;
  }

  scenes.forEach((m, i) => {
    if (Number(m[1]) !== i + 1) failures.push(`${rel}: scenes must be contiguous.`);
  });

  const isV2 = text.includes(V2_MARKER);
  if (isV2 && !text.includes(CONTRACT_MARKER)) {
    failures.push(`${rel}: v2 prompt must declare ${CONTRACT_MARKER}.`);
  }

  let textMoments = 0;
  for (let i = 0; i < scenes.length; i += 1) {
    const start = scenes[i].index ?? 0;
    const end = scenes[i + 1]?.index ?? text.length;
    const block = text.slice(start, end);
    const n = Number(scenes[i][1]);

    if (!/SPEECH CONTEXT\s*[—-]\s*DO NOT RENDER AS TEXT:/iu.test(block)) {
      failures.push(`${rel}: scene ${n} lacks protected speech context.`);
    }

    if (!/SCENE TYPE:/iu.test(block)) warnings.push(`${rel}: scene ${n} has no SCENE TYPE.`);

    if (isV2) {
      assertOrdered({block, labels: requiredSceneFields, rel, scene: n, scope: 'scene-field'});

      const promptIndex = block.indexOf('PROMPT:');
      if (promptIndex >= 0) {
        const promptBody = block.slice(promptIndex + 'PROMPT:'.length);
        assertOrdered({block: promptBody, labels: requiredPromptSubBlocks, rel, scene: n, scope: 'PROMPT'});
      }

      const mood = block.match(/MOOD MODE:\s*([^\n\r]+)/iu)?.[1]?.trim().toUpperCase();
      if (!mood || !allowedMoodModes.has(mood)) failures.push(`${rel}: scene ${n} has invalid MOOD MODE '${mood ?? ''}'.`);

      const intensityRaw = block.match(/MOOD INTENSITY:\s*([^\n\r]+)/iu)?.[1]?.trim();
      const intensity = Number(intensityRaw);
      if (!Number.isInteger(intensity) || intensity < 0 || intensity > 4) failures.push(`${rel}: scene ${n} MOOD INTENSITY must be integer 0-4.`);

      const power = block.match(/POWER DYNAMIC:\s*([^\n\r]+)/iu)?.[1]?.trim().toUpperCase();
      if (!power || !allowedPowerDynamics.has(power)) failures.push(`${rel}: scene ${n} has invalid POWER DYNAMIC '${power ?? ''}'.`);

      if (!/NEGATIVE LOCKS:/iu.test(block)) failures.push(`${rel}: scene ${n} lacks NEGATIVE LOCKS.`);
      if (!/\[NEGATIVE LOCK\]/u.test(block)) failures.push(`${rel}: scene ${n} PROMPT lacks [NEGATIVE LOCK].`);
      if (!/\[FINAL CHECK\]/u.test(block)) failures.push(`${rel}: scene ${n} PROMPT lacks [FINAL CHECK].`);
    }

    const listMatch = block.match(/PLANNED GERMAN TEXT:\s*([\s\S]*?)(?=\nNEGATIVE LOCKS:|\nPROMPT:)/iu);
    const listed = listMatch ? [...listMatch[1].matchAll(/["“]([^"”\n]+)["”]/gu)].map((m) => m[1].trim()) : [];
    const none = /PLANNED GERMAN TEXT:\s*NONE/iu.test(block);

    if (listed.length) {
      textMoments += 1;
      if (!/NO OTHER READABLE TEXT/iu.test(block)) failures.push(`${rel}: scene ${n} planned text must forbid extra readable text.`);
      if (n === 1 && (countWords(listed[0]) < 2 || countWords(listed[0]) > 7)) failures.push(`${rel}: scene 1 cover title must be 2-7 words.`);
      if (listed.length > 4) failures.push(`${rel}: scene ${n} has too many planned text strings (${listed.length}).`);
      listed.slice(n === 1 ? 1 : 0).forEach((s) => {
        if (countWords(s) > 7) warnings.push(`${rel}: scene ${n} label '${s}' is long.`);
      });
    } else if (none) {
      if (!/ZERO READABLE TEXT/iu.test(block)) failures.push(`${rel}: scene ${n} with no planned text must say ZERO READABLE TEXT.`);
    } else {
      warnings.push(`${rel}: scene ${n} should explicitly declare PLANNED GERMAN TEXT: NONE or list exact texts.`);
    }
  }

  const maxTextMoments = Math.max(1, Math.ceil(scenes.length * 0.40));
  if (textMoments > maxTextMoments) warnings.push(`${rel}: ${textMoments}/${scenes.length} text-bearing frames exceed the normal 40% guidance.`);

  if (/CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1/iu.test(text) && /MINIMAL_EDITORIAL_STICKMAN_V2|MINIMAL EDITORIAL STICKMAN WORLD v2/iu.test(text)) {
    failures.push(`${rel}: old Minimal Editorial marker appears inside a cinematic-v1 prompt.`);
  }

  if (isV2) {
    if (/Universal Editorial Stickman World v1\.3|CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1|MINIMAL_EDITORIAL_STICKMAN_V2/iu.test(text)) {
      failures.push(`${rel}: retired visual-world marker appears in active v2 prompt.`);
    }
    if (!/SCHEMA_EXPLAINER/iu.test(text) || !/OBJECT_METAPHOR/iu.test(text)) {
      warnings.push(`${rel}: v2 master prompt should describe mixed representation types.`);
    }
  }
}

if (warnings.length) {
  console.warn('\nGOOGLE FLOW PROMPT QA: WARNINGS\n');
  warnings.forEach((x) => console.warn(`- ${x}`));
}
if (failures.length) {
  console.error('\nGOOGLE FLOW PROMPT QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('\nGOOGLE FLOW PROMPT QA: PASS\n');
