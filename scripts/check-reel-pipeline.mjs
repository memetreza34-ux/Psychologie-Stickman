#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-pipeline-'));
const timingsPath = path.join(dir, 'word-timings.json');
const phase1Path = path.join(dir, 'phase1-scenes.json');
const scenePlanPath = path.join(dir, 'scene-plan.json');
const propsPath = path.join(dir, 'render-props.json');

const timings = [
  {text: 'Test', startMs: 0, endMs: 300},
  {text: 'für', startMs: 320, endMs: 500},
  {text: 'Reels', startMs: 520, endMs: 900},
  {text: 'läuft', startMs: 920, endMs: 1300},
];
const phase1 = {
  project: 'smoke-reel',
  format: 'reel-9x16',
  audio: 'tests/final-voice.mp3',
  imageBasePath: 'tests/images',
  scenes: [
    {scene: 1, speechSection: 'Test für', visualTask: 'Scene 1'},
    {scene: 2, speechSection: 'Reels läuft', visualTask: 'Scene 2'},
  ],
};

fs.writeFileSync(timingsPath, JSON.stringify(timings));
fs.writeFileSync(phase1Path, JSON.stringify(phase1));

const run = (script, args) => {
  const result = spawnSync(process.execPath, [script, ...args], {encoding: 'utf8'});
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || 'Unknown smoke-test error\n');
    process.exit(result.status ?? 1);
  }
};

try {
  run('scripts/map-phase1-scenes.mjs', [timingsPath, phase1Path, scenePlanPath]);
  const scenePlan = JSON.parse(fs.readFileSync(scenePlanPath, 'utf8'));
  if (scenePlan.format !== 'reel') throw new Error('Phase 1 format was not normalized to reel.');
  if (JSON.stringify(scenePlan.sceneStartWords) !== JSON.stringify([1, 3])) throw new Error('Scene mapping did not derive expected start words.');

  run('scripts/validate-phase3-word-plan.mjs', [timingsPath, scenePlanPath]);
  run('scripts/build-phase3-props.mjs', [timingsPath, scenePlanPath, propsPath]);
  const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
  if (props.targetFormat !== 'reel') throw new Error('targetFormat was not normalized to reel.');
  if (props.autoCaptions !== true) throw new Error('Reel auto captions must default to true.');
  if (!Array.isArray(props.sceneEffects) || props.sceneEffects.length !== 2) throw new Error('Reel default motion effects were not generated.');
  console.log('REEL PIPELINE SMOKE PASS');
} finally {
  fs.rmSync(dir, {recursive: true, force: true});
}
