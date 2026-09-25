#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {buildCanonicalWordTimings, resolveProjectPath} from './lib/word-timing-alignment.mjs';

const args = process.argv.slice(2);
const projectArg = args.find((arg) => !arg.startsWith('--'));
const force = args.includes('--force');
if (!projectArg) {
  console.error('Usage: npm run timings:youtube -- <youtube/project-folder> [--force]');
  process.exit(1);
}

const repoRoot = path.resolve('.');
const {projectDir, relative: projectRelative} = resolveProjectPath(projectArg, repoRoot);
const scriptPath = path.join(projectDir, '01-script', 'script.txt');
const audioPath = path.join(projectDir, '04-audio', 'final-voice.mp3');
const modernTimingPath = path.join(projectDir, '99-intern', 'word-timings.json');
const legacyTimingPath = path.join(projectDir, '99-intern', 'projektdateien', 'word-timings.json');
const outputPath = fs.existsSync(legacyTimingPath) && !fs.existsSync(modernTimingPath) ? legacyTimingPath : modernTimingPath;

for (const required of [scriptPath, audioPath]) {
  if (!fs.existsSync(required)) throw new Error(`Required word-timing input missing: ${required}`);
}

const readExisting = () => {
  if (!fs.existsSync(outputPath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
};

const existing = readExisting();
if (existing && !force) {
  console.log(`WORD TIMINGS: REUSE — ${path.relative(repoRoot, outputPath)} (${existing.length} words)`);
  process.exit(0);
}

const run = (command, commandArgs, options = {}) => {
  const result = spawnSync(command, commandArgs, {stdio: 'inherit', ...options});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with code ${result.status}`);
};

const probeAudioDurationMs = () => {
  const result = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', audioPath],
    {encoding: 'utf8'},
  );
  if (result.status !== 0) return null;
  const seconds = Number(String(result.stdout ?? '').trim());
  return Number.isFinite(seconds) && seconds > 0 ? Math.round(seconds * 1000) : null;
};

const whisperVersion = process.env.WHISPER_CPP_VERSION || (process.platform === 'win32' ? '1.6.0' : '1.7.4');
const whisperModel = process.env.WHISPER_MODEL || 'small';
const whisperPath = path.resolve(process.env.WHISPER_PATH || path.join('.whisper', 'whisper.cpp'));
const tempWav = path.join(os.tmpdir(), `stickman-whisper-${process.pid}-${Date.now()}.wav`);

console.log(`WORD TIMINGS: ${projectRelative}`);
console.log(`Whisper.cpp ${whisperVersion}, model=${whisperModel}, language=German`);
console.log('First run may download/build Whisper.cpp and the model. Later runs reuse the local cache.');

const {downloadWhisperModel, installWhisperCpp, toCaptions, transcribe} = await import('@remotion/install-whisper-cpp');

try {
  fs.mkdirSync(path.dirname(whisperPath), {recursive: true});
  await installWhisperCpp({to: whisperPath, version: whisperVersion});
  await downloadWhisperModel({model: whisperModel, folder: whisperPath});

  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  run(npx, ['remotion', 'ffmpeg', '-i', audioPath, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', tempWav, '-y']);

  const whisperCppOutput = await transcribe({
    model: whisperModel,
    whisperPath,
    inputPath: tempWav,
    tokenLevelTimestamps: true,
    language: 'German',
    whisperCppVersion: whisperVersion,
  });
  const {captions} = toCaptions({whisperCppOutput});
  const script = fs.readFileSync(scriptPath, 'utf8');
  const audioDurationMs = probeAudioDurationMs() ?? captions.at(-1)?.endMs ?? null;
  const {words, alignment, observedWordCount} = buildCanonicalWordTimings({
    script,
    captions,
    audioDurationMs,
    minimumCoverage: 0.85,
  });

  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  const temporaryOutput = `${outputPath}.tmp-${process.pid}`;
  fs.writeFileSync(temporaryOutput, `${JSON.stringify(words, null, 2)}\n`);
  fs.renameSync(temporaryOutput, outputPath);

  console.log(
    `WORD TIMINGS: PASS — ${words.length} canonical words; Whisper observed ${observedWordCount}; ` +
      `alignment ${(alignment.coverage * 100).toFixed(1)}% (${(alignment.strongCoverage * 100).toFixed(1)}% strong).`,
  );
  console.log(`Saved: ${path.relative(repoRoot, outputPath)}`);
} finally {
  if (fs.existsSync(tempWav)) fs.unlinkSync(tempWav);
}
