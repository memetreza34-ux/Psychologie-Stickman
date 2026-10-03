#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {countWords, resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const roots = [path.resolve('youtube'), path.resolve('reels')];
const plans = [];

const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'phase1-scenes.json') plans.push(full);
  }
};

roots.forEach(walk);

const productionPlans = plans.filter((planPath) => !planPath.split(path.sep).includes('00-vorlage'));

if (productionPlans.length === 0) {
  console.log('VISUAL DENSITY: PASS — no production phase1-scenes.json files found.');
  process.exit(0);
}

const failures = [];
const warnings = [];

for (const planPath of productionPlans) {
  const raw = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  const plan = resolvePhase1Plan(raw, planPath);
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
  const counts = scenes.map((scene) => countWords(scene.speechSection));
  const totalWords = counts.reduce((sum, value) => sum + value, 0);
  const average = scenes.length ? totalWords / scenes.length : 0;
  const longest = counts.length ? Math.max(...counts) : 0;
  const minimumSceneCount = Math.ceil(totalWords / 18);
  const strict = plan.visualSequencePolicy === 'VISUAL_SEQUENCE_HARDENING_V1';
  const reviewedExtendedBeats = new Set(
    Array.isArray(plan.reviewedExtendedBeats)
      ? plan.reviewedExtendedBeats.filter((value) => Number.isInteger(value) && value > 0)
      : [],
  );

  const report = (message, hard = true) => {
    if (strict && hard) failures.push(message);
    else warnings.push(`${message}${strict ? '' : ' [historical/non-hardened plan]'}`);
  };

  console.log(`\n${path.relative(process.cwd(), planPath)}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log(`Spoken words represented: ${totalWords}`);
  console.log(`Average words/scene: ${average.toFixed(1)}`);
  console.log(`Longest scene: ${longest} words`);
  console.log(`Minimum density floor for this script: ${minimumSceneCount} scenes`);
  console.log(`Density mode: ${strict ? 'STRICT / VISUAL_SEQUENCE_HARDENING_V1' : 'LEGACY REVIEW'}`);

  if (scenes.length === 0) report(`${planPath}: no visual beats.`);
  if (scenes.length > 0 && average > 16) report(`${planPath}: average ${average.toFixed(1)} words/scene exceeds 16-word average.`);
  if (scenes.length < minimumSceneCount) report(`${planPath}: ${scenes.length} scenes is below density floor ${minimumSceneCount}.`);

  scenes.forEach((scene, index) => {
    const words = counts[index] ?? 0;
    const sceneNumber = index + 1;
    const isReviewedExtended = scene.allowExtendedBeat === true || reviewedExtendedBeats.has(sceneNumber);

    if (words > 28) {
      report(`${planPath}: scene ${sceneNumber} has ${words} words; absolute maximum is 28.`);
    } else if (words > 20 && !isReviewedExtended) {
      report(`${planPath}: scene ${sceneNumber} has ${words} words; scenes above 20 require explicit editorial review.`);
    } else if (words > 20) {
      warnings.push(`${planPath}: scene ${sceneNumber} uses reviewed extended beat (${words} words).`);
    }

    const hasLegacyVisualTask = typeof scene.visualTask === 'string' && scene.visualTask.trim() !== '';
    const hasObservableEvidence = typeof scene.observableEvidence === 'string' && scene.observableEvidence.trim() !== '';
    if (!hasLegacyVisualTask && !hasObservableEvidence) {
      report(`${planPath}: scene ${sceneNumber} has neither visualTask nor observableEvidence.`);
    }

    if (scene.textPolicy && typeof scene.textPolicy !== 'string') {
      report(`${planPath}: scene ${sceneNumber} has invalid textPolicy.`);
    }
  });
}

if (warnings.length > 0) {
  console.warn('\nVISUAL DENSITY WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (failures.length > 0) {
  console.error('\nVISUAL DENSITY: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('\nVISUAL DENSITY: PASS\n');
