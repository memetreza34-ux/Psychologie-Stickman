#!/usr/bin/env node

import fs from 'node:fs';
import {spawnSync} from 'node:child_process';

const [inputPath, formatArg = 'youtube'] = process.argv.slice(2);
const format = String(formatArg).trim().toLowerCase().startsWith('reel') ? 'reel' : 'youtube';
if (!inputPath) {
  console.error('Usage: npm run validate:render -- <video.mp4> [youtube|reel]');
  process.exit(1);
}
if (!fs.existsSync(inputPath) || !fs.statSync(inputPath).size) {
  console.error(`Render missing or empty: ${inputPath}`);
  process.exit(1);
}

const probeCheck = spawnSync('ffprobe', ['-version'], {stdio: 'ignore'});
if (probeCheck.error || probeCheck.status !== 0) {
  console.error('ffprobe is required for final render validation.');
  process.exit(1);
}

const probe = spawnSync(
  'ffprobe',
  [
    '-v', 'error',
    '-show_entries', 'stream=codec_type,width,height,r_frame_rate',
    '-show_entries', 'format=duration,size',
    '-of', 'json',
    inputPath,
  ],
  {encoding: 'utf8'},
);
if (probe.error || probe.status !== 0) {
  console.error(probe.stderr || 'ffprobe failed.');
  process.exit(probe.status ?? 1);
}

const data = JSON.parse(probe.stdout || '{}');
const streams = Array.isArray(data.streams) ? data.streams : [];
const video = streams.find((stream) => stream.codec_type === 'video');
const audio = streams.find((stream) => stream.codec_type === 'audio');
const errors = [];

if (!video) errors.push('No video stream found.');
if (!audio) errors.push('No audio stream found.');

const expected = format === 'reel' ? {width: 1080, height: 1920} : {width: 1920, height: 1080};
if (video && (Number(video.width) !== expected.width || Number(video.height) !== expected.height)) {
  errors.push(`Wrong resolution: ${video.width}x${video.height}; expected ${expected.width}x${expected.height}.`);
}

if (video?.r_frame_rate) {
  const [n, d = '1'] = String(video.r_frame_rate).split('/');
  const fps = Number(n) / Number(d);
  if (!Number.isFinite(fps) || Math.abs(fps - 30) > 0.05) errors.push(`Wrong frame rate: ${video.r_frame_rate}; expected 30 fps.`);
}

const duration = Number(data.format?.duration);
if (!Number.isFinite(duration) || duration <= 1) errors.push(`Implausible duration: ${data.format?.duration ?? 'unknown'}.`);
if (Number(data.format?.size ?? 0) <= 0) errors.push('Output size is zero.');

if (errors.length) {
  console.error(`FINAL RENDER QA: FAIL (${format})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`FINAL RENDER QA: PASS (${format}) — ${expected.width}x${expected.height}, 30 fps, audio present, ${duration.toFixed(2)} s.`);
