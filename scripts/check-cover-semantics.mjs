#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
const ACTIVE = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const SEMANTIC = 'TOPIC_EXPLICIT_VISUAL_THESIS_V1';
const LAYOUT = 'INTEGRATED_THUMBNAIL_COMPOSITION_V1';
const PLACEMENT = 'COMPOSITION_FIRST_NO_TOP_BANNER_V1';
const CONTRACT = 'FLOW_SCENE_PROMPT_CONTRACT_V1';
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

const wordCount = (value) => String(value ?? '').trim().split(/\s+/u).filter(Boolean).length;
const textList = (value) => (Array.isArray(value) ? value : [value]).map((item) => String(item ?? '').trim()).filter(Boolean);

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem !== ACTIVE) continue;

  if (plan.coverSemanticPolicy !== SEMANTIC) failures.push(`${rel}: coverSemanticPolicy must be ${SEMANTIC}.`);
  if (plan.coverLayoutPolicy !== LAYOUT) failures.push(`${rel}: coverLayoutPolicy must be ${LAYOUT}.`);
  if (plan.coverTitlePlacementPolicy !== PLACEMENT) failures.push(`${rel}: coverTitlePlacementPolicy must be ${PLACEMENT}.`);
  if (plan.coverMechanismVisible !== true) failures.push(`${rel}: coverMechanismVisible must be true.`);
  if (plan.promptContract !== CONTRACT) failures.push(`${rel}: promptContract must be ${CONTRACT}.`);

  const topic = String(plan.coverTopicTerm ?? '').trim();
  const thesis = String(plan.coverVisualThesis ?? '').trim();
  if (topic.length < 3) failures.push(`${rel}: coverTopicTerm is required as internal planning metadata.`);
  if (thesis.length < 20) failures.push(`${rel}: coverVisualThesis must describe a concrete visible mechanism.`);

  const headline = String(plan.coverHeadline ?? '').trim();
  const headlineWords = wordCount(headline);
  if (!headline) failures.push(`${rel}: coverHeadline is required.`);
  else if (headlineWords < 2 || headlineWords > 7) failures.push(`${rel}: coverHeadline must contain 2-7 words.`);

  const scene1 = Array.isArray(plan.scenes)
    ? plan.scenes.find((scene) => Number(scene?.number ?? scene?.scene) === 1)
    : null;
  if (!scene1) {
    failures.push(`${rel}: Scene 01 is required for cover semantic QA.`);
    continue;
  }

  if (String(scene1.visualIdea ?? '').trim().length < 12) failures.push(`${rel}: Scene 01 needs a concrete visualIdea.`);
  if (String(scene1.visualTask ?? '').trim().length < 20) failures.push(`${rel}: Scene 01 needs a concrete visualTask that visibly shows the mechanism.`);
  if (!['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE'].includes(String(scene1.moodMode ?? '').toUpperCase())) failures.push(`${rel}: Scene 01 requires valid moodMode.`);
  const moodIntensity = Number(scene1.moodIntensity);
  if (!Number.isInteger(moodIntensity) || moodIntensity < 0 || moodIntensity > 4) failures.push(`${rel}: Scene 01 requires moodIntensity 0-4.`);
  if (!String(scene1.powerDynamic ?? '').trim()) failures.push(`${rel}: Scene 01 requires powerDynamic.`);

  const plannedCoverTexts = textList(scene1.flowText);
  if (!plannedCoverTexts.length) failures.push(`${rel}: Scene 01 must contain planned cover text.`);
  if (plannedCoverTexts.length > 4) failures.push(`${rel}: Scene 01 has too many visible text strings (${plannedCoverTexts.length}); simplify the cover.`);
  if (plannedCoverTexts[0] && plannedCoverTexts[0] !== headline) failures.push(`${rel}: first Scene 01 text must equal coverHeadline exactly.`);

  if (topic && !plannedCoverTexts.some((text) => text.toLocaleUpperCase('de-DE').includes(topic.toLocaleUpperCase('de-DE')))) {
    warnings.push(`${rel}: technical coverTopicTerm '${topic}' is not visible; this is allowed when the headline + visual thesis already explain the topic.`);
  }

  const promptPath = path.join(path.dirname(path.dirname(file)), '02-google-flow', 'google-flow-prompt.txt');
  if (!fs.existsSync(promptPath)) {
    failures.push(`${rel}: google-flow-prompt.txt missing.`);
    continue;
  }

  const prompt = fs.readFileSync(promptPath, 'utf8');
  if (!prompt.includes(ACTIVE)) failures.push(`${rel}: Flow prompt missing active visual marker ${ACTIVE}.`);
  if (!prompt.includes(CONTRACT)) failures.push(`${rel}: Flow prompt missing prompt contract ${CONTRACT}.`);
  if (!/NO FULL-WIDTH TOP BANNER/iu.test(prompt)) failures.push(`${rel}: Flow prompt missing no-top-banner rule.`);

  const scene1Start = prompt.search(/^SCENE\s+01\s*$/imu);
  const scene2Start = prompt.search(/^SCENE\s+02\s*$/imu);
  const scene1Prompt = scene1Start >= 0
    ? prompt.slice(scene1Start, scene2Start > scene1Start ? scene2Start : prompt.length)
    : '';

  if (!scene1Prompt) failures.push(`${rel}: Flow prompt is missing Scene 01.`);
  if (!/CAMERA:/iu.test(scene1Prompt)) failures.push(`${rel}: Scene 01 prompt needs CAMERA/title-safe composition direction.`);
  if (!/TEXT POLICY:/iu.test(scene1Prompt)) failures.push(`${rel}: Scene 01 prompt needs TEXT POLICY.`);
  if (!/PLANNED GERMAN TEXT:/iu.test(scene1Prompt)) failures.push(`${rel}: Scene 01 prompt needs exact planned German text.`);
  if (!/\[TEXT LOCK\]/u.test(scene1Prompt)) failures.push(`${rel}: Scene 01 PROMPT needs [TEXT LOCK].`);
  if (!/\[FINAL CHECK\]/u.test(scene1Prompt)) failures.push(`${rel}: Scene 01 PROMPT needs [FINAL CHECK].`);

  if (/full[- ]width[^\n]{0,30}top|across the full top|headline across the top/iu.test(scene1Prompt) && !/NO FULL-WIDTH TOP BANNER/iu.test(scene1Prompt)) {
    warnings.push(`${rel}: Scene 01 may still encourage a top-banner layout; review composition.`);
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
