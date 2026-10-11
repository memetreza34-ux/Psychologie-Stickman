#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';
import {assertValidFlowCoverPolicy, resolveCoverPolicy} from './lib/cover-policy.mjs';

const [wordTimingPath, phase1PlanPath, outputPath] = process.argv.slice(2);
if (!wordTimingPath || !phase1PlanPath || !outputPath) {
  console.error('Usage: npm run map:phase1 -- <word-timings.json> <phase1-scenes.json> <scene-plan.json>');
  process.exit(1);
}

const normalizeFormat = (value) => {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized.startsWith('reel')) return 'reel';
  if (normalized.startsWith('youtube')) return 'youtube';
  return normalized;
};
const read = (p) => JSON.parse(fs.readFileSync(path.resolve(p), 'utf8'));
const words = read(wordTimingPath);
const rawPhase1 = read(phase1PlanPath);
const phase1 = resolvePhase1Plan(rawPhase1, phase1PlanPath);
const scenes = phase1.scenes ?? [];

if (!Array.isArray(words) || words.length === 0) throw new Error('word-timings.json must contain words.');
if (!Array.isArray(scenes) || scenes.length === 0) throw new Error('Phase 1 contains no visual beats.');

const norm = (v) => String(v ?? '').normalize('NFKC').toLocaleLowerCase('de-DE').replace(/[„“”"‚‘’'`´….,!?;:()\[\]{}<>/\\|+*=~_^%$#@&–—-]/g, '').replace(/\s+/g, '').trim();
const toks = (v) => String(v ?? '').trim().split(/\s+/).map(norm).filter(Boolean);
const firstWords = (text, count = 8) => String(text ?? '').trim().split(/\s+/).filter(Boolean).slice(0, count).join(' ');
const lastWord = (text) => String(text ?? '').trim().split(/\s+/).filter(Boolean).at(-1) ?? '';
const timing = words.map((w) => norm(w.text));
const starts = [];
let min = 0;

for (const scene of scenes) {
  const speechSection = String(scene.speechSection ?? '').trim();
  if (!speechSection) throw new Error(`Scene ${scene.scene ?? starts.length + 1}: speechSection is required.`);
  const startPhrase = String(scene.startPhrase ?? '').trim() || firstWords(speechSection, 8);
  const p = toks(startPhrase);
  const matches = [];
  for (let i = min; i <= timing.length - p.length; i += 1) if (p.every((t, j) => timing[i + j] === t)) matches.push(i);
  if (matches.length !== 1) {
    console.error(`Scene ${scene.scene}: startPhrase must map exactly once after word ${min + 1}. Found ${matches.length}.`);
    console.error(`startPhrase: ${startPhrase}`);
    process.exit(1);
  }
  starts.push(matches[0] + 1);
  min = matches[0] + p.length;
}

if (starts[0] !== 1) {
  console.error('Scene 1 must start at word 1.');
  process.exit(1);
}

scenes.forEach((scene, index) => {
  const s = starts[index] - 1;
  const e = index + 1 < starts.length ? starts[index + 1] - 2 : words.length - 1;
  const planned = toks(scene.speechSection);
  const actual = timing.slice(s, e + 1);
  if (planned.length !== actual.length || planned.some((t, i) => t !== actual[i])) throw new Error(`Scene ${scene.scene}: speechSection mismatch.`);
  const expectedEndWord = norm(scene.endWord ?? lastWord(scene.speechSection));
  if (expectedEndWord !== timing[e]) throw new Error(`Scene ${scene.scene}: endWord mismatch.`);
});

const format = normalizeFormat(phase1.format);
if (!['reel', 'youtube'].includes(format)) throw new Error(`Unsupported Phase 1 format: ${phase1.format}`);

const coverPolicy = resolveCoverPolicy(phase1, phase1PlanPath);
if (format === 'youtube') assertValidFlowCoverPolicy(coverPolicy, phase1PlanPath);

const flowTextPolicyPath = path.join(path.dirname(path.resolve(phase1PlanPath)), 'flow-text-policy.json');
const sidecar = fs.existsSync(flowTextPolicyPath) ? read(flowTextPolicyPath) : null;
const finalTextPolicy = String(sidecar?.finalTextPolicy ?? phase1.finalTextPolicy ?? phase1.finalTextOverlayPolicy ?? '').trim();
const flowOnlyText = format === 'youtube' && finalTextPolicy === 'FLOW_VISIBLE_TEXT_ONLY_V3';

let sceneLabels = Array.isArray(phase1.sceneLabels) ? phase1.sceneLabels : [];
if (flowOnlyText) {
  sceneLabels = [];
} else if (format === 'youtube' && coverPolicy.isGoogleFlow) {
  sceneLabels = sceneLabels.filter((label) => (label?.variant ?? 'keyword') !== 'cover');
}

// Older and newly planned YouTube projects may omit media paths until Phase 3.
// Keep explicitly configured paths unchanged; default only to this project's canonical folders.
const projectDir = path.dirname(path.dirname(path.resolve(phase1PlanPath)));
const projectRelative = path.relative(process.cwd(), projectDir).replace(/\\/g, '/');
const projectMediaPath = (configured, suffix, label) => {
  if (typeof configured === 'string' && configured.trim()) return configured;
  if (format === 'youtube' && /^youtube\\/[^/]+(?:\\/[^/]+)*$/.test(projectRelative)) {
    return `${projectRelative}/${suffix}`;
  }
  throw new Error(`${label} is missing in Phase 1 and no canonical YouTube project path could be resolved.`);
};

const out = {
  format,
  audio: projectMediaPath(phase1.audio, '04-audio/final-voice.mp3', 'audio'),
  imageBasePath: projectMediaPath(phase1.imageBasePath, '03-bilder', 'imageBasePath'),
  sceneStartWords: starts,
  imageExtension: String(phase1.imageExtension ?? 'png').replace(/^\./, ''),
  ...(Number.isFinite(phase1.imageDigits) ? {imageDigits: phase1.imageDigits} : {}),
  ...(Number.isFinite(phase1.endHoldMs) ? {endHoldMs: phase1.endHoldMs} : {}),
  ...(Array.isArray(phase1.sceneEffects) ? {sceneEffects: phase1.sceneEffects} : {}),
  sceneLabels,
  ...(format === 'youtube' ? {
    coverTextRenderer: coverPolicy.coverTextRenderer,
    coverHeadline: coverPolicy.coverHeadline,
    flowSourceImageTextPolicy: sidecar?.flowSourceImageTextPolicy ?? coverPolicy.flowSourceImageTextPolicy,
    visibleTextRenderer: sidecar?.visibleTextRenderer ?? phase1.visibleTextRenderer ?? (flowOnlyText ? 'GOOGLE_FLOW' : undefined),
    finalTextPolicy: flowOnlyText ? 'FLOW_VISIBLE_TEXT_ONLY_V3' : finalTextPolicy,
    renderGermanLabelsInRemotion: flowOnlyText ? false : phase1.renderGermanLabelsInRemotion,
    ...(Array.isArray(sidecar?.flowTextMoments) ? {flowTextMoments: sidecar.flowTextMoments} : Array.isArray(phase1.flowTextMoments) ? {flowTextMoments: phase1.flowTextMoments} : {}),
  } : {}),
  ...(typeof phase1.autoCaptions === 'boolean' ? {autoCaptions: phase1.autoCaptions} : {}),
  ...(Number.isFinite(phase1.captionWordsPerPage) ? {captionWordsPerPage: phase1.captionWordsPerPage} : {}),
};

fs.mkdirSync(path.dirname(path.resolve(outputPath)), {recursive: true});
fs.writeFileSync(path.resolve(outputPath), `${JSON.stringify(out, null, 2)}\n`);
console.log(`PHASE 1 MAP: PASS — ${scenes.length} visual beats (${format}); text=${flowOnlyText ? 'GOOGLE_FLOW_ONLY' : 'LEGACY'}`);
