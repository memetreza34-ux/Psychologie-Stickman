#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
const ACTIVE = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const DIRECTOR = 'OBSERVABLE_SCENE_FIRST_V1';
const FLOW = 'NATURAL_FLOW_MASTER_V2';
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

const wordCount = (value) => String(value ?? '').trim().split(/\s+/u).filter(Boolean).length;
const textList = (value) => (Array.isArray(value) ? value : [value]).map((item) => String(item ?? '').trim()).filter(Boolean);

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem !== ACTIVE) continue;

  const isNew = plan.visualDirectorPolicy === DIRECTOR || plan.flowPromptPolicy === FLOW;
  if (!isNew) {
    warnings.push(`${rel}: historical cover plan retained; future projects use ${DIRECTOR} + ${FLOW}.`);
    continue;
  }

  if (plan.coverSemanticPolicy !== SEMANTIC) failures.push(`${rel}: coverSemanticPolicy must be ${SEMANTIC}.`);
  if (plan.coverLayoutPolicy !== LAYOUT) failures.push(`${rel}: coverLayoutPolicy must be ${LAYOUT}.`);
  if (plan.coverTitlePlacementPolicy !== PLACEMENT) failures.push(`${rel}: coverTitlePlacementPolicy must be ${PLACEMENT}.`);
  if (plan.coverMechanismVisible !== true) failures.push(`${rel}: coverMechanismVisible must be true.`);
  if (plan.visualDirectorPolicy !== DIRECTOR) failures.push(`${rel}: cover must use ${DIRECTOR}.`);
  if (plan.flowPromptPolicy !== FLOW) failures.push(`${rel}: cover must use ${FLOW}.`);
  if ('promptContract' in plan) failures.push(`${rel}: retired promptContract must not exist in a new cover plan.`);

  const topic = String(plan.coverTopicTerm ?? '').trim();
  const thesis = String(plan.coverVisualThesis ?? '').trim();
  if (topic.length < 3) failures.push(`${rel}: coverTopicTerm is required as internal planning metadata.`);
  if (thesis.length < 20) failures.push(`${rel}: coverVisualThesis must describe a concrete visible mechanism/situation.`);

  const headline = String(plan.coverHeadline ?? '').trim();
  const headlineWords = wordCount(headline);
  if (!headline) failures.push(`${rel}: coverHeadline is required.`);
  else if (headlineWords < 2 || headlineWords > 7) failures.push(`${rel}: coverHeadline must contain 2-7 words.`);

  const scene1 = Array.isArray(plan.scenes) ? plan.scenes.find((scene) => Number(scene?.number ?? scene?.scene) === 1) : null;
  if (!scene1) {
    failures.push(`${rel}: BILD/Scene 01 is required for cover semantic QA.`);
    continue;
  }

  if (String(scene1.visualIdea ?? '').trim().length < 12) failures.push(`${rel}: Scene 01 needs a concrete visualIdea.`);
  if (String(scene1.observableEvidence ?? '').trim().length < 12) failures.push(`${rel}: Scene 01 needs concrete observableEvidence.`);
  if (String(scene1.dominantRelation ?? '').trim().length < 8) failures.push(`${rel}: Scene 01 needs a dominantRelation.`);
  if (String(scene1.visualTask ?? '').trim().length < 20) failures.push(`${rel}: Scene 01 needs a concrete visualTask.`);

  const plannedCoverTexts = textList(scene1.flowText);
  if (!plannedCoverTexts.length) failures.push(`${rel}: Scene 01 must contain planned cover text.`);
  if (plannedCoverTexts.length > 4) failures.push(`${rel}: Scene 01 has too many visible text strings (${plannedCoverTexts.length}).`);
  if (plannedCoverTexts[0] && plannedCoverTexts[0] !== headline) failures.push(`${rel}: first Scene 01 text must equal coverHeadline exactly.`);

  const promptPath = path.join(path.dirname(path.dirname(file)), '02-google-flow', 'google-flow-prompt.txt');
  if (!fs.existsSync(promptPath)) {
    failures.push(`${rel}: google-flow-prompt.txt missing.`);
    continue;
  }

  const prompt = fs.readFileSync(promptPath, 'utf8');
  if (!prompt.includes(ACTIVE)) failures.push(`${rel}: Flow prompt missing ${ACTIVE}.`);
  if (!prompt.includes(FLOW)) failures.push(`${rel}: Flow prompt missing ${FLOW}.`);
  if (!prompt.includes(DIRECTOR)) failures.push(`${rel}: Flow prompt missing ${DIRECTOR}.`);
  if (/FLOW_SCENE_PROMPT_CONTRACT_V1/iu.test(prompt)) failures.push(`${rel}: retired prompt contract remains in new Flow prompt.`);

  const image1Start = prompt.search(/^BILD\s+01\s*$/imu);
  const image2Start = prompt.search(/^BILD\s+02\s*$/imu);
  const image1Prompt = image1Start >= 0 ? prompt.slice(image1Start, image2Start > image1Start ? image2Start : prompt.length) : '';
  if (!image1Prompt) failures.push(`${rel}: Flow prompt is missing BILD 01.`);
  if (!/No other readable text|only readable text/iu.test(image1Prompt)) failures.push(`${rel}: BILD 01 must forbid extra readable text.`);
  if (!/concrete|visible|looks|stands|sits|holds|points|walks|talks|checks|turns|gaze|posture/iu.test(image1Prompt)) warnings.push(`${rel}: BILD 01 may be too abstract; review observable evidence.`);

  if (/full[- ]width[^\n]{0,30}top|headline across the top/iu.test(image1Prompt)) warnings.push(`${rel}: BILD 01 may encourage a full-width top banner; review composition.`);
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
