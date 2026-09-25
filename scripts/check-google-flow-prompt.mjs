#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const roots = [path.resolve('youtube'), path.resolve('reels')];
const promptFiles = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'google-flow-prompt.txt') promptFiles.push(full);
  }
};
roots.forEach(walk);

const productionPrompts = promptFiles.filter((promptPath) => !promptPath.split(path.sep).includes('00-vorlage'));
if (!productionPrompts.length) {
  console.log('GOOGLE FLOW PROMPT QA: PASS — no production prompt files found.');
  process.exit(0);
}

const failures = [];
const warnings = [];
const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

const locationFamilies = [
  ['public-transport', /\b(train|tram|bus|subway|metro|commuter|public transport|bahn|zug|öpnv)\b/iu],
  ['cafe', /\b(cafe|café|coffee shop)\b/iu],
  ['kitchen', /\b(kitchen|countertop|dining table|küche)\b/iu],
  ['library-school', /\b(library|classroom|school|university|campus|bibliothek|schule)\b/iu],
  ['office', /\b(shared office|office worker|office desk|coworker|coworkers|büro)\b/iu],
  ['living-room-home', /\b(living-room|living room|sofa|armchair|bedroom|wohnzimmer|schlafzimmer)\b/iu],
  ['lab-research', /\b(laboratory|research room|experiment station|lab\b|forschungsraum|labor\b)\b/iu],
  ['street-outdoor', /\b(street|sidewalk|park|outdoor|city square|straße|park\b)\b/iu],
  ['shop', /\b(shop|store|supermarket|checkout|laden|supermarkt)\b/iu],
  ['generic-desk', /\b(home[- ]?office|workspace|desk\b|schreibtisch|arbeitsplatz)\b/iu],
];
const cameraFamilies = [
  ['over-shoulder', /\b(over[- ]the[- ]shoulder|over shoulder)\b/iu],
  ['close', /\b(close-up|close up|close-medium|close medium|tight framing)\b/iu],
  ['wide', /\b(wide shot|wide environmental|environmental shot|wide composition)\b/iu],
  ['low-high-angle', /\b(low angle|high angle|lower camera angle|higher camera angle)\b/iu],
  ['side-angle', /\b(side angle|side-angle|side view|profile angle)\b/iu],
  ['three-quarter', /\b(three-quarter|three quarter|3\/4)\b/iu],
  ['top-down', /\b(top-down|top down|overhead shot)\b/iu],
  ['medium', /\b(medium shot|medium-wide|medium wide)\b/iu],
];
const detectFamily = (text, families) => families.find(([, pattern]) => pattern.test(text))?.[0] ?? null;
const dominantFamily = (values) => {
  const counts = new Map();
  for (const value of values.filter(Boolean)) counts.set(value, (counts.get(value) ?? 0) + 1);
  let winner = null;
  let count = 0;
  for (const [value, current] of counts.entries()) if (current > count) { winner = value; count = current; }
  return {winner, count, recognized: values.filter(Boolean).length};
};

for (const promptPath of productionPrompts) {
  const content = fs.readFileSync(promptPath, 'utf8');
  const relative = path.relative(process.cwd(), promptPath);
  const flowOnlyV3 = /VISIBLE TEXT\s*[—-]\s*GOOGLE FLOW ONLY/iu.test(content) || /FLOW VISIBLE TEXT POLICY/iu.test(content) || /FLOW_VISIBLE_TEXT_ONLY_V3/iu.test(content);

  if (flowOnlyV3) {
    if (/added later in Remotion|Remotion keyword|Remotion overlay|Remotion headline/iu.test(content)) failures.push(`${relative}: V3 prompt still delegates visible text to Remotion.`);
    if (!/NO REMOTION TEXT|Remotion (?:MUST NOT|does not|must not) (?:add|render|create) visible text/iu.test(content)) warnings.push(`${relative}: V3 prompt should explicitly say that Remotion adds no visible text.`);
  } else {
    warnings.push(`${relative}: legacy text policy. New prompts must use Flow-only visible text.`);
  }

  const referenceClause = content.match(/REFERENCE CLAUSE FOR SCENE 02\+[\s\S]*?(?=^SCENE\s+01\s*$)/imu)?.[0] ?? '';
  if (/character identity/iu.test(referenceClause) && !/NOT\s+(?:AS\s+)?A?\s*character clone/iu.test(referenceClause)) failures.push(`${relative}: master reference clause locks character identity.`);
  if (flowOnlyV3 && !/do not copy|do not recreate|nicht kopieren/iu.test(referenceClause)) warnings.push(`${relative}: Scene-02+ clause should forbid copying text from 01.png.`);

  const sceneMatches = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  const sceneNumbers = sceneMatches.map((match) => Number(match[1]));
  if (!sceneNumbers.length) {
    failures.push(`${relative}: no SCENE blocks found.`);
    continue;
  }
  sceneNumbers.forEach((sceneNumber, index) => { if (sceneNumber !== index + 1) failures.push(`${relative}: scenes not contiguous at ${sceneNumber}.`); });

  let cloneLockedScenes = 0;
  let multiPersonScenes = 0;
  let deskLikeScenes = 0;
  let textMoments = 0;
  let coverTextMoments = 0;
  const locations = [];
  const cameras = [];

  for (let index = 0; index < sceneMatches.length; index += 1) {
    const start = sceneMatches[index].index ?? 0;
    const end = sceneMatches[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    const sceneNumber = sceneNumbers[index];
    const promptText = block.match(/PROMPT:\s*([\s\S]*)/iu)?.[1] ?? block;
    const exactTextMatch = block.match(/EXACT GERMAN (?:COVER TITLE|TEXT)\s*:\s*["“]([^"”\n]+)["”]/iu);

    if (flowOnlyV3) {
      if (exactTextMatch) {
        textMoments += 1;
        const exactText = exactTextMatch[1].trim();
        const wordCount = countWords(exactText);
        if (sceneNumber === 1) {
          coverTextMoments += 1;
          if (wordCount < 2 || wordCount > 7) failures.push(`${relative}: scene 1 cover text must contain 2-7 words.`);
        } else if (wordCount < 1 || wordCount > 5) failures.push(`${relative}: scene ${sceneNumber} Flow keyword must contain 1-5 words.`);
        if (!block.includes(exactText)) failures.push(`${relative}: scene ${sceneNumber} does not repeat its exact German text.`);
        if (!/NO OTHER READABLE TEXT/iu.test(block)) failures.push(`${relative}: scene ${sceneNumber} text moment must forbid all other readable text.`);
        if (/ZERO READABLE TEXT/iu.test(block)) failures.push(`${relative}: scene ${sceneNumber} has contradictory ZERO READABLE TEXT despite exact Flow text.`);
      } else if (!/ZERO READABLE TEXT/iu.test(block)) {
        failures.push(`${relative}: scene ${sceneNumber} must be ZERO READABLE TEXT unless exact Flow text is specified.`);
      }
    }

    if (!/SPEECH CONTEXT\s*[—-]\s*DO NOT RENDER AS TEXT:/iu.test(block)) failures.push(`${relative}: scene ${sceneNumber} lacks protected speech-context marker.`);
    const explicitlySameCharacter = /\b(?:same|exact same)\s+(?:main\s+)?(?:stickman|character|person)\b/iu.test(promptText);
    const localContinuity = /LOCAL CONTINUITY/iu.test(promptText);
    if (explicitlySameCharacter && !localContinuity) cloneLockedScenes += 1;
    if (/\b(?:two|three|four|2|3|4)\s+(?:stickmen|characters|people|participants|coworkers|passengers|friends)\b|\b(?:group|crowd|coworkers|passengers|patrons|participants|friends)\b/iu.test(promptText)) multiPersonScenes += 1;
    if (/\b(home[- ]?office|workspace|desk\b|schreibtisch|arbeitsplatz)\b/iu.test(promptText)) deskLikeScenes += 1;
    locations.push(detectFamily(promptText, locationFamilies));
    cameras.push(detectFamily(promptText, cameraFamilies));
  }

  if (flowOnlyV3) {
    if (coverTextMoments !== 1) failures.push(`${relative}: Flow-only V3 requires exactly one Scene-01 cover text moment.`);
    const maxTextMoments = Math.max(1, Math.ceil(sceneNumbers.length * 0.3));
    if (textMoments > maxTextMoments) failures.push(`${relative}: ${textMoments}/${sceneNumbers.length} Flow text moments exceed 30% (${maxTextMoments}).`);
  }

  const maxCloneLockedScenes = Math.max(3, Math.floor(sceneNumbers.length * 0.35));
  if (cloneLockedScenes > maxCloneLockedScenes) failures.push(`${relative}: ${cloneLockedScenes}/${sceneNumbers.length} scenes unnecessarily lock same character.`);
  const deskShare = deskLikeScenes / sceneNumbers.length;
  if (sceneNumbers.length >= 10 && deskShare > 0.7) failures.push(`${relative}: ${deskLikeScenes}/${sceneNumbers.length} desk/workspace scenes.`);
  else if (sceneNumbers.length >= 10 && deskShare > 0.5) warnings.push(`${relative}: ${deskLikeScenes}/${sceneNumbers.length} desk/workspace scenes; review repetition.`);

  for (const [label, stats] of [['location', dominantFamily(locations)], ['camera', dominantFamily(cameras)]]) {
    if (stats.recognized >= Math.max(6, Math.ceil(sceneNumbers.length * (label === 'location' ? 0.4 : 0.35))) && stats.winner) {
      const share = stats.count / stats.recognized;
      if (share > 0.7) failures.push(`${relative}: ${label} family '${stats.winner}' dominates ${stats.count}/${stats.recognized}.`);
      else if (share > 0.55) warnings.push(`${relative}: ${label} family '${stats.winner}' appears in ${stats.count}/${stats.recognized}.`);
    }
  }

  if (sceneNumbers.length >= 12 && multiPersonScenes === 0) warnings.push(`${relative}: no clearly multi-person scene across ${sceneNumbers.length} scenes.`);
  if (!/CAST VARIATION\s*[—-]\s*HARD LOCK/iu.test(content)) warnings.push(`${relative}: no CAST VARIATION hard-lock block.`);
  console.log(`${relative}: ${sceneNumbers.length} scenes; ${textMoments} Flow text moments; ${cloneLockedScenes} clone locks; ${deskLikeScenes} desk-like; ${multiPersonScenes} multi-person.`);
}

if (warnings.length) {
  console.warn('\nGOOGLE FLOW PROMPT QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
if (failures.length) {
  console.error('\nGOOGLE FLOW PROMPT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nGOOGLE FLOW PROMPT QA: PASS\n');
