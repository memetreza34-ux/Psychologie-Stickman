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
Am Abend vergleichst du zwei Wege, bevor du ruhig weiterarbeitest.
Mehrere kleine Beispiele zeigen dir schließlich, dass ein Anfang oft reicht.
Mit anderen Menschen besprichst du später, was dir geholfen hat.
`;

const coverHeadline = 'WARUM SCHIEBEN WIR AUF?';
const flowTextMoments = [
  {scene: 1, kind: 'cover', text: coverHeadline},
  {scene: 4, kind: 'keyword', text: 'KLEINER START'},
];
const visualSystem = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const beats = splitScriptIntoVisualBeats(sampleScript, {targetWords: 14, maxWords: 20, semanticSplit: true});
const scenes = buildVisualBeatScenes(beats, {coverHeadline, flowTextMoments, visualSystem});
const requiredStringFields = [
  'visualIdea',
  'subject',
  'characterDirection',
  'action',
  'actionOrRelation',
  'environment',
  'camera',
  'lightingMood',
  'colorDirection',
  'continuityPolicy',
  'textPolicy',
  'visualTask',
  'compositionType',
  'socialDensity',
  'composition',
  'socialPlan',
  'moodMode',
  'powerDynamic',
  'promptContract',
];
const allowedMoods = ['CLEAR', 'UNEASY', 'DARK', 'POWER', 'MONEY', 'ISOLATION', 'HOPE'];
const allowedPower = ['NEUTRAL', 'SELF_VS_SELF', 'PEER_TO_PEER', 'DOMINANT_VS_TARGET', 'AUTHORITY_VS_GROUP', 'GROUP_VS_INDIVIDUAL', 'SYSTEM_VS_INDIVIDUAL', 'STATUS_CONTRAST', 'NONE'];
const failures = [];

if (scenes.length < 8) failures.push(`expected at least 8 generated scenes, got ${scenes.length}`);

for (const scene of scenes) {
  for (const field of requiredStringFields) {
    if (typeof scene[field] !== 'string' || scene[field].trim() === '') failures.push(`scene ${scene.scene}: missing required planning field '${field}'`);
  }
  if (!Number.isInteger(scene.moodIntensity) || scene.moodIntensity < 0 || scene.moodIntensity > 4) failures.push(`scene ${scene.scene}: moodIntensity must be integer 0-4`);
  if (!allowedMoods.includes(scene.moodMode)) failures.push(`scene ${scene.scene}: invalid moodMode '${scene.moodMode}'`);
  if (!allowedPower.includes(scene.powerDynamic)) failures.push(`scene ${scene.scene}: invalid powerDynamic '${scene.powerDynamic}'`);
  if (scene.promptContract !== 'FLOW_SCENE_PROMPT_CONTRACT_V1') failures.push(`scene ${scene.scene}: wrong promptContract`);
  if (!['standard', 'split', 'contrast', 'montage'].includes(scene.compositionType)) failures.push(`scene ${scene.scene}: invalid compositionType '${scene.compositionType}'`);
  if (!['solo', 'duo', 'group'].includes(scene.socialDensity)) failures.push(`scene ${scene.scene}: invalid socialDensity '${scene.socialDensity}'`);

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
  if (!/KOMPOSITION:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing KOMPOSITION planning`);
  if (!/SOZIALDICHTE:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing SOZIALDICHTE planning`);
  if (!/MOOD:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing MOOD planning`);
  if (!/POWER DYNAMIC:/u.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask missing POWER DYNAMIC planning`);
  if (!/Nicht automatisch Schreibtisch\/Homeoffice/iu.test(scene.environment)) failures.push(`scene ${scene.scene}: environment guidance does not block desk/home-office default`);
}

if (scenes[0]?.isCover !== true) failures.push('scene 1 must always set isCover=true');
if (scenes[0]?.coverRole !== 'SCENE_01_COVER') failures.push('scene 1 must set coverRole=SCENE_01_COVER');
if (!/COVER HARD LOCK/iu.test(scenes[0]?.visualTask ?? '')) failures.push('scene 1 visualTask must contain COVER HARD LOCK guidance');
if (!/NOT the global style\/anatomy master/iu.test(scenes[0]?.visualTask ?? '')) failures.push('scene 1 must explicitly reject global style-master role');
for (const scene of scenes.slice(1)) {
  if (scene.isCover !== false) failures.push(`scene ${scene.scene}: only scene 1 may be the cover`);
  if ('coverRole' in scene) failures.push(`scene ${scene.scene}: coverRole must only exist on scene 1`);
}

const uniqueCameras = new Set(scenes.map((scene) => scene.camera));
if (uniqueCameras.size < Math.min(5, scenes.length)) failures.push(`camera variation too low: ${uniqueCameras.size} unique camera plans across ${scenes.length} scenes`);

const compositionCounts = scenes.reduce((acc, scene) => {
  acc[scene.compositionType] = (acc[scene.compositionType] ?? 0) + 1;
  return acc;
}, {});
const comparisonCount = (compositionCounts.split ?? 0) + (compositionCounts.contrast ?? 0);
if (comparisonCount < 1) failures.push('auto planning must include at least one split/contrast scene');
if ((compositionCounts.montage ?? 0) < 1) failures.push('auto planning must include at least one montage scene');

const socialCount = scenes.filter((scene) => scene.socialDensity === 'duo' || scene.socialDensity === 'group').length;
if (socialCount < 2) failures.push(`social scene variation too low: ${socialCount}/${scenes.length}`);
if (!scenes.some((scene) => scene.socialDensity === 'group')) failures.push('auto planning must include at least one group scene');

const tmpDir = path.resolve('tmp');
const tmpScript = path.join(tmpDir, 'auto-visual-planning-script.txt');
fs.mkdirSync(tmpDir, {recursive: true});
fs.writeFileSync(tmpScript, sampleScript.trim());
try {
  const resolved = resolvePhase1Plan({
    format: 'youtube',
    visualSystem,
    characterSystem: 'STYLIZED_STICKMAN_CAST_V2',
    moodPolicy: 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1',
    promptContract: 'FLOW_SCENE_PROMPT_CONTRACT_V1',
    flowTextMoments,
    autoFromScript: {
      scriptPath: tmpScript,
      targetWords: 14,
      maxWords: 20,
      semanticSplit: true,
      coverHeadline,
    },
  }, 'auto-planning-qa');

  if (resolved.visualSystem !== visualSystem) failures.push('auto plan must preserve CINEMATIC_HUMAN_BEHAVIOR_V2');
  if (resolved.characterSystem !== 'STYLIZED_STICKMAN_CAST_V2') failures.push('auto plan must use STYLIZED_STICKMAN_CAST_V2');
  if (resolved.moodPolicy !== 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1') failures.push('auto plan must use ADAPTIVE_PSYCHOLOGICAL_MOOD_V1');
  if (resolved.promptContract !== 'FLOW_SCENE_PROMPT_CONTRACT_V1') failures.push('auto plan must use FLOW_SCENE_PROMPT_CONTRACT_V1');
  if (resolved.finalTextPolicy !== 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push('auto plan must opt into FLOW_VISIBLE_TEXT_ONLY_V3');
  if (resolved.visibleTextLanguage !== 'de') failures.push("auto plan visibleTextLanguage must be 'de'");
  if (resolved.visibleTextRenderer !== 'GOOGLE_FLOW') failures.push('auto plan visibleTextRenderer must be GOOGLE_FLOW');
  if (resolved.flowSourceImageTextPolicy !== 'PLANNED_EXACT_GERMAN_TEXT_ONLY') failures.push('auto plan Flow text policy is wrong');
  if (resolved.flowTextStylePolicy !== 'CINEMATIC_WORLD_INTEGRATED_V2') failures.push('v2 auto plan must use CINEMATIC_WORLD_INTEGRATED_V2');
  if (resolved.visualPlanningPolicy !== 'VARIED_COMPOSITION_V1') failures.push('auto plan must use VARIED_COMPOSITION_V1');
  if (resolved.socialScenePolicy !== 'SOCIAL_VARIETY_V1') failures.push('auto plan must use SOCIAL_VARIETY_V1');
  if (resolved.coverTextRenderer !== 'GOOGLE_FLOW') failures.push('auto plan coverTextRenderer must be GOOGLE_FLOW');
  if (resolved.coverHeadline !== coverHeadline) failures.push('auto plan must preserve exact coverHeadline');
  if (resolved.renderGermanLabelsInRemotion !== false) failures.push('auto plan must disable all Remotion text');
  if ((resolved.sceneLabels ?? []).length !== 0) failures.push('new YouTube auto plan must keep sceneLabels empty');
  if ((resolved.flowTextMoments ?? []).length !== 2) failures.push('auto plan must preserve Flow text moments');
  if (!resolved.scenes.every((scene) => scene.promptContract === 'FLOW_SCENE_PROMPT_CONTRACT_V1')) failures.push('every resolved v2 scene must carry prompt contract');
} finally {
  fs.rmSync(tmpScript, {force: true});
}

if (failures.length > 0) {
  console.error('\nAUTO VISUAL PLANNING QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`AUTO VISUAL PLANNING QA: PASS — ${scenes.length} scenes, ${uniqueCameras.size} camera plans, ${comparisonCount} comparison scene(s), ${compositionCounts.montage ?? 0} montage scene(s), ${socialCount} social scene(s), v2 mood/power planning active.`);
