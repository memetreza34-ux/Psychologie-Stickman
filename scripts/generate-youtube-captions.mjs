#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {resolveProjectPath} from './lib/word-timing-alignment.mjs';

const args = process.argv.slice(2);
const projectArg = args.find((arg) => !arg.startsWith('--'));
const force = args.includes('--force');

if (!projectArg) {
  console.error('Usage: npm run captions:youtube -- <youtube/project-folder> [--force]');
  process.exit(1);
}

const repoRoot = path.resolve('.');
const {projectDir} = resolveProjectPath(projectArg, repoRoot);
const modernTimingPath = path.join(projectDir, '99-intern', 'word-timings.json');
const legacyTimingPath = path.join(projectDir, '99-intern', 'projektdateien', 'word-timings.json');
const timingPath = fs.existsSync(modernTimingPath) ? modernTimingPath : legacyTimingPath;
const exportDir = path.join(projectDir, '05-export');
const srtPath = path.join(exportDir, 'captions.srt');
const transcriptPath = path.join(exportDir, 'subtitle-script.txt');

if (!fs.existsSync(timingPath)) {
  throw new Error(`Required word timings missing: ${timingPath}`);
}
for (const outputPath of [srtPath, transcriptPath]) {
  if (fs.existsSync(outputPath) && !force) {
    throw new Error(`Refusing to overwrite existing captions export: ${outputPath}`);
  }
}

const raw = JSON.parse(fs.readFileSync(timingPath, 'utf8'));
if (!Array.isArray(raw) || raw.length === 0) throw new Error('word-timings.json contains no timed words.');

const words = raw.map((item, index) => {
  const text = String(item?.text ?? '').trim();
  const startMs = Number(item?.startMs ?? item?.timestampMs);
  const endMs = Number(item?.endMs);
  if (!text) throw new Error(`word-timings.json entry ${index + 1} has no text.`);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    throw new Error(`word-timings.json entry ${index + 1} has invalid timing.`);
  }
  return {text, startMs: Math.max(0, Math.round(startMs)), endMs: Math.max(1, Math.round(endMs))};
});

const MAX_WORDS = 9;
const MAX_CHARS = 72;
const MAX_DURATION_MS = 4500;
const MIN_BREAK_DURATION_MS = 850;
const strongBreak = /[.!?](?:["'”’)]*)$/u;
const softBreak = /[,;:](?:["'”’)]*)$/u;

const cues = [];
let current = [];

const flush = () => {
  if (!current.length) return;
  cues.push({
    startMs: current[0].startMs,
    endMs: current.at(-1).endMs,
    text: current.map((word) => word.text).join(' '),
  });
  current = [];
};

for (const word of words) {
  if (current.length) {
    const projected = [...current, word];
    const projectedText = projected.map((item) => item.text).join(' ');
    const projectedDuration = word.endMs - current[0].startMs;
    if (current.length >= MAX_WORDS || projectedText.length > MAX_CHARS || projectedDuration > MAX_DURATION_MS) {
      flush();
    }
  }

  current.push(word);
  const duration = current.at(-1).endMs - current[0].startMs;
  const isStrongBreak = strongBreak.test(word.text) && current.length >= 3 && duration >= MIN_BREAK_DURATION_MS;
  const isSoftBreak = softBreak.test(word.text) && current.length >= 6 && duration >= 1600;
  if (isStrongBreak || isSoftBreak) flush();
}
flush();

if (!cues.length) throw new Error('Could not build any subtitle cues.');

for (let index = 0; index < cues.length - 1; index += 1) {
  const nextStart = cues[index + 1].startMs;
  if (cues[index].endMs >= nextStart) cues[index].endMs = Math.max(cues[index].startMs + 1, nextStart - 1);
}

const formatSrtTime = (value) => {
  const total = Math.max(0, Math.round(value));
  const hours = Math.floor(total / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const milliseconds = total % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
};

const formatReadableTime = (value) => {
  const totalSeconds = Math.max(0, Math.floor(Number(value) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const wrapTwoLines = (text, maxLineChars = 42) => {
  if (text.length <= maxLineChars) return text;
  const tokens = text.split(/\s+/u).filter(Boolean);
  const lines = [];
  let line = '';
  for (const token of tokens) {
    const candidate = line ? `${line} ${token}` : token;
    if (candidate.length > maxLineChars && line && lines.length === 0) {
      lines.push(line);
      line = token;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2).join('\n');
};

const srt = cues.map((cue, index) => {
  const start = formatSrtTime(cue.startMs);
  const end = formatSrtTime(Math.max(cue.startMs + 1, cue.endMs));
  return `${index + 1}\n${start} --> ${end}\n${wrapTwoLines(cue.text)}`;
}).join('\n\n');

const readableTranscript = cues
  .map((cue) => `${formatReadableTime(cue.startMs)}–${formatReadableTime(cue.endMs)}\n${cue.text}`)
  .join('\n\n');

fs.mkdirSync(exportDir, {recursive: true});
for (const [outputPath, content] of [[srtPath, `${srt}\n`], [transcriptPath, `${readableTranscript}\n`]]) {
  const temporaryOutput = `${outputPath}.tmp-${process.pid}`;
  fs.writeFileSync(temporaryOutput, content, 'utf8');
  fs.renameSync(temporaryOutput, outputPath);
}

console.log(`YOUTUBE CAPTIONS: PASS — ${cues.length} cues`);
console.log(`Saved: ${path.relative(repoRoot, srtPath)}`);
console.log(`Saved: ${path.relative(repoRoot, transcriptPath)}`);
console.log('Caption outputs are flat: no captions/subtitles subfolder is created.');
