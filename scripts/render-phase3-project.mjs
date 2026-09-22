#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const [formatArg, propsPath, outputPath] = process.argv.slice(2);
const format = String(formatArg ?? '').toLowerCase();
const targetFormat = format === 'youtube' ? 'youtube' : format === 'reel' || format === 'reels' ? 'reel' : null;
const composition = targetFormat === 'youtube' ? 'Phase3YouTube' : targetFormat === 'reel' ? 'Phase3Reel' : null;

if (!composition || !propsPath || !outputPath) {
  console.error('Usage: npm run render:project -- <youtube|reel|reels> <render-props.json> <output.mp4>');
  console.error('youtube = 16:9 / 1920x1080, reel(s) = 9:16 / 1080x1920');
  process.exit(1);
}

const props = path.resolve(propsPath);
const output = path.resolve(outputPath);
if (!fs.existsSync(props)) {
  console.error(`Props not found: ${props}`);
  process.exit(1);
}
if (fs.existsSync(output)) {
  console.error('Refusing to overwrite existing render.');
  process.exit(1);
}

const parsedProps = JSON.parse(fs.readFileSync(props, 'utf8'));
if (parsedProps.targetFormat && parsedProps.targetFormat !== targetFormat) {
  console.error(`Format mismatch: command requested ${targetFormat}, props target ${parsedProps.targetFormat}.`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(output), {recursive: true});
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(
  npx,
  ['remotion', 'render', 'src/index.ts', composition, output, `--props=${props}`],
  {stdio: 'inherit', shell: process.platform === 'win32'},
);

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`RENDER PASS [${targetFormat}] via ${composition}: ${output}`);
