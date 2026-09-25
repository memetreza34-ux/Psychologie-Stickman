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

const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

const words = JSON.parse(fs.readFileSync(path.resolve(wordTimingPath), 'utf8'));
const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));
const targetFormat = normalizeFormat(plan.format);
if (!targetFormat) throw new Error('format must identify youtube or reel');
if (!Array.isArray(plan.sceneStartWords) || !plan.sceneStartWords.length) throw new Error('sceneStartWords required');

const allowedEffects = new Set(['static', 'zoom-in', 'zoom-out', 'pan-left', 'pan-right']);
const allowedLabelPositions = new Set(['top-left', 'top-center', 'center', 'bottom-center']);
const allowedLabelVariants = new Set(['keyword', 'cover']);
const reelDefaultEffects = ['zoom-in', 'pan-left', 'zoom-out', 'pan-right'];
let sceneEffects = Array.isArray(plan.sceneEffects) ? plan.sceneEffects : [];
if (sceneEffects.some((effect) => !allowedEffects.has(effect))) throw new Error('sceneEffects contains unsupported values');
if (sceneEffects.length && sceneEffects.length !== plan.sceneStartWords.length) throw new Error('sceneEffects length must match sceneStartWords length');
if (!sceneEffects.length && targetFormat === 'reel') sceneEffects = plan.sceneStartWords.map((_, index) => reelDefaultEffects[index % reelDefaultEffects.length]);

const sceneLabels = Array.isArray(plan.sceneLabels) ? plan.sceneLabels : [];
sceneLabels.forEach((label, index) => {
  if (!Number.isInteger(label.scene) || label.scene < 1 || label.scene > plan.sceneStartWords.length) throw new Error(`sceneLabels[${index}].scene must reference an existing scene`);
  if (typeof label.text !== 'string' || label.text.trim() === '') throw new Error(`sceneLabels[${index}].text must be a non-empty string`);
  if (label.position && !allowedLabelPositions.has(label.position)) throw new Error(`sceneLabels[${index}].position is unsupported`);
  const variant = label.variant ?? 'keyword';
  if (!allowedLabelVariants.has(variant)) throw new Error(`sceneLabels[${index}].variant must be cover or keyword`);
  if (variant === 'cover' && label.scene !== 1) throw new Error(`sceneLabels[${index}]: cover variant is only allowed on scene 1`);
  const wordCount = countWords(label.text);
  if (variant === 'cover' && (wordCount < 2 || wordCount > 7)) throw new Error(`sceneLabels[${index}]: cover headline must contain 2-7 words`);
  if (variant === 'keyword' && wordCount > 5) throw new Error(`sceneLabels[${index}]: keyword overlay must contain at most 5 words`);
});

if (targetFormat === 'youtube') {
  const flowCover = String(plan.coverTextRenderer ?? '').toUpperCase() === 'GOOGLE_FLOW';
  const coverLabels = sceneLabels.filter((label) => label.scene === 1 && (label.variant ?? 'keyword') === 'cover');

  if (flowCover) {
    const coverWords = countWords(plan.coverHeadline);
    if (coverWords < 2 || coverWords > 7) throw new Error('YouTube Flow cover requires coverHeadline with 2-7 words.');
    if (coverLabels.length !== 0) throw new Error('Flow-rendered cover title must not be duplicated as a Remotion cover label.');
  } else if (coverLabels.length !== 1) {
    throw new Error('Legacy YouTube Phase 3 requires exactly one scene-1 cover label with variant="cover".');
  }

  const labelsPerScene = new Map();
  sceneLabels.forEach((label) => labelsPerScene.set(label.scene, (labelsPerScene.get(label.scene) ?? 0) + 1));
  for (const [scene, count] of labelsPerScene.entries()) if (count > 1) throw new Error(`YouTube scene ${scene} contains more than one text overlay.`);

  const visibleTextMoments = sceneLabels.length + (flowCover ? 1 : 0);
  const maxOverlayScenes = Math.max(1, Math.ceil(plan.sceneStartWords.length * 0.3));
  if (visibleTextMoments > maxOverlayScenes) throw new Error(`YouTube text moments are too dense: ${visibleTextMoments}/${plan.sceneStartWords.length}. Maximum is ${maxOverlayScenes} (30%).`);
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
  sceneLabels,
  ...(targetFormat === 'youtube' && plan.coverTextRenderer ? {coverTextRenderer: plan.coverTextRenderer} : {}),
  ...(targetFormat === 'youtube' && plan.coverHeadline ? {coverHeadline: plan.coverHeadline} : {}),
  autoCaptions: targetFormat === 'reel' ? plan.autoCaptions !== false : Boolean(plan.autoCaptions),
  captionWordsPerPage: Number.isFinite(Number(plan.captionWordsPerPage)) ? Math.max(2, Math.min(7, Math.round(Number(plan.captionWordsPerPage)))) : 4,
  endHoldMs: Number.isFinite(Number(plan.endHoldMs)) ? Math.max(0, Math.round(Number(plan.endHoldMs))) : 1000,
};

fs.mkdirSync(path.dirname(path.resolve(outputPath)), {recursive: true});
fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(props, null, 2)}\n`);
console.log(`Render props [${targetFormat}]: ${outputPath}`);
