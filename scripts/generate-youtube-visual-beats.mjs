#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {countWords, resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error('Usage: npm run materialize:phase1 -- <phase1-scenes.json> <phase1-scenes.generated.json>');
  process.exit(1);
}

const absoluteInput = path.resolve(inputPath);
const absoluteOutput = path.resolve(outputPath);
const raw = JSON.parse(fs.readFileSync(absoluteInput, 'utf8'));
const resolved = resolvePhase1Plan(raw, absoluteInput);
const scenes = Array.isArray(resolved.scenes) ? resolved.scenes : [];

if (scenes.length === 0) throw new Error('No scenes were resolved.');

const isPremium = raw.premiumVisualPolicy === 'PREMIUM_EDITORIAL_CINEMATIC_V1';
const palette = raw.projectPalette && typeof raw.projectPalette === 'object' ? raw.projectPalette : null;

const lightPatterns = [
  'clear warm/cool separation with the focal subject carrying the strongest accent',
  'soft directional daylight with a slightly warmer focal zone and calmer background',
  'controlled indoor practical lighting with one deliberate accent-color focal point',
  'brighter editorial daylight with crisp color separation and no grey wash',
  'slightly moodier contrast while preserving clean readable colors and natural skinless Stickman forms',
  'balanced neutral light with one saturated project accent guiding the eye',
];

const premiumCharacterByDensity = {
  solo: 'PREMIUM CHARACTER DIRECTION: Give the main Stickman a strong readable posture, role-specific outfit, clear minimal emotion and one meaningful prop or interaction when useful. Avoid neutral placeholder posing.',
  duo: 'PREMIUM CHARACTER DIRECTION: Give both Stickmen distinct role-specific outfits and contrasting readable poses. Show real interaction/reaction, not two figures merely standing beside each other.',
  group: 'PREMIUM CHARACTER DIRECTION: Create a clear social hierarchy with varied role-specific clothing, readable reactions and meaningful interaction. Keep one dominant focal figure or interaction.',
};

const paletteText = palette
  ? `primary ${String(palette.primary ?? '').trim()}, secondary ${String(palette.secondary ?? '').trim()}, accent ${String(palette.accent ?? '').trim()}, neutral ${String(palette.neutral ?? '').trim()}`
  : 'the project palette defined in the Flow prompt';

const premiumScenes = scenes.map((scene, index) => {
  if (!isPremium) return scene;
  const colorDirection = `COLOR DIRECTION: Use ${paletteText}; ${lightPatterns[index % lightPatterns.length]}. Keep believable local object colors and avoid grey/beige monotony.`;
  const premiumCharacterDirection = premiumCharacterByDensity[scene.socialDensity] ?? premiumCharacterByDensity.solo;
  return {
    ...scene,
    colorDirection,
    premiumCharacterDirection,
    visualTask: `${scene.visualTask} PREMIUM VISUAL HARD LOCK: premium modern editorial 2D quality, rich believable environment, purposeful lighting and depth, real-life scene before teaching graphic where possible. ${colorDirection} ${premiumCharacterDirection}`,
  };
});

const output = {...resolved, scenes: premiumScenes};
if (isPremium) {
  output.premiumVisualPolicy = 'PREMIUM_EDITORIAL_CINEMATIC_V1';
  output.colorStoryPolicy = raw.colorStoryPolicy;
  output.projectPalette = raw.projectPalette;
  output.scriptHookPolicy = raw.scriptHookPolicy;
  output.hookType = raw.hookType;
  output.coreConceptTerm = raw.coreConceptTerm;
  output.coreConceptIntroducedByScene = raw.coreConceptIntroducedByScene;
  output.realLifeExampleByScene = raw.realLifeExampleByScene;
  output.realLifeExampleSummary = raw.realLifeExampleSummary;
}
delete output.autoFromScript;
delete output.resolvedFromScript;

fs.mkdirSync(path.dirname(absoluteOutput), {recursive: true});
fs.writeFileSync(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const words = premiumScenes.reduce((sum, scene) => sum + countWords(scene.speechSection), 0);
console.log('YOUTUBE VISUAL BEATS MATERIALIZED');
console.log(`Scenes: ${premiumScenes.length}`);
console.log(`Spoken words: ${words}`);
console.log(`Average words/scene: ${(words / premiumScenes.length).toFixed(1)}`);
console.log(`Premium visual policy: ${isPremium ? 'ON' : 'legacy/off'}`);
console.log(`Output: ${absoluteOutput}`);
console.log('Review every visualTask before Phase 2. Do not merge beats merely to reduce image count.');
