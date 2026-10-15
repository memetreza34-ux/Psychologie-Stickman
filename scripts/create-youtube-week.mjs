#!/usr/bin/env node
// Run BEFORE starting a new video; never creates a video or changes an existing export.
import fs from 'node:fs';
import path from 'node:path';
import {weekForDate} from './lib/youtube-week-folders.mjs';

const [dateArg] = process.argv.slice(2);
if (!dateArg) {
  console.error('Usage: npm run youtube:week -- DD.MM.YYYY');
  process.exit(1);
}
const w = weekForDate(dateArg);
const folder = path.join('youtube', w.folder);
fs.mkdirSync(folder, {recursive: true});
const marker = path.join(folder, 'README.md');
if (!fs.existsSync(marker)) {
  fs.writeFileSync(marker,
    '# Kalenderwoche ' + w.week + ' / ' + w.isoYear + '\n\n' +
    '**Zeitraum:** ' + w.monday + ' bis ' + w.sunday + ' (Montag–Sonntag).\n\n' +
    'Jedes neue Video bekommt darunter seinen eigenen datierten Ordner mit unveränderter 01-script / 02-google-flow / 03-bilder / 04-audio / 05-export / 99-intern Struktur.\n', 'utf8');
}
console.log('YOUTUBE WEEK READY: ' + folder);
console.log('PERIOD: ' + w.monday + ' – ' + w.sunday);
console.log('Create the next video project ONLY inside this week folder.');
