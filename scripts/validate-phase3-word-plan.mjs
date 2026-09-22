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
const format = normalizeFormat(plan.format);
const errors = [];

if (!Array.isArray(words) || !words.length) errors.push('word-timings must be non-empty.');
if (!format) errors.push('format must identify youtube or reel.');

if (format === 'reel') {
  const scenes = Array.isArray(plan.programmaticScenes) ? plan.programmaticScenes : [];
  const allowedKinds = new Set(['coffee-spill', 'crowd-gaze', 'reality', 'spotlight', 'phone', 'comparison', 'generic']);
  if (!scenes.length) errors.push('programmaticScenes required for reels.');

  scenes.forEach((scene, index) => {
    const label = `programmaticScenes[${index}]`;
    if (!allowedKinds.has(scene.kind)) errors.push(`${label}.kind unsupported: ${scene.kind}`);
    if (!Number.isInteger(scene.startWord) || scene.startWord < 1 || scene.startWord > words.length) errors.push(`${label}.startWord invalid.`);
    if (!Number.isInteger(scene.endWord) || scene.endWord < scene.startWord || scene.endWord > words.length) errors.push(`${label}.endWord invalid.`);
    if (scene.actionWord !== undefined && (!Number.isInteger(scene.actionWord) || scene.actionWord < scene.startWord || scene.actionWord > scene.endWord)) {
      errors.push(`${label}.actionWord must be inside the scene word range.`);
    }
    if (index > 0 && scene.startWord <= scenes[index - 1].startWord) errors.push('programmaticScenes startWord values must strictly increase.');
  });

  if (scenes.length && scenes[0].startWord !== 1) errors.push('First programmatic reel scene must start with word 1.');
} else if (format === 'youtube') {
  const starts = plan.sceneStartWords ?? [];
  if (!starts.length || starts[0] !== 1) errors.push('sceneStartWords must start with 1.');
  starts.forEach((value, index) => {
    if (!Number.isInteger(value) || value < 1 || value > words.length) errors.push(`Invalid scene start ${value}.`);
    if (index && value <= starts[index - 1]) errors.push('sceneStartWords must strictly increase.');
  });
  if (Array.isArray(plan.sceneEffects) && plan.sceneEffects.length) errors.push('YouTube must not contain sceneEffects.');
}

if (errors.length) {
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`PHASE 3 PLAN: PASS (${format})`);
