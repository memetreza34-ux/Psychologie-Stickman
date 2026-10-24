#!/usr/bin/env node

// WORKFLOW_V2: setzt die Thumbnail-Überschrift per Code auf das gewählte, textfreie Flow-Bild.
// Nutzung: npm run thumbnail:text -- <projekt> <bild-in-public> "Überschrift" [left|right|top] [Akzentwort]
// Das Bild muss unter public/ liegen (z. B. public/thumb-raw.png → "thumb-raw.png").

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const [projectArg, image, headline, position = 'left', accentWord = ''] = process.argv.slice(2);
if (!projectArg || !image || !headline) {
  console.error('Nutzung: npm run thumbnail:text -- <projekt> <bild-in-public> "Überschrift" [left|right|top] [Akzentwort]');
  process.exit(1);
}
const words = headline.trim().split(/\s+/u).length;
if (words < 2 || words > 7) throw new Error('Überschrift: 2–7 Wörter.');
if (!['left', 'right', 'top'].includes(position)) throw new Error('Position: left, right oder top.');
if (!fs.existsSync(path.resolve('public', image))) throw new Error(`Bild nicht gefunden: public/${image}`);

const output = path.resolve(projectArg, '05-export', 'thumbnail.png');
if (fs.existsSync(output)) throw new Error(`Existiert schon, nicht überschreiben: ${output}`);
const props = JSON.stringify({image, headline, position, ...(accentWord ? {accentWord} : {})});
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(npx, ['remotion', 'still', 'src/index.ts', 'ThumbnailText', output, `--props=${props}`], {stdio: 'inherit', shell: process.platform === 'win32'});
if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`THUMBNAIL: ${path.relative('.', output)}`);
