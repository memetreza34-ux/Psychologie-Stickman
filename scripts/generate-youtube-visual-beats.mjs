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

const isV2 = raw.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2' || resolved.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
const isPremium = raw.premiumVisualPolicy === 'PREMIUM_EDITORIAL_CINEMATIC_V1' || isV2;
const palette = raw.projectPalette && typeof raw.projectPalette === 'object' ? raw.projectPalette : null;

const premiumCharacterByDensity = {
  solo: 'If a person is used, show the relevant action/reaction with readable posture and gaze; avoid neutral placeholder posing.',
  duo: 'Show an actual two-person interaction with readable gaze, distance, posture and role difference.',
  group: 'Give the group specific visible activities and gaze directions; preserve one dominant social relation instead of generic crowd posing.',
  none: 'NO HUMAN REQUIRED unless human behavior is genuinely needed to explain this beat.',
};

const paletteText = palette
  ? `primary ${String(palette.primary ?? '').trim()}, secondary ${String(palette.secondary ?? '').trim()}, accent ${String(palette.accent ?? '').trim()}, neutral ${String(palette.neutral ?? '').trim()}`
  : 'believable local colors appropriate to the concrete scene';

const inferMoodProfile = (scene) => {
  const text = `${scene.speechSection ?? ''} ${scene.visualIdea ?? ''}`.toLocaleLowerCase('de-DE');
  if (/\b(manipulat|täusch|betrug|kontroll|missbrauch|zwang|einschüchter|grausam|ausnutz|lüg|dehuman)/iu.test(text)) return {moodMode: 'DARK', moodIntensity: 3, powerDynamic: 'DOMINANT_VS_TARGET'};
  if (/\b(macht|autorität|hierarch|domin|status|chef|gehorsam|untergeordnet)/iu.test(text)) return {moodMode: 'POWER', moodIntensity: 2, powerDynamic: /gruppe|menschen|publikum/iu.test(text) ? 'AUTHORITY_VS_GROUP' : 'STATUS_CONTRAST'};
  if (/\b(geld|preis|euro|€|gehalt|kauf|konsum|rabatt|angebot|verhandlung|aktie|anleger|verlust|gewinn|teuer|günstig)/iu.test(text)) return {moodMode: 'MONEY', moodIntensity: 1, powerDynamic: /verhandlung|angebot|gehalt/iu.test(text) ? 'PEER_TO_PEER' : 'NEUTRAL'};
  if (/\b(einsam|allein|isolier|ausgeschlossen|ausgrenz|verlassen|angst|verletzlich|furcht)/iu.test(text)) return {moodMode: 'ISOLATION', moodIntensity: 3, powerDynamic: /gruppe|ausgegrenzt|ausgeschlossen/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'NONE'};
  if (/\b(schutz|lösung|helfen|verhindern|erkennen|gegenmaßnahme|besser|klarheit|ausweg|reduzier)/iu.test(text)) return {moodMode: 'HOPE', moodIntensity: 1, powerDynamic: 'NEUTRAL'};
  if (/\b(druck|unsicher|zweifel|konflikt|kritik|unangenehm|spannung|misstrau|skeptisch|gruppendruck)/iu.test(text)) return {moodMode: 'UNEASY', moodIntensity: 2, powerDynamic: /gruppe|gruppendruck/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'PEER_TO_PEER'};
  if (/\b(gruppe|menschen|andere|publikum|kollegen|freunde|familie)/iu.test(text)) return {moodMode: 'CLEAR', moodIntensity: 1, powerDynamic: 'PEER_TO_PEER'};
  return {moodMode: 'CLEAR', moodIntensity: 0, powerDynamic: 'NEUTRAL'};
};

const normalizeMood = (scene) => {
  const inferred = inferMoodProfile(scene);
  const moodMode = String(scene.moodMode ?? inferred.moodMode).trim().toUpperCase();
  const moodIntensity = Number.isInteger(Number(scene.moodIntensity)) ? Number(scene.moodIntensity) : inferred.moodIntensity;
  const powerDynamic = String(scene.powerDynamic ?? inferred.powerDynamic).trim().toUpperCase();
  return {moodMode, moodIntensity: Math.max(0, Math.min(4, moodIntensity)), powerDynamic};
};

const lightForMood = (mood) => {
  switch (mood.moodMode) {
    case 'DARK': return 'motivated low-key illustrated light with readable spatial depth; no black void and no symbolic glow replacing the action';
    case 'POWER': return 'controlled directional light that supports the visible hierarchy without theatrical symbolism';
    case 'ISOLATION': return 'cooler open light with useful negative space while keeping the actual environment readable';
    case 'HOPE': return 'open natural light with visual breathing room and believable warm relief';
    case 'UNEASY': return 'slightly directional natural/practical light that supports tension while remaining believable';
    case 'MONEY': return 'believable local commercial/financial lighting with controlled contrast; no stock-finance glow clichés';
    default: return 'clear motivated natural/practical light appropriate to the concrete location';
  }
};

const premiumScenes = scenes.map((scene) => {
  if (!isPremium) return scene;

  const mood = isV2 ? normalizeMood(scene) : {};
  const colorDirection = isV2
    ? `Use ${paletteText}; adapt temperature/saturation to ${mood.moodMode} only after the concrete scene is defined. Color must support the visible action, not replace it.`
    : `Use ${paletteText}; keep believable local object colors.`;
  const lightingMood = isV2 ? String(scene.lightingMood ?? lightForMood(mood)) : scene.lightingMood;
  const premiumCharacterDirection = premiumCharacterByDensity[scene.socialDensity] ?? premiumCharacterByDensity.none;
  const cleanedVisualTask = String(scene.visualTask ?? '')
    .replace(/STYLE-\/ANATOMY-MASTER/giu, 'COVER/THUMBNAIL')
    .replace(/SCENE_01_COVER_MASTER/giu, 'SCENE_01_COVER');

  if (!isV2) return {...scene, colorDirection, premiumCharacterDirection};

  const observableEvidence = String(scene.observableEvidence ?? '').trim();
  const literalWarning = String(scene.literalMetaphorWarning ?? 'NONE').trim();

  return {
    ...scene,
    ...mood,
    visualDirectorPolicy: scene.visualDirectorPolicy ?? 'OBSERVABLE_SCENE_FIRST_V1',
    lightingMood,
    colorDirection,
    premiumCharacterDirection,
    visualTask:
      `${cleanedVisualTask} ` +
      `OBSERVABLE-SCENE HARD LOCK: define/show concrete visible evidence before writing the final Flow prompt. ` +
      `${observableEvidence ? `Observable-evidence draft: ${observableEvidence} ` : ''}` +
      `Use posture, gaze, spacing, action, objects and environment to show the behavior; do not let lighting, color or symbolism substitute for the behavior. ` +
      `${literalWarning && literalWarning !== 'NONE' ? `Literal-metaphor guard: ${literalWarning} ` : ''}` +
      `${premiumCharacterDirection} Lighting: ${lightingMood} Color: ${colorDirection}`,
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
  output.humanCharacterPolicy = 'UNIFIED_STICKMAN_HUMANS_V2';
  output.characterPresencePolicy = 'OPTIONAL_HUMANS_MIXED_VISUALS_V1';
  output.moodPolicy = 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1';
  output.environmentPolicy = 'BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2';
  output.renderingPolicy = 'SOFT_CEL_SHADED_FILM_FRAME_V2';
  output.representationPolicy = 'MIXED_HUMAN_BEHAVIOR_VISUALS_V2';
  output.representationVarietyPolicy = 'REPRESENTATION_VARIETY_V1';
  output.visualDirectorPolicy = 'OBSERVABLE_SCENE_FIRST_V1';
  output.flowPromptPolicy = 'NATURAL_FLOW_MASTER_V2';
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
console.log(`Visual director: ${isV2 ? 'OBSERVABLE_SCENE_FIRST_V1' : 'legacy/off'}`);
console.log(`Output: ${absoluteOutput}`);
console.log('Review observableEvidence and dominantRelation for every scene before Phase 2. Split overloaded beats instead of forcing montages.');
