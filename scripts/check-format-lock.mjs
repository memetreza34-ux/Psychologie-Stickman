#!/usr/bin/env node

import fs from 'node:fs';

const fail = (message) => {
  console.error(`FORMAT LOCK FAIL: ${message}`);
  process.exit(1);
};

const root = fs.readFileSync('src/Root.tsx', 'utf8');

if (!/id="Phase3YouTube"[\s\S]*?width=\{1920\}[\s\S]*?height=\{1080\}/.test(root)) {
  fail('Phase3YouTube must be 1920x1080.');
}

if (!/id="Phase3Reel"[\s\S]*?width=\{1080\}[\s\S]*?height=\{1920\}/.test(root)) {
  fail('Phase3Reel must be 1080x1920.');
}

const required = [
  ['rules/FORMAT_LOCK.md', 'reels', '9:16', '1080×1920'],
  ['rules/FORMAT_LOCK.md', 'youtube', '16:9', '1920×1080'],
];

for (const [file, ...needles] of required) {
  const text = fs.readFileSync(file, 'utf8').toLocaleLowerCase('de-DE');
  for (const needle of needles) {
    if (!text.includes(String(needle).toLocaleLowerCase('de-DE'))) fail(`${file} is missing ${needle}.`);
  }
}

console.log('FORMAT LOCK PASS: Reels=9:16 1080x1920, YouTube=16:9 1920x1080.');
