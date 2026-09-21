#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';
import {buildImagePromptManifest} from './lib/youtube-image-prompts.mjs';

const [phase1Path, outputPath] = process.argv.slice(2);
if (!phase1Path || !outputPath) {
  console.error('Usage: npm run materialize:image-prompts -- <phase1-scenes.json> <image-prompts.json>');
  process.exit(1);
}
const absPhase1 = path.resolve(phase1Path);
const absOutput = path.resolve(outputPath);
const raw = JSON.parse(fs.readFileSync(absPhase1, 'utf8'));
const plan = resolvePhase1Plan(raw, absPhase1);
const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];
if (!scenes.length) throw new Error('No visual beats resolved.');
const manifest = buildImagePromptManifest(scenes);
fs.mkdirSync(path.dirname(absOutput), {recursive: true});
fs.writeFileSync(absOutput, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`YOUTUBE IMAGE PROMPTS MATERIALIZED: ${manifest.prompts.length}`);
console.log(`Output: ${absOutput}`);
