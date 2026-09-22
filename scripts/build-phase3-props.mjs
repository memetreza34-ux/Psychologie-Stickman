#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [wordTimingPath, scenePlanPath, outputPath] = process.argv.slice(2);
if (!wordTimingPath || !scenePlanPath || !outputPath) {
  console.error('Usage: npm run build:phase3-props -- <word-timings.json> <scene-plan.json> <render-props.json>');
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
const targetFormat = normalizeFormat(plan.format);
if (!targetFormat) throw new Error('format must identify youtube or reel');
if (!Array.isArray(words) || !words.length) throw new Error('word-timings must be non-empty');

const endHoldMs = Number.isFinite(Number(plan.endHoldMs))
  ? Math.max(0, Math.round(Number(plan.endHoldMs)))
  : targetFormat === 'reel'
    ? 700
    : 1000;

let props;

if (targetFormat === 'reel') {
  const scenes = Array.isArray(plan.programmaticScenes) ? plan.programmaticScenes : [];
  if (!scenes.length) throw new Error('programmaticScenes required for reels');

  props = {
    audio: plan.audio ?? '',
    wordTimings: words,
    scenes,
    captionWordsPerPage: Number.isFinite(Number(plan.captionWordsPerPage))
      ? Math.max(2, Math.min(6, Math.round(Number(plan.captionWordsPerPage))))
      : 4,
    showCaptions: plan.showCaptions !== false,
    activeCaptionColor: typeof plan.activeCaptionColor === 'string' && plan.activeCaptionColor.trim()
      ? plan.activeCaptionColor
      : '#FFD84D',
    endHoldMs,
  };
} else {
  if (!Array.isArray(plan.sceneStartWords) || !plan.sceneStartWords.length) throw new Error('sceneStartWords required for youtube');
  if (!plan.imageBasePath) throw new Error('imageBasePath required for youtube');

  props = {
    targetFormat: 'youtube',
    audio: plan.audio,
    wordTimings: words,
    imageBasePath: plan.imageBasePath,
    sceneStartWords: plan.sceneStartWords,
    imageExtension: plan.imageExtension ?? 'png',
    ...(Number.isFinite(plan.imageDigits) ? {imageDigits: plan.imageDigits} : {}),
    sceneEffects: [],
    captions: Array.isArray(plan.captions) ? plan.captions : [],
    autoCaptions: Boolean(plan.autoCaptions),
    captionWordsPerPage: Number.isFinite(Number(plan.captionWordsPerPage))
      ? Math.max(2, Math.min(7, Math.round(Number(plan.captionWordsPerPage))))
      : 4,
    endHoldMs,
  };
}

fs.mkdirSync(path.dirname(path.resolve(outputPath)), {recursive: true});
fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(props, null, 2)}\n`);
console.log(`Render props [${targetFormat}]: ${outputPath}`);
