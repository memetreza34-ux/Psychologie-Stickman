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

  const sceneMatches = [...content.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  const sceneNumbers = sceneMatches.map((match) => Number(match[1]));
  if (sceneNumbers.length === 0) {
    failures.push(`${relative}: no SCENE blocks found.`);
    continue;
  }

  sceneNumbers.forEach((sceneNumber, index) => {
    if (sceneNumber !== index + 1) failures.push(`${relative}: scenes are not contiguous at scene ${sceneNumber}.`);
  });

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
  }

  console.log(`${relative}: ${sceneNumbers.length} scene prompts checked.`);
}

if (failures.length > 0) {
  console.error('\nGOOGLE FLOW PROMPT QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('\nGOOGLE FLOW PROMPT QA: PASS\n');
