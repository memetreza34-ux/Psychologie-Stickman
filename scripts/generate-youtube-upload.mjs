#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {resolveProjectPath} from './lib/word-timing-alignment.mjs';

const args = process.argv.slice(2);
const projectArg = args.find((arg) => !arg.startsWith('--'));
const force = args.includes('--force');

if (!projectArg) {
  console.error('Usage: npm run upload:youtube -- <youtube/project-folder> [--force]');
  process.exit(1);
}

const repoRoot = path.resolve('.');
const {projectDir, relative: projectRelative} = resolveProjectPath(projectArg, repoRoot);
const metadataPath = path.join(projectDir, '99-intern', 'youtube-upload.json');
const scriptPath = path.join(projectDir, '01-script', 'script.txt');
const outputDir = path.join(projectDir, '05-export');
const outputPath = path.join(outputDir, 'youtube-upload.txt');

if (!fs.existsSync(metadataPath)) throw new Error(`Required upload metadata missing: ${metadataPath}`);
if (!fs.existsSync(scriptPath)) throw new Error(`Required script missing: ${scriptPath}`);
if (fs.existsSync(outputPath) && !force) throw new Error(`Refusing to overwrite existing upload export: ${outputPath}`);

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const title = String(metadata?.title ?? '').trim();
const description = String(metadata?.description ?? '').trim();
if (!title) throw new Error('youtube-upload.json requires a non-empty title.');
if (!description) throw new Error('youtube-upload.json requires a non-empty description.');

const toList = (value) => Array.isArray(value) ? value.map((item) => String(item ?? '').trim()).filter(Boolean) : [];
const sources = toList(metadata.sources);
const chapters = toList(metadata.chapters);
const tags = toList(metadata.tags);
const hashtags = toList(metadata.hashtags);
const pinnedComment = String(metadata?.pinnedComment ?? 'NONE').trim() || 'NONE';
const topic = String(metadata?.topic ?? '').trim() || 'Psychologie & menschliches Verhalten';
const script = fs.readFileSync(scriptPath, 'utf8').trim();
const videoFiles = fs.existsSync(outputDir) ? fs.readdirSync(outputDir).filter((name) => name.toLowerCase().endsWith('.mp4')) : [];
const videoName = videoFiles.includes('final.mp4') ? 'final.mp4' : (videoFiles.length === 1 ? videoFiles[0] : 'final.mp4');

const lines = [
  'YOUTUBE UPLOAD',
  '',
  'TITEL:',
  title,
  '',
  'BESCHREIBUNG:',
  description,
  '',
  'QUELLEN / LINKS:',
  ...(sources.length ? sources.map((item) => `- ${item}`) : ['NONE']),
  '',
  'KAPITEL:',
  ...(chapters.length ? chapters : ['NONE']),
  '',
  'TAGS:',
  tags.length ? tags.join(', ') : 'NONE',
  '',
  'HASHTAGS:',
  hashtags.length ? hashtags.join(' ') : 'NONE',
  '',
  'ANGEHEFTETER KOMMENTAR:',
  pinnedComment,
  '',
  'SPRECHERTEXT / BACKUP:',
  script,
  '',
  'VIDEO-DATEN:',
  `Thema: ${topic}`,
  'Sprache: Deutsch',
  'Format: YouTube 16:9',
  `Video: ${videoName}`,
  'Thumbnail: thumbnail.png',
  'Untertitel Upload: captions.srt',
  'Untertitel Kopierversion: subtitle-script.txt',
  '',
];

fs.mkdirSync(outputDir, {recursive: true});
const temporaryOutput = `${outputPath}.tmp-${process.pid}`;
fs.writeFileSync(temporaryOutput, lines.join('\n'), 'utf8');
fs.renameSync(temporaryOutput, outputPath);

console.log(`YOUTUBE UPLOAD METADATA: PASS — ${projectRelative}`);
console.log(`Saved: ${path.relative(repoRoot, outputPath)}`);
