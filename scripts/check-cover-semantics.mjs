#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
const ACTIVE = 'CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1';
const SEMANTIC = 'TOPIC_EXPLICIT_VISUAL_THESIS_V1';
const LAYOUT = 'INTEGRATED_THUMBNAIL_COMPOSITION_V1';
const PLACEMENT = 'COMPOSITION_FIRST_NO_TOP_BANNER_V1';
const failures = [];
const warnings = [];

const plans = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'phase1-scenes.json') plans.push(full);
  }
};
walk(root);

const norm = (value) => String(value ?? '')
  .normalize('NFKC')
  .toLocaleLowerCase('de-DE')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

const wordCount = (value) => String(value ?? '').trim().split(/\s+/u).filter(Boolean).length;

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem !== ACTIVE) continue;

  if (plan.coverSemanticPolicy !== SEMANTIC) failures.push(`${rel}: coverSemanticPolicy must be ${SEMANTIC}.`);
  if (plan.coverLayoutPolicy !== LAYOUT) failures.push(`${rel}: coverLayoutPolicy must be ${LAYOUT}.`);
  if (plan.coverTitlePlacementPolicy !== PLACEMENT) failures.push(`${rel}: coverTitlePlacementPolicy must be ${PLACEMENT}.`);
  if (plan.coverMechanismVisible !== true) failures.push(`${rel}: coverMechanismVisible must be true.`);

  const topic = String(plan.coverTopicTerm ?? '').trim();
  const thesis = String(plan.coverVisualThesis ?? '').trim();
  if (topic.length < 3) failures.push(`${rel}: coverTopicTerm is required.`);
  if (thesis.length < 20) failures.push(`${rel}: coverVisualThesis must be a concrete visible mechanism, not a vague phrase.`);

  const headline = String(plan.coverHeadline ?? '').trim();
  const headlineWords = wordCount(headline);
  if (!headline) failures.push(`${rel}: coverHeadline is required.`);
  else if (headlineWords < 2 || headlineWords > 7) failures.push(`${rel}: coverHeadline must contain 2-7 words.`);

  const scene1 = Array.isArray(plan.scenes) ? plan.scenes.find((scene) => Number(scene?.number) === 1) : null;
  if (!scene1) {
    failures.push(`${rel}: Scene 01 is required for cover semantic QA.`);
    continue;
  }

  if (String(scene1.visualIdea ?? '').trim().length < 12) failures.push(`${rel}: Scene 01 needs a concrete visualIdea.`);
  if (String(scene1.visualTask ?? '').trim().length < 20) failures.push(`${rel}: Scene 01 needs a concrete visualTask that visibly shows the topic mechanism.`);

  const coverTexts = [headline, ...(Array.isArray(scene1.flowText) ? scene1.flowText : [])].map(norm).filter(Boolean);
  const topicNorm = norm(topic);
  if (topicNorm && !coverTexts.some((text) => text.includes(topicNorm))) {
    failures.push(`${rel}: Scene 01 must visibly include coverTopicTerm '${topic}'.`);
  }

  const promptPath = path.join(path.dirname(path.dirname(file)), '02-google-flow', 'google-flow-prompt.txt');
  if (!fs.existsSync(promptPath)) {
    failures.push(`${rel}: google-flow-prompt.txt missing.`);
    continue;
  }

  const prompt = fs.readFileSync(promptPath, 'utf8');
  const requiredPromptMarkers = [
    ['cover semantics lock', /COVER SEMANTICS\s*[—-]\s*HARD LOCK/iu],
    ['cover topic term', /COVER TOPIC TERM:/iu],
    ['cover visual thesis', /COVER VISUAL THESIS:/iu],
    ['no top banner rule', /NO FULL-WIDTH TOP BANNER/iu],
  ];
  for (const [label, pattern] of requiredPromptMarkers) {
    if (!pattern.test(prompt)) failures.push(`${rel}: Flow prompt missing ${label}.`);
  }

  if (topic && !norm(prompt).includes(topicNorm)) failures.push(`${rel}: Flow prompt does not include coverTopicTerm '${topic}'.`);

  const scene1Start = prompt.search(/^SCENE\s+01\s*$/imu);
  const scene2Start = prompt.search(/^SCENE\s+02\s*$/imu);
  const scene1Prompt = scene1Start >= 0
    ? prompt.slice(scene1Start, scene2Start > scene1Start ? scene2Start : prompt.length)
    : '';

  if (!scene1Prompt) failures.push(`${rel}: Flow prompt is missing Scene 01.`);
  if (!/TITLE PLACEMENT:/iu.test(scene1Prompt)) failures.push(`${rel}: Scene 01 prompt needs explicit TITLE PLACEMENT.`);
  if (/full[- ]width[^\n]{0,30}top|across the full top|headline across the top/iu.test(scene1Prompt) && !/NO FULL-WIDTH TOP BANNER/iu.test(scene1Prompt)) {
    warnings.push(`${rel}: Scene 01 may still encourage a top-banner layout; review title placement.`);
  }
}

if (warnings.length) {
  console.warn('\nCOVER SEMANTICS QA: WARNINGS\n');
  warnings.forEach((x) => console.warn(`- ${x}`));
}
if (failures.length) {
  console.error('\nCOVER SEMANTICS QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}

console.log('\nCOVER SEMANTICS QA: PASS\n');
