#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
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
walk(root);

const V2 = 'MINIMAL_EDITORIAL_STICKMAN_V2';
const failures = [];
const warnings = [];
let v2Plans = 0;
let v2Prompts = 0;
let legacyPlans = 0;
let legacyPrompts = 0;

const normalize = (value) => String(value ?? '').normalize('NFKC').toLocaleLowerCase('de-DE');
const firstWords = (text, max) => String(text ?? '').trim().split(/\s+/u).filter(Boolean).slice(0, max).join(' ');
const firstSentence = (text) => {
  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  return [...segmenter.segment(String(text ?? '').trim())].map((item) => item.segment.trim()).find(Boolean) ?? '';
};

const checkHook = (plan, relative, file) => {
  if (plan.scriptHookPolicy !== 'HOOK_FIRST_EXPLAIN_EARLY_V1') {
    failures.push(`${relative}: missing HOOK_FIRST_EXPLAIN_EARLY_V1.`);
    return;
  }

  const allowedHooks = new Set(['WHAT_IS', 'WHY_DOES', 'HAVE_YOU_WONDERED', 'DIRECT_SURPRISE', 'DIRECT_PROBLEM']);
  const hookType = String(plan.hookType ?? '').trim();
  if (!allowedHooks.has(hookType)) failures.push(`${relative}: hookType must be one of ${[...allowedHooks].join(', ')}.`);

  const term = String(plan.coreConceptTerm ?? '').trim();
  if (!term) failures.push(`${relative}: coreConceptTerm is required.`);

  const introScene = Number(plan.coreConceptIntroducedByScene);
  if (!Number.isInteger(introScene) || introScene < 1 || introScene > 3) failures.push(`${relative}: coreConceptIntroducedByScene must be 1-3.`);

  const exampleScene = Number(plan.realLifeExampleByScene);
  if (!Number.isInteger(exampleScene) || exampleScene < 1 || exampleScene > 5) failures.push(`${relative}: realLifeExampleByScene must be 1-5.`);

  if (typeof plan.realLifeExampleSummary !== 'string' || plan.realLifeExampleSummary.trim().length < 8) failures.push(`${relative}: realLifeExampleSummary must describe the early concrete example.`);

  const projectRoot = path.dirname(path.dirname(file));
  const explicitScript = plan.autoFromScript?.scriptPath;
  const scriptPath = explicitScript ? path.resolve(explicitScript) : path.join(projectRoot, '01-script', 'script.txt');
  if (!fs.existsSync(scriptPath)) {
    failures.push(`${relative}: script file not found for hook QA (${path.relative(process.cwd(), scriptPath)}).`);
    return;
  }

  const script = fs.readFileSync(scriptPath, 'utf8').trim();
  const opening = firstSentence(script);
  const openingWords = opening.split(/\s+/u).filter(Boolean).length;
  if (!opening) failures.push(`${relative}: script has no opening sentence.`);
  if (openingWords > 26) failures.push(`${relative}: opening hook is too long (${openingWords} words; max 26).`);

  if (['WHAT_IS', 'WHY_DOES', 'HAVE_YOU_WONDERED'].includes(hookType) && !opening.endsWith('?')) {
    failures.push(`${relative}: ${hookType} hook must open with a clear question.`);
  }

  if (term) {
    const first60 = normalize(firstWords(script, 60));
    if (!first60.includes(normalize(term))) failures.push(`${relative}: core concept '${term}' is not present within the first 60 spoken words.`);
  }
};

for (const file of phase1Files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (plan.visualSystem !== V2) {
    legacyPlans += 1;
    if (plan.premiumVisualPolicy === 'PREMIUM_EDITORIAL_CINEMATIC_V1') {
      warnings.push(`${relative}: legacy v1.3/cinematic project retained as historical production.`);
    } else {
      warnings.push(`${relative}: legacy visual project; new productions must use ${V2}.`);
    }
    continue;
  }

  v2Plans += 1;
  checkHook(plan, relative, file);

  if (plan.environmentPolicy !== 'SPARSE_SUGGESTED_ENVIRONMENT_V1') failures.push(`${relative}: missing SPARSE_SUGGESTED_ENVIRONMENT_V1.`);
  if (plan.accentPolicy !== 'ONE_DOMINANT_ACCENT_V1') failures.push(`${relative}: missing ONE_DOMINANT_ACCENT_V1.`);

  const palette = plan.channelPalette;
  const expected = {
    background: '#F6F3EA',
    ink: '#202124',
    primary: '#3F6EDB',
    problem: '#E7684A',
    solution: '#4E9B78',
    optionalSignal: '#D6A23D',
  };
  if (!palette || typeof palette !== 'object') failures.push(`${relative}: channelPalette missing.`);
  else {
    for (const [field, value] of Object.entries(expected)) {
      if (String(palette[field] ?? '').toUpperCase() !== value.toUpperCase()) failures.push(`${relative}: channelPalette.${field} must be ${value}.`);
    }
  }

  if ('projectPalette' in plan) warnings.push(`${relative}: v2 should not depend on a per-video projectPalette.`);
  if (plan.premiumVisualPolicy === 'PREMIUM_EDITORIAL_CINEMATIC_V1') failures.push(`${relative}: v2 must not enable PREMIUM_EDITORIAL_CINEMATIC_V1.`);
}

for (const file of promptFiles) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  const isV2 = /MINIMAL_EDITORIAL_STICKMAN_V2|MINIMAL EDITORIAL STICKMAN WORLD v2/iu.test(content);

  if (!isV2) {
    legacyPrompts += 1;
    continue;
  }

  v2Prompts += 1;

  if (/PREMIUM VISUAL POLICY:\s*PREMIUM_EDITORIAL_CINEMATIC_V1/iu.test(content)) failures.push(`${relative}: v2 prompt still enables old cinematic policy.`);
  if (/COLOR STORY POLICY:\s*INTENTIONAL_COLOR_STORY_V1/iu.test(content)) failures.push(`${relative}: v2 prompt still enables old per-project color-story policy.`);

  const required = [
    ['v2 visual-system marker', /MINIMAL_EDITORIAL_STICKMAN_V2|MINIMAL EDITORIAL STICKMAN WORLD v2/iu],
    ['warm off-white background', /#F6F3EA/iu],
    ['charcoal ink', /#202124/iu],
    ['channel blue', /#3F6EDB/iu],
    ['problem coral', /#E7684A/iu],
    ['solution green', /#4E9B78/iu],
    ['sparse environment rule', /SPARSE|MINIMUM PROPS|MINIMAL ENVIRONMENT|SUGGEST.*(?:ENVIRONMENT|PLACE)/iu],
    ['negative-space rule', /NEGATIVE SPACE/iu],
  ];
  for (const [label, pattern] of required) if (!pattern.test(content)) failures.push(`${relative}: missing ${label}.`);

  if (!/no cinematic lighting|NO CINEMATIC|cinematic lighting.*(?:not|no|avoid)/iu.test(content)) warnings.push(`${relative}: explicitly forbid cinematic lighting in the global v2 block.`);
  if (!/no rich detailed environments|RICH DETAILED ENVIRONMENTS.*(?:not|no|avoid)|avoid rich detailed/iu.test(content)) warnings.push(`${relative}: explicitly forbid rich detailed environments in the global v2 block.`);
}

if (warnings.length) {
  console.warn('\nVISUAL CONTENT QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (failures.length) {
  console.error('\nVISUAL CONTENT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nVISUAL CONTENT QA: PASS — ${v2Plans} v2 plan(s), ${v2Prompts} v2 Flow prompt(s), ${legacyPlans} legacy plan(s), ${legacyPrompts} legacy prompt(s).\n`);
