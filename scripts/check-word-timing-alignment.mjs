#!/usr/bin/env node

import {buildCanonicalWordTimings, normalizeWord} from './lib/word-timing-alignment.mjs';

const script =
  'Du bekommst zehn nette Rückmeldungen und einen kritischen Kommentar. Danach bleibt genau dieser eine Satz besonders lange im Kopf.';

const rawWords = [
  'Du',
  'bekommst',
  'zehn',
  'nette',
  'Rückmeldung',
  'und',
  'einen',
  'wirklich',
  'kritischen',
  'Kommentar',
  'Danach',
  'bleibt',
  'genau',
  'dieser',
  'eine',
  'Satz',
  'besonders',
  'lange',
  'im',
  'Kopf',
];

const captions = rawWords.map((text, index) => ({
  text,
  startMs: index * 220,
  endMs: index * 220 + 180,
  timestampMs: index * 220,
  confidence: null,
}));

const {words, alignment} = buildCanonicalWordTimings({
  script,
  captions,
  audioDurationMs: 4700,
  minimumCoverage: 0.8,
});

const expected = script.trim().split(/\s+/u);
const failures = [];
if (words.length !== expected.length) failures.push(`expected ${expected.length} canonical words, got ${words.length}`);
words.forEach((word, index) => {
  if (word.text !== expected[index]) failures.push(`word ${index + 1}: canonical text changed`);
  if (!Number.isFinite(word.startMs) || !Number.isFinite(word.endMs)) failures.push(`word ${index + 1}: invalid timing`);
  if (word.endMs <= word.startMs) failures.push(`word ${index + 1}: end must be after start`);
  if (index > 0 && word.startMs <= words[index - 1].startMs) failures.push(`word ${index + 1}: starts must strictly increase`);
});
if (normalizeWord('Rückmeldungen') !== 'rückmeldungen') failures.push('German normalization regression');
if (alignment.coverage < 0.8) failures.push(`unexpected low alignment coverage: ${alignment.coverage}`);

let rejectedMismatch = false;
try {
  buildCanonicalWordTimings({
    script,
    captions: [
      {text: 'komplett', startMs: 0, endMs: 200},
      {text: 'anderer', startMs: 210, endMs: 410},
      {text: 'inhalt', startMs: 420, endMs: 620},
    ],
    audioDurationMs: 1000,
    minimumCoverage: 0.85,
  });
} catch {
  rejectedMismatch = true;
}
if (!rejectedMismatch) failures.push('mismatched audio/script must fail the production alignment gate');

if (failures.length) {
  console.error('\nWORD TIMING ALIGNMENT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `WORD TIMING ALIGNMENT QA: PASS — ${words.length} canonical words, ${(alignment.coverage * 100).toFixed(1)}% aligned, interpolation and mismatch gate verified.`,
);
