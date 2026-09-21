#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';
import {buildImagePromptManifest} from './lib/youtube-image-prompts.mjs';

const root = path.resolve('youtube');
const plans = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'phase1-scenes.json') plans.push(full);
  }
};
walk(root);

const failures = [];
for (const planPath of plans) {
  const raw = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  if (raw.phase2PromptCoverageRequired !== true) continue;
  const plan = resolvePhase1Plan(raw, planPath);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  const manifest = buildImagePromptManifest(scenes);
  const prompts = manifest.prompts;

  console.log(`\n${path.relative(process.cwd(), planPath)}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log(`Generated prompts: ${prompts.length}`);

  if (prompts.length !== scenes.length) failures.push(`${planPath}: prompt count mismatch.`);
  const ids = new Set();
  prompts.forEach((prompt, index) => {
    const scene = scenes[index];
    if (prompt.scene !== scene.scene) failures.push(`${planPath}: scene number mismatch at ${index + 1}.`);
    if (!prompt.promptId || ids.has(prompt.promptId)) failures.push(`${planPath}: duplicate/missing promptId at scene ${scene.scene}.`);
    ids.add(prompt.promptId);
    if (prompt.speechSection !== scene.speechSection || prompt.visualTask !== scene.visualTask) failures.push(`${planPath}: scene ${scene.scene} mapping mismatch.`);
    if (prompt.prompt.length < 700) failures.push(`${planPath}: scene ${scene.scene} prompt too short.`);
    if (!prompt.prompt.includes('STYLE DNA:') || !prompt.prompt.includes('NEGATIVE:')) failures.push(`${planPath}: scene ${scene.scene} missing style/negative block.`);
    if (!prompt.prompt.includes(scene.speechSection)) failures.push(`${planPath}: scene ${scene.scene} spoken beat missing from prompt.`);
  });
}

if (failures.length) {
  console.error('\nYOUTUBE PROMPT COVERAGE: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nYOUTUBE PROMPT COVERAGE: PASS\n');
