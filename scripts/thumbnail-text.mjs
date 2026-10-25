#!/usr/bin/env node

// WORKFLOW_V2: setzt die Thumbnail-Überschrift per Code auf das gewählte, textfreie Cover.
// Nutzung: npm run thumbnail:text -- <projekt> ["Überschrift"] [left|right|top] [Akzentwort]
// Cover: <projekt>/03-bilder/00-cover.png. Überschrift ohne Angabe: coverHeadline aus 99-intern/phase1-scenes.json.

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const [projectArg, headlineArg, position = 'left', accentWord = ''] = process.argv.slice(2);
if (!projectArg) {
  console.error('Nutzung: npm run thumbnail:text -- <projekt> ["Überschrift"] [left|right|top] [Akzentwort]');
  process.exit(1);
}
const projectDir = path.resolve(projectArg);
const cover = path.join(projectDir, '03-bilder', '00-cover.png');
if (!fs.existsSync(cover)) throw new Error(`Cover fehlt: ${cover} (erst Cover in Google Flow wählen).`);
const planPath = path.join(projectDir, '99-intern', 'phase1-scenes.json');
const plan = fs.existsSync(planPath) ? JSON.parse(fs.readFileSync(planPath, 'utf8')) : {};
const headline = String(headlineArg ?? plan.coverHeadline ?? '').trim();
const words = headline.split(/\s+/u).filter(Boolean).length;
if (words < 2 || words > 7) throw new Error('Überschrift: 2–7 Wörter.');
if (!['left', 'right', 'top'].includes(position)) throw new Error('Position: left, right oder top.');

const output = path.join(projectDir, '05-export', 'thumbnail.png');
if (fs.existsSync(output)) throw new Error(`Existiert schon, nicht überschreiben: ${output}`);

// Remotion lädt Bilder nur aus public/: Cover kurz dorthin kopieren und danach wieder entfernen.
const stagingDir = path.resolve('public', '.thumbnail');
const staged = path.join(stagingDir, 'cover.png');
fs.mkdirSync(stagingDir, {recursive: true});
fs.copyFileSync(cover, staged);
fs.mkdirSync(path.dirname(output), {recursive: true});
try {
  const props = JSON.stringify({image: '.thumbnail/cover.png', headline, position, ...(accentWord ? {accentWord} : {})});
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(npx, ['remotion', 'still', 'src/index.ts', 'ThumbnailText', output, `--props=${props}`], {stdio: 'inherit', shell: process.platform === 'win32'});
  if (result.status !== 0) process.exit(result.status ?? 1);
} finally {
  fs.rmSync(stagingDir, {recursive: true, force: true});
}
console.log(`THUMBNAIL: ${path.relative('.', output)} („${headline}“)`);
