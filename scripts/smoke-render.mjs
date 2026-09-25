#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const smokePublicDir = path.resolve('public/.smoke');
const tmpDir = path.resolve('tmp');
const propsPath = path.join(tmpDir, 'smoke-render-props.json');
const outputPath = path.join(tmpDir, 'smoke-render.mp4');

fs.rmSync(smokePublicDir, {recursive: true, force: true});
fs.mkdirSync(smokePublicDir, {recursive: true});
fs.mkdirSync(tmpDir, {recursive: true});
fs.rmSync(outputPath, {force: true});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="#e9edf2"/><circle cx="960" cy="380" r="120" fill="#f4d2b8" stroke="#20242a" stroke-width="18"/><line x1="960" y1="500" x2="960" y2="760" stroke="#20242a" stroke-width="18" stroke-linecap="round"/><line x1="960" y1="590" x2="790" y2="690" stroke="#20242a" stroke-width="18" stroke-linecap="round"/><line x1="960" y1="590" x2="1130" y2="690" stroke="#20242a" stroke-width="18" stroke-linecap="round"/><line x1="960" y1="760" x2="830" y2="930" stroke="#20242a" stroke-width="18" stroke-linecap="round"/><line x1="960" y1="760" x2="1090" y2="930" stroke="#20242a" stroke-width="18" stroke-linecap="round"/></svg>`;
fs.writeFileSync(path.join(smokePublicDir, '01.svg'), svg);

const props = {
  targetFormat: 'youtube',
  audio: '',
  scenes: [
    {image: '.smoke/01.svg', from: 0, durationInFrames: 30, effect: 'static'},
  ],
  captions: [],
  sceneLabels: [],
  autoCaptions: false,
  endHoldMs: 0,
};
fs.writeFileSync(propsPath, `${JSON.stringify(props, null, 2)}\n`);

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(
  npx,
  ['remotion', 'render', 'src/index.ts', 'Phase3YouTube', outputPath, `--props=${propsPath}`],
  {stdio: 'inherit', shell: process.platform === 'win32'},
);

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) {
  throw new Error('Smoke render did not produce a non-empty MP4.');
}

console.log(`REMOTION SMOKE RENDER: PASS — ${path.relative('.', outputPath)}`);
fs.rmSync(smokePublicDir, {recursive: true, force: true});
