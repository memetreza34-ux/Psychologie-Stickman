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

for (const promptPath of productionPrompts) {
  const content = fs.readFileSync(promptPath, 'utf8');
  const relative = path.relative(process.cwd(), promptPath);

  if (!/FLOW SOURCE IMAGE TEXT POLICY\s*[—-]\s*ZERO READABLE TEXT/iu.test(content)) {
    failures.push(`${relative}: missing global ZERO READABLE TEXT policy.`);
  }
  if (!/German labels.+added later in Remotion/isu.test(content)) {
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

  for (let index = 0; index < sceneMatches.length; index += 1) {
    const start = sceneMatches[index].index ?? 0;
    const end = sceneMatches[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    const sceneNumber = sceneNumbers[index];
    if (!/ZERO READABLE TEXT/iu.test(block)) {
      failures.push(`${relative}: scene ${sceneNumber} does not explicitly repeat ZERO READABLE TEXT.`);
    }
    if (!/SPEECH CONTEXT\s*[—-]\s*DO NOT RENDER AS TEXT:/iu.test(block)) {
      failures.push(`${relative}: scene ${sceneNumber} lacks protected speech-context marker.`);
    }

    const explicitlySameCharacter = /\b(?:same|exact same)\s+(?:main\s+)?(?:stickman|character|person)\b/iu.test(block);
    const localContinuity = /LOCAL CONTINUITY/iu.test(block);
    if (explicitlySameCharacter && !localContinuity) cloneLockedScenes += 1;
  }

  const maxCloneLockedScenes = Math.max(3, Math.floor(sceneNumbers.length * 0.35));
  if (cloneLockedScenes > maxCloneLockedScenes) {
    failures.push(
      `${relative}: ${cloneLockedScenes}/${sceneNumbers.length} scenes unnecessarily lock the same character. ` +
      `Maximum without explicit LOCAL CONTINUITY is ${maxCloneLockedScenes}. Use the master as style/anatomy reference, not a character clone.`,
    );
  }

  if (!/CAST VARIATION\s*[—-]\s*HARD LOCK/iu.test(content)) {
    warnings.push(`${relative}: no explicit CAST VARIATION hard-lock block; consider adding one for future regeneration.`);
  }

  console.log(`${relative}: ${sceneNumbers.length} scene prompts checked; ${cloneLockedScenes} non-continuity clone-locked scenes.`);
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
