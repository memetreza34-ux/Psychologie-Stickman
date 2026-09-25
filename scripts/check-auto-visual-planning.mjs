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
Auf dem Heimweg denkst du noch einmal über die Aufgabe nach.
Am Abend arbeitest du schließlich ruhig weiter.
`;

const coverHeadline = 'WARUM SCHIEBEN WIR AUF?';
const flowTextMoments = [
  {scene: 1, kind: 'cover', text: coverHeadline},
  {scene: 4, kind: 'keyword', text: 'KLEINER START'},
];
const beats = splitScriptIntoVisualBeats(sampleScript, {targetWords: 14, maxWords: 20, semanticSplit: true});
const scenes = buildVisualBeatScenes(beats, {coverHeadline, flowTextMoments});
const requiredFields = ['visualIdea', 'subject', 'action', 'environment', 'camera', 'continuityPolicy', 'textPolicy', 'visualTask'];
const failures = [];

if (scenes.length < 6) failures.push(`expected at least 6 generated scenes, got ${scenes.length}`);

for (const scene of scenes) {
  for (const field of requiredFields) {
    if (typeof scene[field] !== 'string' || scene[field].trim() === '') failures.push(`scene ${scene.scene}: missing required planning field '${field}'`);
  }
  if (scene.scene === 1) {
    if (scene.textPolicy !== 'FLOW_EXACT_COVER_TEXT') failures.push('scene 1 must use FLOW_EXACT_COVER_TEXT');
    if (scene.flowText !== coverHeadline) failures.push('scene 1 must carry exact cover text');
  } else if (scene.scene === 4) {
    if (scene.textPolicy !== 'FLOW_EXACT_KEYWORD_TEXT') failures.push('scene 4 must use FLOW_EXACT_KEYWORD_TEXT');
    if (scene.flowText !== 'KLEINER START') failures.push('scene 4 must carry exact Flow keyword');
  } else if (scene.textPolicy !== 'NONE') failures.push(`scene ${scene.scene}: unplanned scene must be text-free`);

  if (scene.continuityPolicy !== 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY') failures.push(`scene ${scene.scene}: wrong continuityPolicy`);
  if (!/CAST:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing CAST planning`);
  if (!/ORT:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing ORT planning`);
  if (!/HANDLUNG:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing HANDLUNG planning`);
  if (!/KAMERA:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing KAMERA planning`);
  if (!/1–4/u.test(scene.subject)) failures.push(`scene ${scene.scene}: cast guidance must allow 1–4 Stickmen`);
  if (!/Nicht automatisch Schreibtisch\/Homeoffice/iu.test(scene.environment)) failures.push(`scene ${scene.scene}: environment guidance does not block desk/home-office default`);
}

if (scenes[0]?.isCover !== true) failures.push('scene 1 must always set isCover=true');
if (scenes[0]?.coverRole !== 'SCENE_01_COVER_MASTER') failures.push('scene 1 must set coverRole=SCENE_01_COVER_MASTER');
if (!/COVER HARD LOCK/iu.test(scenes[0]?.visualTask ?? '')) failures.push('scene 1 visualTask must contain COVER HARD LOCK guidance');
for (const scene of scenes.slice(1)) {
  if (scene.isCover !== false) failures.push(`scene ${scene.scene}: only scene 1 may be the cover`);
  if ('coverRole' in scene) failures.push(`scene ${scene.scene}: coverRole must only exist on scene 1`);
}

const uniqueCameras = new Set(scenes.map((scene) => scene.camera));
if (uniqueCameras.size < Math.min(5, scenes.length)) failures.push(`camera variation too low: ${uniqueCameras.size} unique camera plans across ${scenes.length} scenes`);

const tmpDir = path.resolve('tmp');
const tmpScript = path.join(tmpDir, 'auto-visual-planning-script.txt');
fs.mkdirSync(tmpDir, {recursive: true});
fs.writeFileSync(tmpScript, sampleScript.trim());
try {
  const resolved = resolvePhase1Plan({
    format: 'youtube',
    flowTextMoments,
    autoFromScript: {
      scriptPath: tmpScript,
      targetWords: 14,
      maxWords: 20,
      semanticSplit: true,
      coverHeadline,
    },
  }, 'auto-planning-qa');

  if (resolved.finalTextPolicy !== 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push('auto plan must opt into FLOW_VISIBLE_TEXT_ONLY_V3');
  if (resolved.visibleTextLanguage !== 'de') failures.push("auto plan visibleTextLanguage must be 'de'");
  if (resolved.visibleTextRenderer !== 'GOOGLE_FLOW') failures.push('auto plan visibleTextRenderer must be GOOGLE_FLOW');
  if (resolved.flowSourceImageTextPolicy !== 'PLANNED_EXACT_GERMAN_TEXT_ONLY') failures.push('auto plan Flow text policy is wrong');
  if (resolved.coverTextRenderer !== 'GOOGLE_FLOW') failures.push('auto plan coverTextRenderer must be GOOGLE_FLOW');
  if (resolved.coverHeadline !== coverHeadline) failures.push('auto plan must preserve exact coverHeadline');
  if (resolved.renderGermanLabelsInRemotion !== false) failures.push('auto plan must disable all Remotion text');
  if ((resolved.sceneLabels ?? []).length !== 0) failures.push('new YouTube auto plan must keep sceneLabels empty');
  if ((resolved.flowTextMoments ?? []).length !== 2) failures.push('auto plan must preserve Flow text moments');
} finally {
  fs.rmSync(tmpScript, {force: true});
}

if (failures.length > 0) {
  console.error('\nAUTO VISUAL PLANNING QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`AUTO VISUAL PLANNING QA: PASS — ${scenes.length} scenes, all planned visible text is Google Flow-native, ${uniqueCameras.size} camera plans.`);
