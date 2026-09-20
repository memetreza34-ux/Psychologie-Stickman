#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {countWords, resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const root = path.resolve('channels/dinge-erklaert/youtube');
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

if (plans.length === 0) {
  console.log('YOUTUBE VISUAL DENSITY: PASS — no production phase1-scenes.json files found.');
  process.exit(0);
}

const failures = [];

for (const planPath of plans) {
  const raw = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  const plan = resolvePhase1Plan(raw, planPath);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  const counts = scenes.map((scene) => countWords(scene.speechSection));
  const totalWords = counts.reduce((sum, value) => sum + value, 0);
  const average = scenes.length ? totalWords / scenes.length : Infinity;
  const longest = counts.length ? Math.max(...counts) : Infinity;
  const minimumSceneCount = Math.ceil(totalWords / 20);
  const tooLong = counts
    .map((words, index) => ({scene: index + 1, words}))
    .filter((item) => item.words > 28);

  console.log(`\n${path.relative(process.cwd(), planPath)}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log(`Spoken words represented: ${totalWords}`);
  console.log(`Average words/scene: ${average.toFixed(1)}`);
  console.log(`Longest scene: ${longest} words`);
  console.log(`Minimum density floor for this script: ${minimumSceneCount} scenes`);

  if (scenes.length === 0) failures.push(`${planPath}: no visual beats.`);
  if (average > 18) failures.push(`${planPath}: average ${average.toFixed(1)} words/scene exceeds hard 18-word average.`);
  if (scenes.length < minimumSceneCount) failures.push(`${planPath}: ${scenes.length} scenes is below density floor ${minimumSceneCount}.`);
  if (tooLong.length > 0) {
    failures.push(
      `${planPath}: scene(s) above 28 spoken words: ${tooLong.map((item) => `${item.scene}=${item.words}`).join(', ')}.`,
    );
  }

  scenes.forEach((scene, index) => {
    if (typeof scene.visualTask !== 'string' || scene.visualTask.trim() === '') {
      failures.push(`${planPath}: scene ${index + 1} has no visualTask.`);
    }
  });
}

if (failures.length > 0) {
  console.error('\nYOUTUBE VISUAL DENSITY: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error('\nRule: this format lives from many precise images. Split new facts, actors, places, numbers, actions, comparisons and mechanism steps into their own visual beats.');
  process.exit(1);
}

console.log('\nYOUTUBE VISUAL DENSITY: PASS\n');
