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

const output = {...resolved};
delete output.autoFromScript;
delete output.resolvedFromScript;

fs.mkdirSync(path.dirname(absoluteOutput), {recursive: true});
fs.writeFileSync(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const words = scenes.reduce((sum, scene) => sum + countWords(scene.speechSection), 0);
console.log('YOUTUBE VISUAL BEATS MATERIALIZED');
console.log(`Scenes: ${scenes.length}`);
console.log(`Spoken words: ${words}`);
console.log(`Average words/scene: ${(words / scenes.length).toFixed(1)}`);
console.log(`Output: ${absoluteOutput}`);
console.log('Review every visualTask before Phase 2. Do not merge beats merely to reduce image count.');
