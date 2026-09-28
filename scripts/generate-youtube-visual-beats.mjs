#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {countWords, resolvePhase1Plan} from './lib/youtube-visual-beats.mjs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error('Usage: npm run materialize:phase1 -- <phase1-scenes.json> <phase1-scenes.generated.json>');
  process.exit(1);
}

const absoluteInput = path.resolve(inputPath);
const absoluteOutput = path.resolve(outputPath);
const raw = JSON.parse(fs.readFileSync(absoluteInput, 'utf8'));
const resolved = resolvePhase1Plan(raw, absoluteInput);
const scenes = Array.isArray(resolved.scenes) ? resolved.scenes : [];

if (scenes.length === 0) throw new Error('No scenes were resolved.');

const isV2 = raw.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const isPremium = raw.premiumVisualPolicy === 'PREMIUM_EDITORIAL_CINEMATIC_V1' || isV2;
const palette = raw.projectPalette && typeof raw.projectPalette === 'object' ? raw.projectPalette : null;

const lightPatterns = [
  'clear motivated light with the focal subject carrying the strongest useful contrast',
  'soft directional light with a slightly warmer focal zone and calmer background',
  'controlled practical lighting with one deliberate accent-color focal point',
  'open editorial daylight with crisp color separation and no grey wash',
  'moodier directional contrast while preserving spatial readability',
  'balanced neutral light with one controlled accent guiding the eye',
];

const premiumCharacterByDensity = {
  solo: 'Give the main Stickman a strong readable posture, role-specific simplified outfit, clear minimal emotion and one meaningful prop or interaction only when useful. Avoid neutral placeholder posing.',
  duo: 'Give both Stickmen distinct roles and contrasting readable poses. Show actual interaction/reaction, hierarchy or distance instead of two figures merely standing beside each other.',
  group: 'Create a clear social hierarchy with varied role-specific clothing, readable reactions and meaningful interaction. Keep one dominant focal figure or relation.',
  none: 'NO HUMAN REQUIRED unless a person is semantically necessary for this beat.',
};

const paletteText = palette
  ? `primary ${String(palette.primary ?? '').trim()}, secondary ${String(palette.secondary ?? '').trim()}, accent ${String(palette.accent ?? '').trim()}, neutral ${String(palette.neutral ?? '').trim()}`
  : 'controlled local colors appropriate to the planned mood';

const inferMoodProfile = (scene) => {
  const text = `${scene.speechSection ?? ''} ${scene.visualIdea ?? ''} ${scene.visualTask ?? ''}`.toLocaleLowerCase('de-DE');

  if (/\b(manipulat|täusch|betrug|kontroll|missbrauch|coerc|zwang|einschüchter|grausam|ausnutz|lüg|dehuman)/iu.test(text)) {
    return {moodMode: 'DARK', moodIntensity: 3, powerDynamic: 'DOMINANT_VS_TARGET'};
  }
  if (/\b(macht|autorität|hierarch|domin|status|chef|gehorsam|untergeordnet)/iu.test(text)) {
    return {moodMode: 'POWER', moodIntensity: 2, powerDynamic: /gruppe|menschen|publikum/iu.test(text) ? 'AUTHORITY_VS_GROUP' : 'STATUS_CONTRAST'};
  }
  if (/\b(geld|preis|euro|€|gehalt|kauf|konsum|rabatt|angebot|verhandlung|aktie|anleger|verlust|gewinn|teuer|günstig)/iu.test(text)) {
    return {moodMode: 'MONEY', moodIntensity: 1, powerDynamic: /verhandlung|angebot|gehalt/iu.test(text) ? 'PEER_TO_PEER' : 'NEUTRAL'};
  }
  if (/\b(einsam|allein|isolier|ausgeschlossen|ausgrenz|verlassen|angst|verletzlich|furcht)/iu.test(text)) {
    return {moodMode: 'ISOLATION', moodIntensity: 3, powerDynamic: /gruppe|ausgegrenzt|ausgeschlossen/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'NONE'};
  }
  if (/\b(schutz|lösung|helfen|verhindern|erkennen|gegenmaßnahme|besser|klarheit|ausweg|reduzier)/iu.test(text)) {
    return {moodMode: 'HOPE', moodIntensity: 1, powerDynamic: 'NEUTRAL'};
  }
  if (/\b(druck|unsicher|zweifel|konflikt|kritik|unangenehm|spannung|misstrau|skeptisch|gruppendruck)/iu.test(text)) {
    return {moodMode: 'UNEASY', moodIntensity: 2, powerDynamic: /gruppe|gruppendruck/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'PEER_TO_PEER'};
  }
  if (/\b(gruppe|menschen|andere|publikum|kollegen|freunde|familie)/iu.test(text)) {
    return {moodMode: 'CLEAR', moodIntensity: 1, powerDynamic: 'PEER_TO_PEER'};
  }
  return {moodMode: 'CLEAR', moodIntensity: 0, powerDynamic: 'NEUTRAL'};
};

const normalizeMood = (scene) => {
  const inferred = inferMoodProfile(scene);
  const moodMode = String(scene.moodMode ?? inferred.moodMode).trim().toUpperCase();
  const moodIntensity = Number.isInteger(Number(scene.moodIntensity)) ? Number(scene.moodIntensity) : inferred.moodIntensity;
  const powerDynamic = String(scene.powerDynamic ?? inferred.powerDynamic).trim().toUpperCase();
  return {
    moodMode,
    moodIntensity: Math.max(0, Math.min(4, moodIntensity)),
    powerDynamic,
  };
};

const premiumScenes = scenes.map((scene, index) => {
  if (!isPremium) return scene;

  const mood = isV2 ? normalizeMood(scene) : {};
  const colorDirection = isV2
    ? `COLOR: Use ${paletteText}. Adapt saturation and temperature to ${mood.moodMode} at intensity ${mood.moodIntensity}; keep believable local object colors and avoid grey/beige monotony.`
    : `COLOR DIRECTION: Use ${paletteText}; ${lightPatterns[index % lightPatterns.length]}. Keep believable local object colors and avoid grey/beige monotony.`;

  const lightingMood = isV2
    ? String(scene.lightingMood ?? `Motivated cinematic 2D light for ${mood.moodMode} mood at intensity ${mood.moodIntensity}; ${lightPatterns[index % lightPatterns.length]}. Dark scenes retain believable spatial depth.`)
    : scene.lightingMood;

  const premiumCharacterDirection = premiumCharacterByDensity[scene.socialDensity] ?? premiumCharacterByDensity.solo;
  const cleanedVisualTask = String(scene.visualTask ?? '')
    .replace(/STYLE-\/ANATOMY-MASTER/giu, 'COVER/THUMBNAIL')
    .replace(/SCENE_01_COVER_MASTER/giu, 'SCENE_01_COVER');

  if (!isV2) {
    return {
      ...scene,
      colorDirection,
      premiumCharacterDirection,
      visualTask: `${cleanedVisualTask} PREMIUM VISUAL HARD LOCK: premium modern editorial 2D quality, rich believable environment, purposeful lighting and depth, real-life scene before teaching graphic where possible. ${colorDirection} ${premiumCharacterDirection}`,
    };
  }

  return {
    ...scene,
    ...mood,
    lightingMood,
    colorDirection,
    premiumCharacterDirection,
    promptContract: 'FLOW_SCENE_PROMPT_CONTRACT_V1',
    visualTask:
      `${cleanedVisualTask} ` +
      `V2 WORLD HARD LOCK: CINEMATIC_HUMAN_BEHAVIOR_V2 with STYLIZED_STICKMAN_CAST_V2. ` +
      `MOOD HARD LOCK: ${mood.moodMode}, intensity ${mood.moodIntensity}, power dynamic ${mood.powerDynamic}. ` +
      `Communicate psychology through posture, blocking, camera, environment, negative space, motivated light and controlled color; do not change illustration family. ` +
      `${colorDirection} ${premiumCharacterDirection}`,
  };
});

const output = {...resolved, scenes: premiumScenes};
if (isPremium) {
  output.premiumVisualPolicy = raw.premiumVisualPolicy ?? 'PREMIUM_EDITORIAL_CINEMATIC_V1';
  output.colorStoryPolicy = raw.colorStoryPolicy;
  output.projectPalette = raw.projectPalette;
  output.scriptHookPolicy = raw.scriptHookPolicy;
  output.hookType = raw.hookType;
  output.coreConceptTerm = raw.coreConceptTerm;
  output.coreConceptIntroducedByScene = raw.coreConceptIntroducedByScene;
  output.realLifeExampleByScene = raw.realLifeExampleByScene;
  output.realLifeExampleSummary = raw.realLifeExampleSummary;
}
if (isV2) {
  output.visualSystem = 'CINEMATIC_HUMAN_BEHAVIOR_V2';
  output.characterSystem = 'STYLIZED_STICKMAN_CAST_V2';
  output.moodPolicy = 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1';
  output.promptContract = 'FLOW_SCENE_PROMPT_CONTRACT_V1';
  output.environmentPolicy = 'BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2';
  output.renderingPolicy = 'SOFT_CEL_SHADED_FILM_FRAME_V2';
  output.representationPolicy = 'MIXED_HUMAN_BEHAVIOR_VISUALS_V2';
}
delete output.autoFromScript;
delete output.resolvedFromScript;

fs.mkdirSync(path.dirname(absoluteOutput), {recursive: true});
fs.writeFileSync(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

const words = premiumScenes.reduce((sum, scene) => sum + countWords(scene.speechSection), 0);
console.log('YOUTUBE VISUAL BEATS MATERIALIZED');
console.log(`Scenes: ${premiumScenes.length}`);
console.log(`Spoken words: ${words}`);
console.log(`Average words/scene: ${(words / premiumScenes.length).toFixed(1)}`);
console.log(`Visual system: ${isV2 ? 'CINEMATIC_HUMAN_BEHAVIOR_V2' : 'legacy'}`);
console.log(`Mood planning: ${isV2 ? 'ON' : 'legacy/off'}`);
console.log(`Output: ${absoluteOutput}`);
console.log('Review every visualTask before Phase 2. Do not merge beats merely to reduce image count.');
