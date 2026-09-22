#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-pipeline-'));
const timingsPath = path.join(dir, 'word-timings.json');
const planPath = path.join(dir, 'scene-plan.json');
const propsPath = path.join(dir, 'render-props.json');

const timings = [
  {text: 'Test', startMs: 0, endMs: 300},
  {text: 'für', startMs: 320, endMs: 500},
  {text: 'Reels', startMs: 520, endMs: 900},
  {text: 'läuft', startMs: 920, endMs: 1300},
];
const plan = {
  format: 'reel',
  audio: 'tests/final-voice.mp3',
  imageBasePath: 'tests/images',
  imageExtension: 'png',
  sceneStartWords: [1, 3],
};

fs.writeFileSync(timingsPath, JSON.stringify(timings));
fs.writeFileSync(planPath, JSON.stringify(plan));

const run = (script, args) => {
  const result = spawnSync(process.execPath, [script, ...args], {encoding: 'utf8'});
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || 'Unknown smoke-test error\n');
    process.exit(result.status ?? 1);
  }
};

try {
  run('scripts/validate-phase3-word-plan.mjs', [timingsPath, planPath]);
  run('scripts/build-phase3-props.mjs', [timingsPath, planPath, propsPath]);
  const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
  if (props.targetFormat !== 'reel') throw new Error('targetFormat was not normalized to reel.');
  if (props.autoCaptions !== true) throw new Error('Reel auto captions must default to true.');
  if (!Array.isArray(props.sceneEffects) || props.sceneEffects.length !== 2) throw new Error('Reel default motion effects were not generated.');
  console.log('REEL PIPELINE SMOKE PASS');
} finally {
  fs.rmSync(dir, {recursive: true, force: true});
}
