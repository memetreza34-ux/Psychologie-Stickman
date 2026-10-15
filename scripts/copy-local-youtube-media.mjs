#!/usr/bin/env node
// After a Git pull, optionally COPY local ignored media out of old flat project folders.
// Dry-run by default; --apply never overwrites or removes source files.
import fs from 'node:fs';
import path from 'node:path';
import {projectNamePattern, projectRelativePath} from './lib/youtube-week-folders.mjs';

const apply = process.argv.includes('--apply');
const root = path.resolve('youtube');
const sourceFolders = ['03-bilder', '04-audio', '05-export', '99-intern'];
let candidates = 0, copied = 0, skipped = 0;
if (!fs.existsSync(root)) throw new Error('youtube/ missing');

const copyMissing = (source, dest) => {
  for (const e of fs.readdirSync(source, {withFileTypes: true})) {
    if (e.name === '.gitkeep' || e.isSymbolicLink()) continue;
    const a = path.join(source, e.name), b = path.join(dest, e.name);
    if (e.isDirectory()) { copyMissing(a,b); continue; }
    if (!e.isFile()) continue;
    if (fs.existsSync(b)) { skipped++; continue; }
    candidates++;
    console.log((apply ? 'COPY ' : 'WOULD COPY ') + path.relative('.',a) + ' -> ' + path.relative('.',b));
    if (!apply) continue;
    fs.mkdirSync(path.dirname(b), {recursive: true});
    try {
      fs.copyFileSync(a, b, fs.constants.COPYFILE_EXCL);
      copied++;
    } catch (err) {
      if (err.code === 'EEXIST') { skipped++; continue; }
      throw err;
    }
  }
};

for (const entry of fs.readdirSync(root, {withFileTypes: true})) {
  if (!entry.isDirectory() || !projectNamePattern.test(entry.name)) continue;
  const oldPath = path.join(root, entry.name);
  const newPath = path.resolve(projectRelativePath(entry.name));
  if (!fs.existsSync(newPath)) throw new Error('Missing new project folder; run git pull first: ' + newPath);
  for (const name of sourceFolders) {
    const origin=path.join(oldPath,name),target=path.join(newPath,name);
    if (fs.existsSync(origin) && fs.statSync(origin).isDirectory()) copyMissing(origin,target);
  }
}
console.log('LOCAL MEDIA: ' + (apply?'COPY FINISHED':'DRY RUN') + ' | missing at destination: '+candidates+' | copied: '+copied+' | already exists: '+skipped);
if (!apply) console.log('For safe copy without deleting source files: npm run youtube:local-media -- --apply');
