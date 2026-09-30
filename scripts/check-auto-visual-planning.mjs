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

const beats = splitScriptIntoVisualBeats(sampleScript, {targetWords: 14, maxWords: 20, semanticSplit: true});
const scenes = buildVisualBeatScenes(beats, {
  coverHeadline,
  flowTextMoments,
  visualSystem: 'CINEMATIC_HUMAN_BEHAVIOR_V2',
});

const requiredFields = [
  'sceneType',
  'visualIdea',
  'subject',
  'action',
  'environment',
  'camera',
  'continuityPolicy',
  'textPolicy',
  'visualTask',
  'compositionType',
  'socialDensity',
  'viewerTakeaway',
  'observableEvidence',
  'dominantRelation',
  'literalMetaphorWarning',
];
const failures = [];

if (scenes.length < 8) failures.push(`expected at least 8 generated scenes, got ${scenes.length}`);

for (const scene of scenes) {
  for (const field of requiredFields) {
    if (typeof scene[field] !== 'string' || scene[field].trim() === '') failures.push(`scene ${scene.scene}: missing required planning field '${field}'`);
  }
  if (!['standard', 'contrast'].includes(scene.compositionType)) failures.push(`scene ${scene.scene}: automatic planning should only choose standard/contrast, got '${scene.compositionType}'`);
  if (!['solo', 'duo', 'group', 'none'].includes(scene.socialDensity)) failures.push(`scene ${scene.scene}: invalid socialDensity '${scene.socialDensity}'`);
  if (!['CHARACTER_SCENE', 'SCHEMA_EXPLAINER', 'OBJECT_METAPHOR', 'COMPARE_VISUAL'].includes(scene.sceneType)) failures.push(`scene ${scene.scene}: invalid sceneType '${scene.sceneType}'`);

  if (!/OBSERVABLE-SCENE FIRST/iu.test(scene.visualTask)) failures.push(`scene ${scene.scene}: visualTask must use observable-scene-first planning`);
  if (/FLOW_SCENE_PROMPT_CONTRACT_V1/iu.test(scene.visualTask)) failures.push(`scene ${scene.scene}: retired FLOW_SCENE_PROMPT_CONTRACT_V1 leaked into visualTask`);

  if (scene.scene === 1) {
    if (scene.textPolicy !== 'FLOW_EXACT_COVER_TEXT') failures.push('scene 1 must use FLOW_EXACT_COVER_TEXT');
    if (scene.flowText !== coverHeadline) failures.push('scene 1 must carry exact cover text');
    if (!/COVER:/iu.test(scene.visualTask)) failures.push('scene 1 visualTask must contain cover guidance');
  } else if (scene.scene === 4) {
    if (scene.textPolicy !== 'FLOW_EXACT_KEYWORD_TEXT') failures.push('scene 4 must use FLOW_EXACT_KEYWORD_TEXT');
    if (scene.flowText !== 'KLEINER START') failures.push('scene 4 must carry exact Flow keyword');
  } else if (scene.textPolicy !== 'NONE') failures.push(`scene ${scene.scene}: unplanned scene must be text-free`);

  if (scene.continuityPolicy !== 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY') failures.push(`scene ${scene.scene}: wrong continuityPolicy`);
}

if (scenes[0]?.isCover !== true) failures.push('scene 1 must always set isCover=true');
if (scenes[0]?.coverRole !== 'SCENE_01_COVER') failures.push('scene 1 must set coverRole=SCENE_01_COVER');
for (const scene of scenes.slice(1)) {
  if (scene.isCover !== false) failures.push(`scene ${scene.scene}: only scene 1 may be the cover`);
  if ('coverRole' in scene) failures.push(`scene ${scene.scene}: coverRole must only exist on scene 1`);
}

// Variety must come from semantics, not mandatory quotas.
if (scenes.some((scene) => scene.compositionType === 'montage')) failures.push('auto planning must not inject montage merely for variety');

// Named psychology effects need a literal-metaphor guard.
const spotlightScene = buildVisualBeatScenes(['Dieses Gefühl nennt man Spotlight-Effekt.'], {
  visualSystem: 'CINEMATIC_HUMAN_BEHAVIOR_V2',
})[0];
if (!/theatrical spotlight/iu.test(spotlightScene.literalMetaphorWarning ?? '')) failures.push('Spotlight-Effekt must trigger a do-not-literalize spotlight guard');

const tmpDir = path.resolve('tmp');
const tmpScript = path.join(tmpDir, 'auto-visual-planning-script.txt');
fs.mkdirSync(tmpDir, {recursive: true});
fs.writeFileSync(tmpScript, sampleScript.trim());
try {
  const resolved = resolvePhase1Plan({
    format: 'youtube',
    visualSystem: 'CINEMATIC_HUMAN_BEHAVIOR_V2',
    scriptHookPolicy: 'HOOK_FIRST_EXPLAIN_EARLY_V1',
    flowTextMoments,
    autoFromScript: {
      scriptPath: tmpScript,
      targetWords: 14,
      maxWords: 20,
      semanticSplit: true,
      coverHeadline,
    },
  }, 'auto-planning-qa');

  if (resolved.visualPlanningPolicy !== 'SEMANTIC_OBSERVABLE_VISUALS_V1') failures.push('auto plan must use SEMANTIC_OBSERVABLE_VISUALS_V1');
  if (resolved.visualDirectorPolicy !== 'OBSERVABLE_SCENE_FIRST_V1') failures.push('auto plan must use OBSERVABLE_SCENE_FIRST_V1');
  if (resolved.flowPromptPolicy !== 'NATURAL_FLOW_MASTER_V2') failures.push('auto plan must use NATURAL_FLOW_MASTER_V2');
  if (resolved.socialScenePolicy !== 'SEMANTIC_SOCIAL_DENSITY_V1') failures.push('auto plan must use SEMANTIC_SOCIAL_DENSITY_V1');
  if ('promptContract' in resolved) failures.push('new auto plan must not revive retired promptContract');
  if ('compositionTargets' in resolved) failures.push('new auto plan must not impose composition quotas');
  if (resolved.characterSystem !== 'STYLIZED_STICKMAN_CAST_V2') failures.push('auto plan must preserve STYLIZED_STICKMAN_CAST_V2');
  if (resolved.humanCharacterPolicy !== 'UNIFIED_STICKMAN_HUMANS_V2') failures.push('auto plan must preserve UNIFIED_STICKMAN_HUMANS_V2');
  if (resolved.finalTextPolicy !== 'FLOW_VISIBLE_TEXT_ONLY_V3') failures.push('auto plan must opt into FLOW_VISIBLE_TEXT_ONLY_V3');
  if (resolved.flowTextStylePolicy !== 'CINEMATIC_WORLD_INTEGRATED_V2') failures.push('v2 auto plan must use CINEMATIC_WORLD_INTEGRATED_V2');
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

console.log(`AUTO VISUAL PLANNING QA: PASS — ${scenes.length} scenes, semantic composition/social planning, observable-scene guard active.`);
