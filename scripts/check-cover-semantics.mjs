#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('youtube');
const plans = [];
const failures = [];
const warnings = [];
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

for (const file of plans) {
  if (file.split(path.sep).includes('00-vorlage')) continue;
  const rel = path.relative(process.cwd(), file);
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (plan.visualSystem) {
    warnings.push(`${rel}: historical project with old visual system retained; skipped for current cover QA.`);
    continue;
  }
  if (plan.visualWorldStatus === 'UNDEFINED') {
    warnings.push(`${rel}: visual world UNDEFINED; cover generation is blocked.`);
    continue;
  }

  const activeWorld = plan.visualWorld === 'PSYCHOLOGY_STICKMAN_WORLD_V1' || ['ACTIVE', 'READY'].includes(plan.visualWorldStatus);
  if (!activeWorld) {
    warnings.push(`${rel}: historical/non-active visual world; skipped for current cover QA.`);
    continue;
  }

  if (plan.coverMechanismVisible !== true) failures.push(`${rel}: coverMechanismVisible must be true.`);
  const topic = String(plan.coverTopicTerm ?? '').trim();
  const thesis = String(plan.coverVisualThesis ?? '').trim();
  const headline = String(plan.coverHeadline ?? '').trim();
  if (topic.length < 3) failures.push(`${rel}: coverTopicTerm is required.`);
  if (thesis.length < 20) failures.push(`${rel}: coverVisualThesis must describe a concrete visible situation.`);
  if (wordCount(headline) < 2 || wordCount(headline) > 7) failures.push(`${rel}: coverHeadline must contain 2-7 words.`);

  const scene1 = Array.isArray(plan.scenes) ? plan.scenes.find((scene) => Number(scene?.number ?? scene?.scene) === 1) : null;
  if (!scene1) {
    failures.push(`${rel}: Scene 01 is required.`);
    continue;
  }
  if (String(scene1.observableEvidence ?? '').trim().length < 12) failures.push(`${rel}: Scene 01 needs observableEvidence.`);
  if (String(scene1.dominantRelation ?? '').trim().length < 8) failures.push(`${rel}: Scene 01 needs dominantRelation.`);
  if (String(scene1.representationReason ?? '').trim().length < 8) failures.push(`${rel}: Scene 01 needs representationReason.`);
  if (plan.thumbnailGenerationPolicy === 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1') {
    if (scene1.textPolicy === 'FLOW_EXACT_COVER_TEXT' || String(scene1.flowText ?? '').trim()) failures.push(`${rel}: independent Scene 01 must NOT be the thumbnail or contain its text.`);
    if ((plan.flowTextMoments ?? []).some((m) => Number(m.scene) === 1 && m.kind === 'cover')) failures.push(`${rel}: thumbnail text moment must not appear in video scenes.`);
    const expectedTarget = plan.workflowVersion === 'V2' ? '03-bilder/00-cover.png' : '05-export/thumbnail.png';
    if (plan.thumbnailTargetPath !== expectedTarget) failures.push(`${rel}: expected thumbnail target ${expectedTarget}.`);
  }

  const promptPath = path.join(path.dirname(path.dirname(file)), '02-google-flow', 'google-flow-prompt.txt');
  if (!fs.existsSync(promptPath)) {
    failures.push(`${rel}: google-flow-prompt.txt missing.`);
    continue;
  }
  const prompt = fs.readFileSync(promptPath, 'utf8');
  if (/VISUAL WORLD STATUS:\s*UNDEFINED/iu.test(prompt)) failures.push(`${rel}: Flow prompt still has undefined visual world.`);
  if (plan.workflowVersion !== 'V2' && !/VISUAL WORLD:\s*PSYCHOLOGY_STICKMAN_WORLD_V1/iu.test(prompt)) failures.push(`${rel}: Flow prompt must use PSYCHOLOGY_STICKMAN_WORLD_V1.`);
  if (!/^BILD\s+01\s*$/gimu.test(prompt)) failures.push(`${rel}: Flow prompt missing BILD 01.`);
  if (plan.thumbnailGenerationPolicy === 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1' && !/THUMBNAIL CANDIDATES/iu.test(prompt)) failures.push(`${rel}: missing three separate thumbnail candidates section.`);
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
