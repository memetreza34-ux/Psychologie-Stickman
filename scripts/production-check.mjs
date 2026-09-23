#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const [wordTimingPath, scenePlanPath] = process.argv.slice(2);
if (!wordTimingPath || !scenePlanPath) {
  console.error('Usage: npm run production:check -- <word-timings.json> <scene-plan.json>');
  process.exit(1);
}

const run = (args) => {
  const result = spawnSync(process.execPath, args, {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(['scripts/validate-phase3-word-plan.mjs', wordTimingPath, scenePlanPath]);
run(['scripts/validate-production-assets.mjs', scenePlanPath]);

const plan = JSON.parse(fs.readFileSync(path.resolve(scenePlanPath), 'utf8'));
const rawFormat = String(plan.format ?? '').trim().toLowerCase();
const format = rawFormat.startsWith('youtube') ? 'youtube' : rawFormat.startsWith('reel') ? 'reel' : 'unknown';
console.log(`PRODUCTION READY: PASS (${format})`);
