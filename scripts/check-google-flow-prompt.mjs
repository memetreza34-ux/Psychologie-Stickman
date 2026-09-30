#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const roots = [path.resolve('youtube'), path.resolve('reels')];
const files = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'google-flow-prompt.txt') files.push(full);
  }
};
roots.forEach(walk);

const failures = [];
const warnings = [];
const countWords = (s) => String(s ?? '').trim().split(/\s+/u).filter(Boolean).length;
const mustMatch = (text, regex, message) => { if (!regex.test(text)) failures.push(message); };

const requiredWorkflow = (text, rel) => {
  mustMatch(text, /Never create a storyboard/iu, `${rel}: must explicitly forbid storyboard output.`);
  mustMatch(text, /3 SEPARATE cover candidates|exactly 3 SEPARATE cover candidates/iu, `${rel}: must request 3 separate BILD-01 cover candidates.`);
  mustMatch(text, /wait for the user to choose one cover/iu, `${rel}: must stop for user cover choice.`);
  mustMatch(text, /AFTER THE USER CHOOSES THE COVER/iu, `${rel}: later generation must be gated behind cover approval.`);
  mustMatch(text, /one batch operation|five-image batch operation|five-image batch/iu, `${rel}: must request five-image batch generation.`);
  mustMatch(text, /NN\.png|matching number/iu, `${rel}: must require immediate numbered filenames.`);
  mustMatch(text, /03-bilder\//iu, `${rel}: must collect accepted images in 03-bilder/.`);
  mustMatch(text, /no cover subfolder, no batch subfolders|no batch subfolders/iu, `${rel}: must forbid batch subfolders.`);
};

const requiredGeometricStickman = (text, rel) => {
  mustMatch(text, /GEOMETRIC_STICKMAN_ANATOMY_V1/iu, `${rel}: missing GEOMETRIC_STICKMAN_ANATOMY_V1.`);
  mustMatch(text, /thin (?:normal )?cartoon human|thin cartoon person/iu, `${rel}: missing thin-cartoon-human recognition guard.`);
  mustMatch(text, /ultra-thin[^\n]*(?:line-like|line)[^\n]*(?:arms|limbs)|arms[^\n]*ultra-thin/iu, `${rel}: missing line-like arm geometry.`);
  mustMatch(text, /NO thighs|no thighs|thighs\/calves|no thigh/iu, `${rel}: missing anti-human leg-volume rule.`);
  mustMatch(text, /BACKGROUND PEOPLE|background people/iu, `${rel}: missing background-person anatomy lock.`);
};

const templatePath = path.resolve('youtube/00-vorlage/thema-vorlage/02-google-flow/google-flow-prompt.txt');
if (!fs.existsSync(templatePath)) failures.push('YouTube Flow template is missing.');
else {
  const template = fs.readFileSync(templatePath, 'utf8');
  mustMatch(template, /CINEMATIC_HUMAN_BEHAVIOR_V2/iu, 'YouTube Flow template must use CINEMATIC_HUMAN_BEHAVIOR_V2.');
  mustMatch(template, /FINAL_SEPARATE_IMAGE_ASSETS_V2/iu, 'YouTube Flow template must use FINAL_SEPARATE_IMAGE_ASSETS_V2.');
  mustMatch(template, /NATURAL_FLOW_MASTER_V2/iu, 'YouTube Flow template must use NATURAL_FLOW_MASTER_V2.');
  mustMatch(template, /OBSERVABLE_SCENE_FIRST_V1/iu, 'YouTube Flow template must use OBSERVABLE_SCENE_FIRST_V1.');
  mustMatch(template, /PROMPTING RULE/iu, 'YouTube Flow template lacks PROMPTING RULE.');
  mustMatch(template, /concrete visible|observable evidence|visible action/iu, 'YouTube Flow template must require concrete observable scene direction.');
  mustMatch(template, /Spotlight-Effekt|effect names|literalize/iu, 'YouTube Flow template must contain the do-not-literalize rule.');
  mustMatch(template, /same illustrator|SAME illustrator/iu, 'YouTube Flow template must keep one same-illustrator visual world.');
  mustMatch(template, /cute\/chibi\/mascot/iu, 'YouTube Flow template must guard against cute/chibi/mascot drift.');
  mustMatch(template, /^BILD\s+01\s*$/gimu, 'YouTube Flow template must use natural BILD 01 blocks.');
  requiredGeometricStickman(template, 'YouTube Flow template');
  requiredWorkflow(template, 'YouTube Flow template');
}

const forbiddenNaturalLabels = [
  'SCENE TYPE:', 'SOCIAL DENSITY:', 'VISUAL IDEA:', 'VISUAL TASK:', 'POWER DYNAMIC:',
  'CHARACTER DIRECTION:', 'LIGHTING MOOD:', 'PLANNED GERMAN TEXT:', 'SPEECH CONTEXT'
];

for (const file of files.filter((p) => !p.split(path.sep).includes('00-vorlage'))) {
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  const naturalV2 = /NATURAL_FLOW_MASTER_V2/iu.test(text);
  const naturalV1 = /NATURAL_FLOW_MASTER_V1/iu.test(text);
  const geometricV1 = /GEOMETRIC_STICKMAN_ANATOMY_V1/iu.test(text);

  if (naturalV2 || naturalV1) {
    const images = [...text.matchAll(/^BILD\s+(\d+)\s*$/gimu)];
    if (!images.length) {
      failures.push(`${rel}: natural Flow prompt has no BILD blocks.`);
      continue;
    }
    images.forEach((m, i) => {
      if (Number(m[1]) !== i + 1) failures.push(`${rel}: BILD blocks must be contiguous from 01.`);
    });

    mustMatch(text, /TASK\s*\/\s*OUTPUT/iu, `${rel}: natural Flow prompt lacks TASK / OUTPUT.`);
    mustMatch(text, /CHANNEL VISUAL WORLD/iu, `${rel}: natural Flow prompt lacks CHANNEL VISUAL WORLD.`);
    mustMatch(text, /CHARACTER\s*\+\s*REFERENCE SYSTEM/iu, `${rel}: natural Flow prompt lacks CHARACTER + REFERENCE SYSTEM.`);
    mustMatch(text, /VIDEO WORLD LOCK/iu, `${rel}: natural Flow prompt lacks VIDEO WORLD LOCK.`);
    mustMatch(text, /GENERATION WORKFLOW/iu, `${rel}: natural Flow prompt lacks GENERATION WORKFLOW.`);
    mustMatch(text, /GLOBAL TEXT RULE/iu, `${rel}: natural Flow prompt lacks GLOBAL TEXT RULE.`);
    requiredWorkflow(text, rel);

    forbiddenNaturalLabels.forEach((label) => {
      if (text.includes(label)) failures.push(`${rel}: natural Flow prompt must keep '${label}' in 99-intern planning, not final BILD blocks.`);
    });

    if (naturalV2) {
      mustMatch(text, /OBSERVABLE_SCENE_FIRST_V1/iu, `${rel}: V2 prompt missing OBSERVABLE_SCENE_FIRST_V1.`);
      mustMatch(text, /PROMPTING RULE/iu, `${rel}: V2 prompt missing PROMPTING RULE.`);
      mustMatch(text, /concrete visible|observable evidence|visible action/iu, `${rel}: V2 prompt lacks observable-scene instruction.`);
      if (/FLOW_SCENE_PROMPT_CONTRACT_V1/iu.test(text)) failures.push(`${rel}: retired FLOW_SCENE_PROMPT_CONTRACT_V1 appears in V2 prompt.`);
      if (geometricV1) requiredGeometricStickman(text, rel);
      else warnings.push(`${rel}: pre-GEOMETRIC_STICKMAN_ANATOMY_V1 V2 prompt retained; future projects must use the geometric lock.`);
    } else {
      warnings.push(`${rel}: historical NATURAL_FLOW_MASTER_V1 retained; future projects use V2.`);
    }

    for (let i = 0; i < images.length; i += 1) {
      const start = images[i].index ?? 0;
      const nextIndex = images[i + 1]?.index;
      const finalQaIndex = text.indexOf('\nFINAL QA', start);
      const blockEnd = Number.isInteger(nextIndex) ? nextIndex : finalQaIndex > -1 ? finalQaIndex : text.length;
      const block = text.slice(start, blockEnd);
      const n = Number(images[i][1]);
      if (block.trim().split(/\s+/u).length < 20) warnings.push(`${rel}: BILD ${n} is unusually short.`);
      const hasExactText = /Render exactly|Integrate exactly|render exactly|integrate exactly/iu.test(block);
      const forbidsExtraText = /No visible text|No other readable text|ZERO READABLE TEXT/iu.test(block);
      if (!hasExactText && !forbidsExtraText) warnings.push(`${rel}: BILD ${n} should explicitly prevent accidental readable text.`);
      if (hasExactText && !/No other readable text|only readable text/iu.test(block)) warnings.push(`${rel}: BILD ${n} should forbid extra readable text.`);
      if (n === 1) {
        const quoted = block.match(/Render exactly:\s*["“]([^"”\n]+)["”]/iu)?.[1];
        if (quoted && (countWords(quoted) < 2 || countWords(quoted) > 7)) failures.push(`${rel}: BILD 01 cover title must be 2-7 words.`);
      }
    }
    continue;
  }

  const scenes = [...text.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  if (!scenes.length) warnings.push(`${rel}: legacy prompt has no recognized SCENE/BILD blocks.`);
}

if (warnings.length) {
  console.warn('\nGOOGLE FLOW PROMPT QA: WARNINGS\n');
  warnings.forEach((x) => console.warn(`- ${x}`));
}
if (failures.length) {
  console.error('\nGOOGLE FLOW PROMPT QA: FAIL\n');
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log('\nGOOGLE FLOW PROMPT QA: PASS\n');
