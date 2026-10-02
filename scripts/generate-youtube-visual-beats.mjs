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
if (!scenes.length) throw new Error('No scenes were resolved.');

const output = {
  ...resolved,
  visualWorldStatus: 'ACTIVE',
  visualWorld: 'PSYCHOLOGY_STICKMAN_WORLD_V1',
  representationVarietyPolicy: resolved.representationVarietyPolicy ?? 'REPRESENTATION_VARIETY_V1',
  flowTextStylePolicy: resolved.flowTextStylePolicy ?? 'PSYCHOLOGY_STICKMAN_WORLD_V1',
};

delete output.visualSystem;
delete output.characterSystem;
delete output.humanCharacterPolicy;
delete output.characterPresencePolicy;
delete output.moodPolicy;
delete output.environmentPolicy;
delete output.renderingPolicy;
delete output.representationPolicy;
delete output.premiumVisualPolicy;
delete output.colorStoryPolicy;
delete output.projectPalette;
delete output.autoFromScript;
delete output.resolvedFromScript;

fs.mkdirSync(path.dirname(absoluteOutput), {recursive: true});
fs.writeFileSync(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const words = scenes.reduce((sum, scene) => sum + countWords(scene.speechSection), 0);
const counts = scenes.reduce((acc, scene) => {
  const type = String(scene.sceneType ?? 'UNKNOWN');
  acc[type] = (acc[type] ?? 0) + 1;
  return acc;
}, {});
console.log('YOUTUBE VISUAL BEATS MATERIALIZED');
console.log(`Scenes: ${scenes.length}`);
console.log(`Spoken words: ${words}`);
console.log(`Average words/scene: ${(words / scenes.length).toFixed(1)}`);
console.log(`Visual world: ${output.visualWorld}`);
console.log(`Representations: ${Object.entries(counts).map(([type, count]) => `${type}=${count}`).join(', ')}`);
console.log('Representation rule: choose the clearest visual form first; people are optional.');
console.log(`Output: ${absoluteOutput}`);
