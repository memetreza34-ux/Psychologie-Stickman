#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [scenePlanPath] = process.argv.slice(2);
if (!scenePlanPath) {
  console.error('Usage: npm run stage:assets -- <scene-plan.json>');
  process.exit(1);
}

const repoRoot = path.resolve('.');
const publicRoot = path.resolve('public');
const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));

const resolveInside = (root, value, label) => {
  const clean = String(value ?? '').trim().replace(/^[/\\]+/, '');
  if (!clean) throw new Error(`${label} is required.`);
  const resolved = path.resolve(root, clean);
  const relative = path.relative(root, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`${label} escapes ${root}: ${value}`);
  }
  return resolved;
};

if (!plan.imageBasePath) throw new Error('scene-plan.imageBasePath is required.');
if (!plan.audio) throw new Error('scene-plan.audio is required.');

const sourceImages = resolveInside(repoRoot, plan.imageBasePath, 'imageBasePath');
const sourceAudio = resolveInside(repoRoot, plan.audio, 'audio');
const targetImages = resolveInside(publicRoot, plan.imageBasePath, 'public imageBasePath');
const targetAudio = resolveInside(publicRoot, plan.audio, 'public audio');

if (path.relative(publicRoot, sourceImages).startsWith('..') === false) {
  throw new Error('Canonical image source must live outside public/.');
}
if (path.relative(publicRoot, sourceAudio).startsWith('..') === false) {
  throw new Error('Canonical audio source must live outside public/.');
}
if (!fs.existsSync(sourceImages) || !fs.statSync(sourceImages).isDirectory()) {
  throw new Error(`Image source directory not found: ${sourceImages}`);
}
if (!fs.existsSync(sourceAudio) || !fs.statSync(sourceAudio).isFile() || fs.statSync(sourceAudio).size === 0) {
  throw new Error(`Audio source missing or empty: ${sourceAudio}`);
}

fs.rmSync(targetImages, {recursive: true, force: true});
fs.mkdirSync(path.dirname(targetImages), {recursive: true});
fs.cpSync(sourceImages, targetImages, {recursive: true, force: true});

fs.mkdirSync(path.dirname(targetAudio), {recursive: true});
fs.copyFileSync(sourceAudio, targetAudio);

console.log('PRODUCTION ASSET STAGING: PASS');
console.log(`Images: ${path.relative(repoRoot, sourceImages)} -> ${path.relative(repoRoot, targetImages)}`);
console.log(`Audio: ${path.relative(repoRoot, sourceAudio)} -> ${path.relative(repoRoot, targetAudio)}`);
