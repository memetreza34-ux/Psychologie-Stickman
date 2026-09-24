#!/usr/bin/env node

import {buildVisualBeatScenes, splitScriptIntoVisualBeats} from './lib/youtube-visual-beats.mjs';

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

const beats = splitScriptIntoVisualBeats(sampleScript, {targetWords: 14, maxWords: 20, semanticSplit: true});
const scenes = buildVisualBeatScenes(beats);
const requiredFields = ['visualIdea', 'subject', 'action', 'environment', 'camera', 'continuityPolicy', 'textPolicy', 'visualTask'];
const failures = [];

if (scenes.length < 6) failures.push(`expected at least 6 generated scenes, got ${scenes.length}`);

for (const scene of scenes) {
  for (const field of requiredFields) {
    if (typeof scene[field] !== 'string' || scene[field].trim() === '') {
      failures.push(`scene ${scene.scene}: missing required planning field '${field}'`);
    }
  }
  if (scene.textPolicy !== 'NONE') failures.push(`scene ${scene.scene}: textPolicy must default to NONE`);
  if (scene.continuityPolicy !== 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY') {
    failures.push(`scene ${scene.scene}: wrong continuityPolicy`);
  }
  if (!/CAST:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing CAST planning`);
  if (!/ORT:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing ORT planning`);
  if (!/HANDLUNG:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing HANDLUNG planning`);
  if (!/KAMERA:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing KAMERA planning`);
  if (!/1–4/u.test(scene.subject)) failures.push(`scene ${scene.scene}: cast guidance must allow 1–4 Stickmen`);
  if (!/Nicht automatisch Schreibtisch\/Homeoffice/iu.test(scene.environment)) {
    failures.push(`scene ${scene.scene}: environment guidance does not block desk/home-office default`);
  }
}

const uniqueCameras = new Set(scenes.map((scene) => scene.camera));
if (uniqueCameras.size < Math.min(5, scenes.length)) {
  failures.push(`camera variation too low: ${uniqueCameras.size} unique camera plans across ${scenes.length} scenes`);
}

if (failures.length > 0) {
  console.error('\nAUTO VISUAL PLANNING QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `AUTO VISUAL PLANNING QA: PASS — ${scenes.length} scenes, ${uniqueCameras.size} camera plans, structured CAST/ORT/HANDLUNG/KAMERA fields present.`,
);
