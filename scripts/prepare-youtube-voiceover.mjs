#!/usr/bin/env node

import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {extname} from 'node:path';

const [input, output, speedArg = '1.10'] = process.argv.slice(2);
if (!input || !output) { console.error('Usage: npm run audio:youtube -- <input-audio> <output.mp3> [speed]'); process.exit(1); }
if (!existsSync(input)) { console.error(`Input audio not found: ${input}`); process.exit(1); }
if (extname(output).toLowerCase() !== '.mp3') { console.error('Output must be .mp3.'); process.exit(1); }
const speed = Number(speedArg);
if (!Number.isFinite(speed) || speed < 0.95 || speed > 1.25) process.exit(1);
const check = spawnSync('ffmpeg', ['-version'], {stdio: 'ignore'});
if (check.error || check.status !== 0) { console.error('ffmpeg is required.'); process.exit(1); }
const audioFilter = [
  'silenceremove=start_periods=1:start_duration=0.10:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.50:stop_threshold=-42dB:stop_silence=0.12',
  `atempo=${speed.toFixed(3)}`,
].join(',');
const result = spawnSync('ffmpeg', ['-hide_banner','-loglevel','error','-y','-i',input,'-vn','-af',audioFilter,'-c:a','libmp3lame','-q:a','2',output], {stdio:'inherit'});
if (result.error || result.status !== 0) process.exit(result.status ?? 1);
console.log(`Prepared YouTube voice-over: ${output}`);
