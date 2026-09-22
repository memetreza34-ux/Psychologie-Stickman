#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-pipeline-'));
const timingsPath = path.join(dir, 'word-timings.json');
const scenePlanPath = path.join(dir, 'scene-plan.json');
const propsPath = path.join(dir, 'render-props.json');

const timings = [
  {text: 'Test', startMs: 0, endMs: 300},
  {text: 'für', startMs: 320, endMs: 500},
  {text: 'Reels', startMs: 520, endMs: 900},
  {text: 'läuft', startMs: 920, endMs: 1300},
];
const plan = {
  project: 'smoke-reel',
  format: 'reel-9x16',
  audio: 'tests/final-voice.mp3',
  captionWordsPerPage: 4,
  activeCaptionColor: '#FFD84D',
  programmaticScenes: [
    {kind: 'generic', startWord: 1, endWord: 2, actionWord: 1, label: 'TEST 1'},
    {kind: 'spotlight', startWord: 3, endWord: 4, actionWord: 3},
  ],
};

fs.writeFileSync(timingsPath, JSON.stringify(timings));
fs.writeFileSync(scenePlanPath, JSON.stringify(plan));

const run = (script, args) => {
  const result = spawnSync(process.execPath, [script, ...args], {encoding: 'utf8'});
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || 'Unknown smoke-test error\n');
    process.exit(result.status ?? 1);
  }
};

try {
  run('scripts/validate-phase3-word-plan.mjs', [timingsPath, scenePlanPath]);
  run('scripts/build-phase3-props.mjs', [timingsPath, scenePlanPath, propsPath]);
  const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));

  if (!Array.isArray(props.scenes) || props.scenes.length !== 2) throw new Error('Programmatic scenes were not preserved.');
  if (props.activeCaptionColor !== '#FFD84D') throw new Error('Active karaoke caption color is wrong.');
  if (props.showCaptions !== true) throw new Error('Reel captions must default to enabled.');
  if ('imageBasePath' in props) throw new Error('Reel props must not contain imageBasePath.');
  if ('sceneEffects' in props) throw new Error('Reel props must not fall back to image pan/zoom effects.');

  const root = fs.readFileSync('src/Root.tsx', 'utf8');
  if (!/id="Phase3Reel"[\s\S]*?component=\{ProgrammaticReel\}/.test(root)) throw new Error('Phase3Reel is not wired to ProgrammaticReel.');
  if (!root.includes('id="ProgrammaticReelTest"')) throw new Error('ProgrammaticReelTest composition is missing.');

  const renderer = fs.readFileSync('src/reels/ProgrammaticReel.tsx', 'utf8');
  if (renderer.includes('<Img') || renderer.includes('imageBasePath')) throw new Error('Programmatic reel renderer must not depend on image assets.');
  if (!renderer.includes('activeCaptionColor')) throw new Error('Karaoke caption color support is missing.');
  if (!renderer.includes('actionWord')) throw new Error('Audio-word animation cue support is missing.');

  console.log('REEL PIPELINE SMOKE PASS — programmatic visuals, karaoke captions, audio-word cues');
} finally {
  fs.rmSync(dir, {recursive: true, force: true});
}
