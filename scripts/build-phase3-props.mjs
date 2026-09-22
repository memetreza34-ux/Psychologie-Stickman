#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [wordTimingPath, scenePlanPath, outputPath] = process.argv.slice(2);
if (!wordTimingPath || !scenePlanPath || !outputPath) {
  console.error('Usage: npm run build:phase3-props -- <word-timings.json> <scene-plan.json> <render-props.json>');
  process.exit(1);
}

const words = JSON.parse(fs.readFileSync(path.resolve(wordTimingPath), 'utf8'));
const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));
const rawFormat = String(plan.format ?? '').toLowerCase();
const targetFormat = rawFormat === 'youtube' ? 'youtube' : rawFormat === 'reel' || rawFormat === 'reels' ? 'reel' : null;
if (!targetFormat) throw new Error('format must be youtube, reel or reels');
if (!Array.isArray(plan.sceneStartWords) || !plan.sceneStartWords.length) throw new Error('sceneStartWords required');

const allowedEffects = new Set(['static', 'zoom-in', 'zoom-out', 'pan-left', 'pan-right']);
const reelDefaultEffects = ['zoom-in', 'pan-left', 'zoom-out', 'pan-right'];
let sceneEffects = Array.isArray(plan.sceneEffects) ? plan.sceneEffects : [];
if (sceneEffects.some((effect) => !allowedEffects.has(effect))) throw new Error('sceneEffects contains unsupported values');
if (sceneEffects.length && sceneEffects.length !== plan.sceneStartWords.length) throw new Error('sceneEffects length must match sceneStartWords length');
if (!sceneEffects.length && targetFormat === 'reel') {
  sceneEffects = plan.sceneStartWords.map((_, index) => reelDefaultEffects[index % reelDefaultEffects.length]);
}

const props = {
  targetFormat,
  audio: plan.audio,
  wordTimings: words,
  imageBasePath: plan.imageBasePath,
  sceneStartWords: plan.sceneStartWords,
  imageExtension: plan.imageExtension ?? 'png',
  ...(Number.isFinite(plan.imageDigits) ? {imageDigits: plan.imageDigits} : {}),
  sceneEffects,
  captions: Array.isArray(plan.captions) ? plan.captions : [],
  autoCaptions: targetFormat === 'reel' ? plan.autoCaptions !== false : Boolean(plan.autoCaptions),
  captionWordsPerPage: Number.isFinite(Number(plan.captionWordsPerPage))
    ? Math.max(2, Math.min(7, Math.round(Number(plan.captionWordsPerPage))))
    : 4,
  endHoldMs: Number.isFinite(Number(plan.endHoldMs)) ? Math.max(0, Math.round(Number(plan.endHoldMs))) : 1000,
};

fs.mkdirSync(path.dirname(path.resolve(outputPath)), {recursive: true});
fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(props, null, 2)}\n`);
console.log(`Render props [${targetFormat}]: ${outputPath}`);
