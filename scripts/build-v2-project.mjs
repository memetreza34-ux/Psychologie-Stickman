#!/usr/bin/env node

// WORKFLOW_V2: erzeugt aus 01-script/script.txt + 99-intern/shotlist.json alle Phase-1-Dateien:
// 99-intern/phase1-scenes.json und 02-google-flow/google-flow-prompt.txt (kurz, ohne Policy-IDs in den Bildprompts).
// Nutzung: npm run v2:build -- youtube/<Woche>/<TT.MM.JJJJ-thema>

import fs from 'node:fs';
import path from 'node:path';
import {PHASE3_INFO_CARD_TYPES_LIST} from './lib/v2-constants.mjs';
import {visualTypes, visualFunctions, cameraScales, CREATIVE_POLICY} from './lib/creative-visual-qa.mjs';

const projectArg = process.argv[2];
if (!projectArg) {
  console.error('Nutzung: npm run v2:build -- youtube/<Woche>/<TT.MM.JJJJ-thema>');
  process.exit(1);
}
const projectDir = path.resolve(projectArg);
const read = (rel) => fs.readFileSync(path.join(projectDir, rel), 'utf8');
const script = read('01-script/script.txt').trim();
const shotlist = JSON.parse(read('99-intern/shotlist.json'));
const shots = shotlist.shots ?? [];
const errors = [];
const words = (v) => String(v ?? '').trim().split(/\s+/u).filter(Boolean);
const squash = (v) => words(v).join(' ');
const pad = (n) => String(n).padStart(2, '0');

if (shotlist.workflowVersion !== 'V2') errors.push('shotlist.workflowVersion must be "V2".');
if (!shots.length) errors.push('shotlist.shots is empty.');

// Alle speech-Abschnitte zusammen müssen exakt das Skript ergeben, sonst passt später das Timing nicht.
const joined = squash(shots.map((s) => s.speech).join(' '));
if (joined !== squash(script)) {
  const a = words(joined);
  const b = words(script);
  const at = a.findIndex((w, i) => w !== b[i]);
  const index = at < 0 ? Math.min(a.length, b.length) : at;
  errors.push(`speech-Abschnitte ergeben nicht exakt das Skript (erste Abweichung bei Wort ${index + 1}: Shotliste "${a.slice(index, index + 6).join(' ')}" vs. Skript "${b.slice(index, index + 6).join(' ')}").`);
}

const effects = new Set(['static', 'zoom-in', 'zoom-out', 'pan-left', 'pan-right']);
const defaultEffects = ['zoom-in', 'pan-right', 'zoom-out', 'pan-left'];
const cards = [];
shots.forEach((shot, i) => {
  const n = i + 1;
  const where = `shot ${n}`;
  if (!visualTypes.has(shot.type)) errors.push(`${where}: unknown type ${shot.type}.`);
  if (!visualFunctions.has(shot.function)) errors.push(`${where}: unknown function ${shot.function}.`);
  if (!cameraScales.has(shot.camera)) errors.push(`${where}: unknown camera ${shot.camera}.`);
  if (shot.effect && !effects.has(shot.effect)) errors.push(`${where}: unknown effect ${shot.effect}.`);
  if (shot.variantOf && !(Number.isInteger(shot.variantOf) && shot.variantOf >= 1 && shot.variantOf < n)) errors.push(`${where}: variantOf must reference an earlier shot.`);
  if (!/no text/iu.test(shot.prompt ?? '')) errors.push(`${where}: prompt must end with "No text, no letters, no numbers." (Text kommt über card).`);
  if (shot.card) {
    if (!PHASE3_INFO_CARD_TYPES_LIST.includes(shot.card.type)) errors.push(`${where}: card.type must be ${PHASE3_INFO_CARD_TYPES_LIST.join('/')}.`);
    cards.push({scene: n, ...shot.card});
  }
});
if (errors.length) {
  errors.forEach((e) => console.error(`V2 BUILD: FAIL ${e}`));
  process.exit(1);
}

// Kein Remotion: Text aus einer `card` schreibt Google Flow exakt und kurz direkt ins Bild.
const SUB_MAX_WORDS = 5;
const textArea = {top: 'in the upper third of the image', center: 'in the center of the image', bottom: 'in the lower third of the image'};
const flowTextFor = (card) => {
  if (card.type === 'keyword') return [card.text, ...(card.sub && words(card.sub).length <= SUB_MAX_WORDS ? [card.sub] : [])];
  if (card.type === 'stat') return [card.value, card.label];
  if (card.type === 'compare') return [[card.left, card.leftSub].filter(Boolean).join(' – '), [card.right, card.rightSub].filter(Boolean).join(' – ')];
  return card.steps;
};
const textInstruction = (card) => {
  const lines = flowTextFor(card);
  const quoted = lines.map((line) => `"${line}"`);
  const area = textArea[card.position ?? 'top']; // Prompts halten meist das obere Drittel frei.
  let layout;
  if (card.type === 'compare') layout = `two clearly separated labels, left side ${quoted[0]}, right side ${quoted[1]}`;
  else if (card.type === 'steps') layout = `a simple left-to-right chain of ${lines.length} hand-drawn boxes connected by arrows, labeled ${quoted.join(', ')}`;
  else if (card.type === 'stat') layout = `the large number ${quoted[0]} with the smaller line ${quoted[1]} below it`;
  else layout = lines.length > 1 ? `the large words ${quoted[0]} with the smaller line ${quoted[1]} below it` : `the large words ${quoted[0]}`;
  return `Add exact German text ${area}, as clean bold hand-lettered writing that fits the illustration: ${layout}. Spell every word exactly as given, including umlauts. No other text, letters or numbers anywhere.`;
};
const promptFor = (shot) => {
  const base = shot.prompt.trim().replace(/\s*No text, no letters, no numbers\.?\s*$/iu, '');
  return shot.card ? `${base} ${textInstruction(shot.card)}` : `${base} No text, no letters, no numbers.`;
};

const thumb = shotlist.thumbnail ?? {};
const scenes = shots.map((shot, i) => ({
  scene: i + 1,
  speechSection: squash(shot.speech),
  startPhrase: words(shot.speech).slice(0, 8).join(' '),
  endWord: words(shot.speech).at(-1),
  sceneType: shot.type,
  visualFunction: shot.function,
  cameraScale: shot.camera,
  focalSubjectKey: shot.subject,
  settingKey: shot.setting,
  informationGain: shot.gain,
  alternativeVisualType: shot.alt,
  alternativeRejectionReason: shot.altWhyNot,
  representationReason: shot.why ?? shot.altWhyNot,
  observableEvidence: shot.prompt,
  dominantRelation: shot.gain,
  ...(shot.mechanismWhy ? {mechanismRenderingJustification: shot.mechanismWhy} : {}),
  ...(shot.sequenceOverrideReason ? {sequenceOverrideReason: shot.sequenceOverrideReason} : {}),
  ...(shot.variantOf ? {variantOf: shot.variantOf} : {}),
  // Längere Sprechabschnitte (über 20 Wörter) nur mit bewusster Freigabe, z. B. für eine Vergleichskarte.
  ...(shot.extendedBeatReason ? {allowExtendedBeat: true, extendedBeatReason: shot.extendedBeatReason} : {}),
  ...(shot.card ? {flowText: flowTextFor(shot.card)} : {}),
  panelCount: 1,
  textPolicy: shot.card ? 'FLOW_EXACT_GERMAN_TEXT' : 'NONE',
}));

const phase1 = {
  status: 'PHASE1_READY_FOR_THUMBNAIL_SELECTION',
  workflowVersion: 'V2',
  format: 'youtube',
  aspectRatio: '16:9',
  resolution: '1920x1080',
  fps: 30,
  batchSize: 5,
  productionMode: 'LONGFORM_STANDARD_V1',
  longformScriptPolicy: 'LONGFORM_STORY_RETENTION_V1',
  topicUniquenessPolicy: 'TOPIC_UNIQUENESS_V1',
  topicId: shotlist.topicId,
  scriptWordCount: words(script).length,
  visualWorldStatus: 'ACTIVE',
  visualWorld: 'PSYCHOLOGY_STICKMAN_WORLD_V1',
  creativeVisualPolicy: CREATIVE_POLICY,
  // Nur Skript + Bilder: kein Remotion-Text, kurze exakte deutsche Texte rendert Google Flow.
  finalTextPolicy: 'FLOW_EXACT_TEXT_V2',
  visibleTextRenderer: 'GOOGLE_FLOW',
  renderGermanLabelsInRemotion: false,
  thumbnailGenerationPolicy: 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1',
  // V2: Cover und alle Bilder liegen zusammen in 03-bilder/ (00-cover.png + 01.png … NN.png).
  thumbnailTargetPath: '03-bilder/00-cover.png',
  exportPackagePolicy: 'YOUTUBE_EXPORT_PACKAGE_V2',
  coverHeadline: thumb.headline,
  coverTopicTerm: thumb.topicTerm,
  coverVisualThesis: thumb.thesis,
  coverMechanismVisible: true,
  characters: shotlist.characters ?? [],
  metaphor: shotlist.metaphor ?? '',
  sceneEffects: shots.map((shot, i) => shot.effect ?? defaultEffects[i % defaultEffects.length]),
  scenes,
};

const characterLines = (shotlist.characters ?? []).map((c) => `- ${c.name}: ${c.look}`).join('\n');
const blocks = shots.map((shot, i) => {
  const n = pad(i + 1);
  const prompt = shot.variantOf
    ? `Edit BILD ${pad(shot.variantOf)} (keep the same character, place, light and style): ${promptFor(shot)}`
    : promptFor(shot);
  return [
    `BILD ${n}`,
    `Sprechtext (nur Timing, NICHT ins Bild): ${squash(shot.speech)}`,
    `Prompt: ${prompt.replace(/\s+/gu, ' ')}`,
    `Save as ${n}.png`,
  ].join('\n');
});

const candidates = (thumb.candidates ?? []).map((c, i) => `Candidate ${i + 1}: ${c}`).join('\n');
const prompt = `GOOGLE FLOW — ${shotlist.title}
Kopfarium · 16:9 · ${shots.length} video images + 3 thumbnail candidates

HOW TO WORK — follow exactly
1. Attach the channel style reference image and the character sheet(s) below to every image.
2. COVER: create exactly 3 separate 16:9 cover images (see THUMBNAIL CANDIDATES below) as cover-candidate-01.png, cover-candidate-02.png, cover-candidate-03.png. Then STOP and ask ONE question: "Welches Cover: 1, 2 oder 3?" This is the ONLY question in the whole job.
3. As soon as the user answers: rename the chosen cover to 00-cover.png in 03-bilder/ and immediately DELETE the two other cover candidates. Keep no copies of them anywhere.
4. Then work fully on your own until everything is finished: create ALL ${shots.length} video images without asking anything. Work in batches of 5 (01–05, 06–10, …) only to check your work — never pause after a batch, never ask "Shall I continue?", never wait for approval. If you are interrupted or hit a limit, simply continue with the next missing number.
5. One BILD = one separate 16:9 PNG. No storyboard, no contact sheet, no collage, no comic panels.
6. Check each batch: same character design, same style, emotion readable on a phone, text ONLY where a BILD gives exact German text — spelled exactly, otherwise no letters at all. Regenerate only failed or missing numbers, without asking.
7. ONE FOLDER: name every image NN.png (01.png, 02.png, …) and save it in 03-bilder/ — the same folder as 00-cover.png. No subfolders, no other folders.
8. FINAL check, then report once: 03-bilder/ contains exactly 00-cover.png and 01.png–${pad(shots.length)}.png, nothing missing, nothing extra. The cover is never BILD 01.
9. "Edit BILD NN" means: open that image and change only what is described, so the scene stays continuous.

STYLE (applies to every image)
Hand-drawn 2D illustration: dark slightly organic outlines, soft cel shading, subtle paper texture, natural clear colors, real depth. People are stickmen with a large round white head, tiny black oval eyes, small simple eyebrows and mouth, a narrow clothed body and very thin dark stick-like arms and legs. All people in one image share exactly this build. Never add text, letters, numbers, signs or captions unless a BILD gives exact German text — then write exactly that text and nothing else.

CHARACTERS (create a character sheet first with vorlagen/figuren/02-figuren-sheet.txt)
${characterLines}
${shotlist.metaphor ? `\nRECURRING METAPHOR\n${shotlist.metaphor}\n` : ''}
THUMBNAIL CANDIDATES (= the 3 cover candidates)
Every cover shows the exact German headline "${thumb.headline}" as very large, bold, high-contrast hand-lettered text, perfectly spelled, readable on a phone. No other text.
${candidates}

============================================================
VIDEO IMAGES
============================================================

${blocks.join('\n\n')}
`;

fs.writeFileSync(path.join(projectDir, '99-intern', 'phase1-scenes.json'), `${JSON.stringify(phase1, null, 2)}\n`);
fs.writeFileSync(path.join(projectDir, '02-google-flow', 'google-flow-prompt.txt'), prompt);
const variants = shots.filter((s) => s.variantOf).length;
console.log(`V2 BUILD: PASS — ${shots.length} Bilder (${shots.length - variants} Grundszenen, ${variants} Varianten), ${cards.length} Bilder mit exaktem Flow-Text, ${words(script).length} Wörter.`);
