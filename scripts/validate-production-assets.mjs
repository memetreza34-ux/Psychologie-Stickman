#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const [scenePlanPath] = process.argv.slice(2);
if (!scenePlanPath) {
  console.error('Usage: npm run validate:assets -- <scene-plan.json>');
  process.exit(1);
}

const normalizeFormat = (value) => {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized.startsWith('reel')) return 'reel';
  if (normalized.startsWith('youtube')) return 'youtube';
  return null;
};

const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));
const errors = [];
const publicRoot = path.resolve('public');
const format = normalizeFormat(plan.format);

const safe = (input) => {
  const clean = String(input ?? '').replace(/^\/+/, '');
  const resolved = path.resolve(publicRoot, clean);
  if (path.relative(publicRoot, resolved).startsWith('..')) throw new Error(`Path escapes public/: ${input}`);
  return resolved;
};

if (!format) errors.push('format must identify youtube or reel.');
if (!plan.audio) errors.push('audio is required.');

if (plan.audio) {
  try {
    const audio = safe(plan.audio);
    if (!fs.existsSync(audio) || !fs.statSync(audio).size) errors.push(`Missing/empty audio: ${audio}`);
  } catch (error) {
    errors.push(error.message);
  }
}

if (format === 'reel') {
  const scenes = Array.isArray(plan.programmaticScenes) ? plan.programmaticScenes : [];
  if (!scenes.length) errors.push('programmaticScenes required for reel production.');
  if (plan.imageBasePath) errors.push('Reels are programmatic; imageBasePath must not be required or used.');
} else if (format === 'youtube') {
  const count = Array.isArray(plan.sceneStartWords) ? plan.sceneStartWords.length : 0;
  if (!count) errors.push('No YouTube scenes.');
  if (!plan.imageBasePath) errors.push('imageBasePath is required for YouTube image production.');

  if (plan.imageBasePath) {
    try {
      const dir = safe(plan.imageBasePath);
      if (!fs.existsSync(dir)) {
        errors.push(`Missing image directory: ${dir}`);
      } else {
        const ext = String(plan.imageExtension ?? 'png').replace(/^\./, '');
        const digits = Number.isFinite(plan.imageDigits) ? plan.imageDigits : Math.max(2, String(count).length);
        for (let index = 1; index <= count; index++) {
          const file = path.join(dir, `${String(index).padStart(digits, '0')}.${ext}`);
          if (!fs.existsSync(file) || !fs.statSync(file).size) errors.push(`Missing/empty image: ${file}`);
        }
      }
    } catch (error) {
      errors.push(error.message);
    }
  }
}

if (errors.length) {
  console.error(`PRODUCTION ASSETS: FAIL${format ? ` (${format})` : ''}`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`PRODUCTION ASSETS: PASS (${format})`);
