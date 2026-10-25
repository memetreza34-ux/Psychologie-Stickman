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
const uploadMetadataPath = path.join(projectDir, '99-intern', 'youtube-upload.json');
const exportDir = path.join(projectDir, '05-export');
const outputPath = path.join(exportDir, 'final.mp4');
const captionsPath = path.join(exportDir, 'captions.srt');
const subtitleScriptPath = path.join(exportDir, 'subtitle-script.txt');
const uploadPath = path.join(exportDir, 'youtube-upload.txt');
const thumbnailPath = path.join(exportDir, 'thumbnail.png');

if (!fs.existsSync(phase1Path)) throw new Error(`Required production file missing: ${phase1Path}`);
const phase1 = JSON.parse(fs.readFileSync(phase1Path, 'utf8'));
// V2: Cover liegt als 03-bilder/00-cover.png bei den Bildern (Überschrift schon von Flow im Bild).
if (phase1.workflowVersion === 'V2' && !fs.existsSync(thumbnailPath)) {
  const cover = path.join(projectDir, '03-bilder', '00-cover.png');
  if (!fs.existsSync(cover)) throw new Error('V2: 03-bilder/00-cover.png fehlt – erst Cover in Google Flow wählen.');
  fs.mkdirSync(exportDir, {recursive: true});
  if (phase1.finalTextPolicy === 'CODE_TEXT_CARDS_V1') {
    const made = spawnSync(process.execPath, ['scripts/thumbnail-text.mjs', projectRelative], {stdio: 'inherit'});
    if (made.status !== 0) process.exit(made.status ?? 1);
  } else fs.copyFileSync(cover, thumbnailPath);
}
if (phase1.thumbnailGenerationPolicy === 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1' &&
   (!fs.existsSync(thumbnailPath) || !fs.statSync(thumbnailPath).size)) {
  throw Error('Separate 05-export/thumbnail.png must be selected before rendering; never use 03-bilder/01.png as cover.');
}
const packageV2 = String(phase1?.exportPackagePolicy ?? '') === 'YOUTUBE_EXPORT_PACKAGE_V2';
if (packageV2 && !fs.existsSync(uploadMetadataPath)) {
  throw new Error(`YOUTUBE_EXPORT_PACKAGE_V2 requires upload metadata: ${uploadMetadataPath}`);
}

for (const existingPath of [outputPath, captionsPath, subtitleScriptPath, uploadPath]) {
  if (fs.existsSync(existingPath)) throw new Error(`Refusing to overwrite existing export: ${existingPath}`);
}

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
// Gate new V2 visual direction before expensive audio, render or asset handling.
run(['scripts/check-creative-visuals.mjs', projectRelative]);
// Reject incomplete or wrongly numbered scene assets before transcription and rendering.
if (phase1.thumbnailGenerationPolicy === 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1') {
  run(['scripts/flow-image-pack.mjs', 'verify', projectRelative]);
}
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
run(['scripts/generate-youtube-captions.mjs', projectRelative]);
if (packageV2) run(['scripts/generate-youtube-upload.mjs', projectRelative]);

for (const requiredPath of [thumbnailPath, captionsPath, subtitleScriptPath, ...(packageV2 ? [uploadPath] : [])]) {
  if (!fs.existsSync(requiredPath) || !fs.statSync(requiredPath).size) {
    throw new Error(`Required export missing or empty after generation: ${requiredPath}`);
  }
}

console.log(`PRODUCE YOUTUBE: PASS — ${path.relative(repoRoot, outputPath)}`);
console.log(`YOUTUBE CAPTIONS: ${path.relative(repoRoot, captionsPath)}`);
console.log(`YOUTUBE SUBTITLE SCRIPT: ${path.relative(repoRoot, subtitleScriptPath)}`);
if (packageV2) console.log(`YOUTUBE UPLOAD FILE: ${path.relative(repoRoot, uploadPath)}`);
