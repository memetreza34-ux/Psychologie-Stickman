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

const failures = [];
const warnings = [];
let modernPlans = 0;
let modernPrompts = 0;
let legacyPlans = 0;

const normalize = (value) => String(value ?? '').normalize('NFKC').toLocaleLowerCase('de-DE');
const firstWords = (text, max) => String(text ?? '').trim().split(/\s+/u).filter(Boolean).slice(0, max).join(' ');
const firstSentence = (text) => {
  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  return [...segmenter.segment(String(text ?? '').trim())].map((item) => item.segment.trim()).find(Boolean) ?? '';
};

for (const file of phase1Files) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (plan.premiumVisualPolicy !== 'PREMIUM_EDITORIAL_CINEMATIC_V1' && plan.scriptHookPolicy !== 'HOOK_FIRST_EXPLAIN_EARLY_V1') {
    legacyPlans += 1;
    warnings.push(`${relative}: legacy project; future projects must use premium visual + hook-first policies.`);
    continue;
  }

  modernPlans += 1;

  if (plan.premiumVisualPolicy !== 'PREMIUM_EDITORIAL_CINEMATIC_V1') failures.push(`${relative}: missing PREMIUM_EDITORIAL_CINEMATIC_V1.`);
  if (plan.colorStoryPolicy !== 'INTENTIONAL_COLOR_STORY_V1') failures.push(`${relative}: missing INTENTIONAL_COLOR_STORY_V1.`);
  if (plan.scriptHookPolicy !== 'HOOK_FIRST_EXPLAIN_EARLY_V1') failures.push(`${relative}: missing HOOK_FIRST_EXPLAIN_EARLY_V1.`);

  const palette = plan.projectPalette;
  if (!palette || typeof palette !== 'object') failures.push(`${relative}: projectPalette missing.`);
  else {
    for (const field of ['primary', 'secondary', 'accent', 'neutral']) {
      if (typeof palette[field] !== 'string' || palette[field].trim().length < 2) failures.push(`${relative}: projectPalette.${field} must be filled.`);
    }
    if (!Array.isArray(palette.avoid) || palette.avoid.length === 0 || palette.avoid.some((item) => String(item).trim() === '')) failures.push(`${relative}: projectPalette.avoid must contain at least one explicit avoid rule.`);
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
    continue;
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
}

for (const file of promptFiles) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const relative = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  if (!/PREMIUM VISUAL POLICY:\s*PREMIUM_EDITORIAL_CINEMATIC_V1/iu.test(content)) continue;
  modernPrompts += 1;

  const requiredBlocks = [
    ['PREMIUM VISUAL QUALITY — HARD LOCK', /PREMIUM VISUAL QUALITY\s*[—-]\s*HARD LOCK/iu],
    ['PREMIUM CHARACTER DESIGN — HARD LOCK', /PREMIUM CHARACTER DESIGN\s*[—-]\s*HARD LOCK/iu],
    ['COLOR STORY — HARD LOCK', /COLOR STORY\s*[—-]\s*HARD LOCK/iu],
    ['REAL-LIFE SCENE PRIORITY — HARD LOCK', /REAL-LIFE SCENE PRIORITY\s*[—-]\s*HARD LOCK/iu],
  ];
  for (const [label, pattern] of requiredBlocks) if (!pattern.test(content)) failures.push(`${relative}: missing ${label}.`);

  if (!/COLOR STORY POLICY:\s*INTENTIONAL_COLOR_STORY_V1/iu.test(content)) failures.push(`${relative}: missing INTENTIONAL_COLOR_STORY_V1 marker.`);
  if (!/PROJECT COLOR PALETTE/iu.test(content)) failures.push(`${relative}: missing PROJECT COLOR PALETTE block.`);

  const sceneMatches = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  for (let index = 0; index < sceneMatches.length; index += 1) {
    const start = sceneMatches[index].index ?? 0;
    const end = sceneMatches[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    const scene = Number(sceneMatches[index][1]);
    if (!/COLOR DIRECTION:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks COLOR DIRECTION.`);
    if (!/PREMIUM CHARACTER DIRECTION:/iu.test(block)) failures.push(`${relative}: scene ${scene} lacks PREMIUM CHARACTER DIRECTION.`);
  }
}

if (warnings.length) {
  console.warn('\nPREMIUM CONTENT QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (failures.length) {
  console.error('\nPREMIUM CONTENT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nPREMIUM CONTENT QA: PASS — ${modernPlans} premium/hook plan(s), ${modernPrompts} premium Flow prompt(s), ${legacyPlans} legacy plan(s) warned.\n`);
