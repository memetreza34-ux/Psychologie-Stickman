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

for (const file of files.filter((p) => !p.split(path.sep).includes('00-vorlage'))) {
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  const scenes = [...text.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  if (!scenes.length) { failures.push(`${rel}: no SCENE blocks found.`); continue; }

  scenes.forEach((m, i) => { if (Number(m[1]) !== i + 1) failures.push(`${rel}: scenes must be contiguous.`); });

  let textMoments = 0;
  for (let i = 0; i < scenes.length; i += 1) {
    const start = scenes[i].index ?? 0;
    const end = scenes[i + 1]?.index ?? text.length;
    const block = text.slice(start, end);
    const n = Number(scenes[i][1]);

    if (!/SPEECH CONTEXT\s*[—-]\s*DO NOT RENDER AS TEXT:/iu.test(block)) failures.push(`${rel}: scene ${n} lacks protected speech context.`);
    if (!/SCENE TYPE:/iu.test(block)) warnings.push(`${rel}: scene ${n} has no SCENE TYPE.`);

    const listMatch = block.match(/PLANNED GERMAN TEXT:\s*([\s\S]*?)(?=\nPROMPT:)/iu);
    const listed = listMatch ? [...listMatch[1].matchAll(/["“]([^"”\n]+)["”]/gu)].map((m) => m[1].trim()) : [];
    const none = /PLANNED GERMAN TEXT:\s*NONE/iu.test(block);

    if (listed.length) {
      textMoments += 1;
      if (!/NO OTHER READABLE TEXT/iu.test(block)) failures.push(`${rel}: scene ${n} planned text must forbid extra readable text.`);
      if (n === 1 && (countWords(listed[0]) < 2 || countWords(listed[0]) > 7)) failures.push(`${rel}: scene 1 cover title must be 2-7 words.`);
      if (listed.length > 4) failures.push(`${rel}: scene ${n} has too many planned text strings (${listed.length}).`);
      listed.slice(n === 1 ? 1 : 0).forEach((s) => { if (countWords(s) > 7) warnings.push(`${rel}: scene ${n} label '${s}' is long.`); });
    } else if (none) {
      if (!/ZERO READABLE TEXT/iu.test(block)) failures.push(`${rel}: scene ${n} with no planned text must say ZERO READABLE TEXT.`);
    } else {
      warnings.push(`${rel}: scene ${n} should explicitly declare PLANNED GERMAN TEXT: NONE or list exact texts.`);
    }
  }

  const maxTextMoments = Math.max(1, Math.ceil(scenes.length * 0.40));
  if (textMoments > maxTextMoments) warnings.push(`${rel}: ${textMoments}/${scenes.length} text-bearing frames exceed the normal 40% guidance.`);

  if (/CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1/iu.test(text)) {
    if (/MINIMAL_EDITORIAL_STICKMAN_V2|MINIMAL EDITORIAL STICKMAN WORLD v2/iu.test(text)) failures.push(`${rel}: old v2 visual marker appears in active prompt.`);
    if (!/SCHEMA_EXPLAINER/iu.test(text) || !/OBJECT_METAPHOR/iu.test(text)) failures.push(`${rel}: active prompt must support mixed psychology visual types.`);
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
