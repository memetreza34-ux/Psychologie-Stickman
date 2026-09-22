#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [wordTimingPath, scenePlanPath] = process.argv.slice(2);
if (!wordTimingPath || !scenePlanPath) {
  console.error('Usage: npm run validate:phase3 -- <word-timings.json> <scene-plan.json>');
  process.exit(1);
}

const normalizeFormat = (value) => {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized.startsWith('reel')) return 'reel';
  if (normalized.startsWith('youtube')) return 'youtube';
  return null;
};

const words = JSON.parse(fs.readFileSync(path.resolve(wordTimingPath), 'utf8'));
const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));
const starts = plan.sceneStartWords ?? [];
const format = normalizeFormat(plan.format);
const errors = [];
const allowedEffects = new Set(['static', 'zoom-in', 'zoom-out', 'pan-left', 'pan-right']);

if (!Array.isArray(words) || !words.length) errors.push('word-timings must be non-empty.');
if (!format) errors.push('format must identify youtube or reel.');
if (!starts.length || starts[0] !== 1) errors.push('sceneStartWords must start with 1.');

starts.forEach((value, index) => {
  if (!Number.isInteger(value) || value < 1 || value > words.length) errors.push(`Invalid scene start ${value}.`);
  if (index && value <= starts[index - 1]) errors.push('sceneStartWords must strictly increase.');
});

if (Array.isArray(plan.sceneEffects) && plan.sceneEffects.length) {
  if (plan.sceneEffects.length !== starts.length) errors.push('sceneEffects length must match sceneStartWords length.');
  plan.sceneEffects.forEach((effect) => {
    if (!allowedEffects.has(effect)) errors.push(`Unsupported scene effect: ${effect}.`);
  });
  if (format === 'youtube') errors.push('YouTube must not contain sceneEffects; keep Longform static unless the format rules change.');
}

if (errors.length) {
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`PHASE 3 PLAN: PASS (${format})`);
