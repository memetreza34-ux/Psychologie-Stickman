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
if (productionPrompts.length === 0) {
  console.log('GOOGLE FLOW PROMPT QA: PASS — no production prompt files found.');
  process.exit(0);
}

const failures = [];
const warnings = [];

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

const detectFamily = (text, families) => {
  for (const [name, pattern] of families) {
    if (pattern.test(text)) return name;
  }
  return null;
};

const dominantFamily = (values) => {
  const counts = new Map();
  for (const value of values.filter(Boolean)) counts.set(value, (counts.get(value) ?? 0) + 1);
  let winner = null;
  let count = 0;
  for (const [value, current] of counts.entries()) {
    if (current > count) {
      winner = value;
      count = current;
    }
  }
  return {winner, count, recognized: values.filter(Boolean).length};
};

for (const promptPath of productionPrompts) {
  const content = fs.readFileSync(promptPath, 'utf8');
  const relative = path.relative(process.cwd(), promptPath);

  if (!/FLOW SOURCE IMAGE TEXT POLICY\s*[—-]\s*ZERO READABLE TEXT/iu.test(content)) {
    failures.push(`${relative}: missing global ZERO READABLE TEXT policy.`);
  }
  if (!/German(?:\s+(?:cover\/keyword|cover|keyword))?\s+labels?.+added later in Remotion/isu.test(content)) {
    failures.push(`${relative}: missing Remotion label handoff rule.`);
  }
  if (/optional\s+(?:single\s+|short\s+)?German\s+(?:label|cue)/iu.test(content)) {
    failures.push(`${relative}: contains optional generated German label instruction.`);
  }
  if (/if\s+(?:one\s+)?labels?\s+are\s+(?:needed|necessary)/iu.test(content)) {
    failures.push(`${relative}: contains conditional generated label instruction.`);
  }

  const referenceClause = content.match(/REFERENCE CLAUSE FOR SCENE 02\+[\s\S]*?(?=^SCENE\s+01\s*$)/imu)?.[0] ?? '';
  if (/character identity/iu.test(referenceClause) && !/NOT\s+(?:AS\s+)?A?\s*character clone/iu.test(referenceClause)) {
    failures.push(`${relative}: master reference clause locks character identity instead of style/anatomy only.`);
  }

  const sceneMatches = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  const sceneNumbers = sceneMatches.map((match) => Number(match[1]));
  if (sceneNumbers.length === 0) {
    failures.push(`${relative}: no SCENE blocks found.`);
    continue;
  }

  sceneNumbers.forEach((sceneNumber, index) => {
    if (sceneNumber !== index + 1) failures.push(`${relative}: scenes are not contiguous at scene ${sceneNumber}.`);
  });

  let cloneLockedScenes = 0;
  let multiPersonScenes = 0;
  const locations = [];
  const cameras = [];
  let deskLikeScenes = 0;

  for (let index = 0; index < sceneMatches.length; index += 1) {
    const start = sceneMatches[index].index ?? 0;
    const end = sceneMatches[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    const sceneNumber = sceneNumbers[index];
    const promptText = block.match(/PROMPT:\s*([\s\S]*)/iu)?.[1] ?? block;

    if (!/ZERO READABLE TEXT/iu.test(block)) {
      failures.push(`${relative}: scene ${sceneNumber} does not explicitly repeat ZERO READABLE TEXT.`);
    }
    if (!/SPEECH CONTEXT\s*[—-]\s*DO NOT RENDER AS TEXT:/iu.test(block)) {
      failures.push(`${relative}: scene ${sceneNumber} lacks protected speech-context marker.`);
    }

    const explicitlySameCharacter = /\b(?:same|exact same)\s+(?:main\s+)?(?:stickman|character|person)\b/iu.test(promptText);
    const localContinuity = /LOCAL CONTINUITY/iu.test(promptText);
    if (explicitlySameCharacter && !localContinuity) cloneLockedScenes += 1;

    if (/\b(?:two|three|four|2|3|4)\s+(?:stickmen|characters|people|participants|coworkers|passengers|friends)\b|\b(?:group|crowd|coworkers|passengers|patrons|participants|friends)\b/iu.test(promptText)) {
      multiPersonScenes += 1;
    }

    if (/\b(home[- ]?office|workspace|desk\b|schreibtisch|arbeitsplatz)\b/iu.test(promptText)) deskLikeScenes += 1;
    locations.push(detectFamily(promptText, locationFamilies));
    cameras.push(detectFamily(promptText, cameraFamilies));
  }

  const maxCloneLockedScenes = Math.max(3, Math.floor(sceneNumbers.length * 0.35));
  if (cloneLockedScenes > maxCloneLockedScenes) {
    failures.push(
      `${relative}: ${cloneLockedScenes}/${sceneNumbers.length} scenes unnecessarily lock the same character. ` +
      `Maximum without explicit LOCAL CONTINUITY is ${maxCloneLockedScenes}. Use the master as style/anatomy reference, not a character clone.`,
    );
  }

  const deskShare = deskLikeScenes / sceneNumbers.length;
  if (sceneNumbers.length >= 10 && deskShare > 0.7) {
    failures.push(`${relative}: ${deskLikeScenes}/${sceneNumbers.length} scenes use desk/workspace imagery. This is too repetitive for a general explainer unless explicitly justified.`);
  } else if (sceneNumbers.length >= 10 && deskShare > 0.5) {
    warnings.push(`${relative}: ${deskLikeScenes}/${sceneNumbers.length} scenes use desk/workspace imagery; review for unnecessary location repetition.`);
  }

  const locationStats = dominantFamily(locations);
  if (locationStats.recognized >= Math.max(6, Math.ceil(sceneNumbers.length * 0.4)) && locationStats.winner) {
    const share = locationStats.count / locationStats.recognized;
    if (share > 0.7) {
      failures.push(`${relative}: recognized location family '${locationStats.winner}' dominates ${locationStats.count}/${locationStats.recognized} classified scenes.`);
    } else if (share > 0.55) {
      warnings.push(`${relative}: recognized location family '${locationStats.winner}' appears in ${locationStats.count}/${locationStats.recognized} classified scenes.`);
    }
  }

  const cameraStats = dominantFamily(cameras);
  if (cameraStats.recognized >= Math.max(6, Math.ceil(sceneNumbers.length * 0.35)) && cameraStats.winner) {
    const share = cameraStats.count / cameraStats.recognized;
    if (share > 0.7) {
      failures.push(`${relative}: camera family '${cameraStats.winner}' dominates ${cameraStats.count}/${cameraStats.recognized} classified scenes.`);
    } else if (share > 0.55) {
      warnings.push(`${relative}: camera family '${cameraStats.winner}' appears in ${cameraStats.count}/${cameraStats.recognized} classified scenes.`);
    }
  }

  if (sceneNumbers.length >= 12 && multiPersonScenes === 0) {
    warnings.push(`${relative}: no clearly multi-person scene detected across ${sceneNumbers.length} scenes. Confirm that an all-solo cast is truly content-driven.`);
  }

  if (!/CAST VARIATION\s*[—-]\s*HARD LOCK/iu.test(content)) {
    warnings.push(`${relative}: no explicit CAST VARIATION hard-lock block; consider adding one for future regeneration.`);
  }

  console.log(
    `${relative}: ${sceneNumbers.length} scenes; ${cloneLockedScenes} non-continuity clone locks; ` +
      `${deskLikeScenes} desk-like scenes; ${multiPersonScenes} multi-person scenes.`,
  );
}

if (warnings.length > 0) {
  console.warn('\nGOOGLE FLOW PROMPT QA: WARNINGS\n');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (failures.length > 0) {
  console.error('\nGOOGLE FLOW PROMPT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('\nGOOGLE FLOW PROMPT QA: PASS\n');
