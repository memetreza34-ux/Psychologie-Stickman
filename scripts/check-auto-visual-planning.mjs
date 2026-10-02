#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {buildVisualBeatScenes, resolvePhase1Plan, splitScriptIntoVisualBeats} from './lib/youtube-visual-beats.mjs';

const sampleScript = `
Du willst anfangen, aber dein Handy zieht deine Aufmerksamkeit weg.
Später merkst du im Bus, dass du wieder nur scrollst.
In der Bibliothek wirkt die Aufgabe plötzlich viel größer als gedacht.
Ein Freund fragt dich, warum du noch nicht angefangen hast.
Im Büro öffnest du die Datei und machst nur den ersten kleinen Schritt.
Danach fällt dir die nächste Handlung leichter.
`;

const coverHeadline = 'WARUM SCHIEBEN WIR AUF?';
const flowTextMoments = [{scene: 1, kind: 'cover', text: coverHeadline}];
const beats = splitScriptIntoVisualBeats(sampleScript, {targetWords: 14, maxWords: 20, semanticSplit: true});
const scenes = buildVisualBeatScenes(beats, {coverHeadline, flowTextMoments});
const failures = [];
const requiredFields = ['sceneType','representationReason','visualIdea','subject','action','environment','camera','continuityPolicy','textPolicy','visualTask','compositionType','socialDensity','viewerTakeaway','observableEvidence','dominantRelation','literalMetaphorWarning'];

if (scenes.length < 5) failures.push(`expected at least 5 generated scenes, got ${scenes.length}`);

for (const scene of scenes) {
  for (const field of requiredFields) {
    if (typeof scene[field] !== 'string' || scene[field].trim() === '') failures.push(`scene ${scene.scene}: missing '${field}'`);
  }
  if (!['standard', 'contrast'].includes(scene.compositionType)) failures.push(`scene ${scene.scene}: invalid compositionType '${scene.compositionType}'`);
  if (!['solo', 'duo', 'group', 'none'].includes(scene.socialDensity)) failures.push(`scene ${scene.scene}: invalid socialDensity '${scene.socialDensity}'`);
  if (!/OBSERVABLE-SCENE FIRST/iu.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask must use observable-scene-first planning`);
  if (!/REPRESENTATION FIRST/iu.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask must use representation-first planning`);
}

if (scenes[0]?.isCover !== true) failures.push('scene 1 must be cover');
if (scenes[0]?.textPolicy !== 'FLOW_EXACT_COVER_TEXT') failures.push('scene 1 must use exact cover text');

const representationTypes = new Set(scenes.map((scene) => scene.sceneType));
if (representationTypes.size < 2) failures.push('auto planning must produce more than one representation type for the mixed sample script');

const spotlightScene = buildVisualBeatScenes(['Dieses Gefühl nennt man Spotlight-Effekt.'])[0];
if (!/spotlight/iu.test(spotlightScene.literalMetaphorWarning ?? '')) failures.push('Spotlight-Effekt must trigger literal-metaphor warning');

const tmpDir = path.resolve('tmp');
const tmpScript = path.join(tmpDir, 'auto-visual-planning-script.txt');
fs.mkdirSync(tmpDir, {recursive: true});
fs.writeFileSync(tmpScript, sampleScript.trim());
try {
  const resolved = resolvePhase1Plan({format: 'youtube', autoFromScript: {scriptPath: tmpScript, targetWords: 14, maxWords: 20, semanticSplit: true, coverHeadline, flowTextMoments}}, 'auto-planning-qa');
  if (resolved.visualWorldStatus !== 'ACTIVE') failures.push('visual world must be ACTIVE');
  if (resolved.visualWorld !== 'PSYCHOLOGY_STICKMAN_WORLD_V1') failures.push('active Psychology Stickman World must be injected');
  if (resolved.visualDirectorPolicy !== 'OBSERVABLE_SCENE_FIRST_V1') failures.push('missing observable director policy');
  if (resolved.representationVarietyPolicy !== 'REPRESENTATION_VARIETY_V1') failures.push('missing representation variety policy');
  if (resolved.flowPromptPolicy !== 'NATURAL_FLOW_MASTER_V2') failures.push('missing flow prompt policy');
  if (resolved.flowOutputPolicy !== 'FINAL_SEPARATE_IMAGE_ASSETS_V2') failures.push('missing output policy');
  if (resolved.flowTextStylePolicy !== 'PSYCHOLOGY_STICKMAN_WORLD_V1') failures.push('text style must use the active world');
  if ('visualSystem' in resolved) failures.push('old visualSystem must not be auto-injected');
  if ('characterSystem' in resolved) failures.push('old characterSystem must not be auto-injected');
} finally {
  fs.rmSync(tmpScript, {force: true});
}

if (failures.length) {
  console.error('\nAUTO VISUAL PLANNING QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`AUTO VISUAL PLANNING QA: PASS — ${scenes.length} scenes; representations=${[...representationTypes].join(', ')}.`);
