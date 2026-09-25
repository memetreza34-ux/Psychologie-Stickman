#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const args = process.argv.slice(2);
const projectArg = args.find((arg) => !arg.startsWith('--'));
const forceTimings = args.includes('--force-timings');
if (!projectArg) {
  console.error('Usage: npm run produce:youtube -- <youtube/project-folder> [--force-timings]');
  process.exit(1);
}

const repoRoot = path.resolve('.');
const projectDir = path.resolve(projectArg);
const projectRelative = path.relative(repoRoot, projectDir).replace(/\\/g, '/');
if (projectRelative.startsWith('..') || path.isAbsolute(projectRelative) || !projectRelative.startsWith('youtube/')) {
  throw new Error('YouTube production path must point to a project inside youtube/.');
}

const findInternal = (name) => {
  const modern = path.join(projectDir, '99-intern', name);
  if (fs.existsSync(modern)) return modern;
  const legacy = path.join(projectDir, '99-intern', 'projektdateien', name);
  if (fs.existsSync(legacy)) return legacy;
  return modern;
};

const phase1Path = findInternal('phase1-scenes.json');
const wordTimingPath = findInternal('word-timings.json');
const scenePlanPath = path.join(projectDir, '99-intern', 'scene-plan.json');
const renderPropsPath = path.join(projectDir, '99-intern', 'render-props.json');
const outputPath = path.join(projectDir, '05-export', 'final.mp4');

if (!fs.existsSync(phase1Path)) throw new Error(`Required production file missing: ${phase1Path}`);
if (fs.existsSync(outputPath)) throw new Error(`Refusing to overwrite existing export: ${outputPath}`);

const run = (scriptArgs) => {
  const result = spawnSync(process.execPath, scriptArgs, {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const hasUsableTimings = () => {
  if (!fs.existsSync(wordTimingPath)) return false;
  try {
    const timings = JSON.parse(fs.readFileSync(wordTimingPath, 'utf8'));
    return Array.isArray(timings) && timings.length > 0;
  } catch {
    return false;
  }
};

console.log(`PRODUCE YOUTUBE: ${projectRelative}`);
if (!hasUsableTimings() || forceTimings) {
  console.log(forceTimings ? 'Refreshing word timings from final voice-over...' : 'No usable word timings found — generating them from final voice-over...');
  run(['scripts/generate-word-timings.mjs', projectRelative, ...(forceTimings ? ['--force'] : [])]);
}
if (!hasUsableTimings()) throw new Error('Automatic word-timing generation did not produce a usable word-timings.json.');

run(['scripts/map-phase1-scenes.mjs', wordTimingPath, phase1Path, scenePlanPath]);
run(['scripts/stage-production-assets.mjs', scenePlanPath]);
run(['scripts/prepare-phase3.mjs', wordTimingPath, scenePlanPath, renderPropsPath]);
run(['scripts/render-phase3-project.mjs', 'youtube', renderPropsPath, outputPath]);
run(['scripts/validate-final-render.mjs', outputPath, 'youtube']);
console.log(`PRODUCE YOUTUBE: PASS — ${path.relative(repoRoot, outputPath)}`);
