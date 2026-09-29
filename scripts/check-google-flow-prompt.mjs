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

const mustMatch = (text, regex, message) => {
  if (!regex.test(text)) failures.push(message);
};

const templatePath = path.resolve('youtube/00-vorlage/thema-vorlage/02-google-flow/google-flow-prompt.txt');
if (!fs.existsSync(templatePath)) {
  failures.push('YouTube Flow template is missing.');
} else {
  const template = fs.readFileSync(templatePath, 'utf8');
  mustMatch(template, /CINEMATIC_HUMAN_BEHAVIOR_V2/iu, 'YouTube Flow template must use CINEMATIC_HUMAN_BEHAVIOR_V2.');
  mustMatch(template, /FINAL_SEPARATE_IMAGE_ASSETS_V2/iu, 'YouTube Flow template must use FINAL_SEPARATE_IMAGE_ASSETS_V2.');
  mustMatch(template, /NATURAL_FLOW_MASTER_V1/iu, 'YouTube Flow template must use NATURAL_FLOW_MASTER_V1.');
  mustMatch(template, /TASK\s*\/\s*OUTPUT/iu, 'YouTube Flow template lacks TASK / OUTPUT.');
  mustMatch(template, /CHANNEL VISUAL WORLD/iu, 'YouTube Flow template lacks CHANNEL VISUAL WORLD.');
  mustMatch(template, /CHARACTER\s*\+\s*REFERENCE SYSTEM/iu, 'YouTube Flow template lacks CHARACTER + REFERENCE SYSTEM.');
  mustMatch(template, /VIDEO WORLD LOCK/iu, 'YouTube Flow template lacks VIDEO WORLD LOCK.');
  mustMatch(template, /GENERATION WORKFLOW/iu, 'YouTube Flow template lacks GENERATION WORKFLOW.');
  mustMatch(template, /GLOBAL TEXT RULE/iu, 'YouTube Flow template lacks GLOBAL TEXT RULE.');
  mustMatch(template, /same illustrator|SAME illustrator/iu, 'YouTube Flow template must keep one same-illustrator visual world.');
  mustMatch(template, /Never create a storyboard/iu, 'YouTube Flow template must explicitly forbid storyboard output.');
  mustMatch(template, /3 SEPARATE cover candidates|exactly 3 SEPARATE cover candidates/iu, 'YouTube Flow template must request 3 separate BILD-01 cover candidates.');
  mustMatch(template, /wait for the user to choose one cover/iu, 'YouTube Flow template must stop for user cover choice.');
  mustMatch(template, /AFTER THE USER CHOOSES THE COVER/iu, 'YouTube Flow template must gate regular generation behind cover approval.');
  mustMatch(template, /EXACTLY 5 image numbers|five-image batch/iu, 'YouTube Flow template must use five-image regular batches.');
  mustMatch(template, /one batch operation\/turn|one batch operation|one five-image batch/iu, 'YouTube Flow template must request batch generation rather than deliberate one-by-one generation.');
  mustMatch(template, /NN\.png/iu, 'YouTube Flow template must require immediate NN.png naming.');
  mustMatch(template, /03-bilder\//iu, 'YouTube Flow template must collect accepted images in 03-bilder/.');
  mustMatch(template, /no cover subfolder, no batch subfolders|no batch subfolders/iu, 'YouTube Flow template must forbid batch subfolders.');
  mustMatch(template, /cute\/chibi\/mascot/iu, 'YouTube Flow template must guard against cute/chibi/mascot drift.');
  mustMatch(template, /^BILD\s+01\s*$/gimu, 'YouTube Flow template must use natural BILD 01 blocks.');
}

const forbiddenNaturalLabels = [
  'SCENE TYPE:',
  'SOCIAL DENSITY:',
  'VISUAL IDEA:',
  'VISUAL TASK:',
  'POWER DYNAMIC:',
  'CHARACTER DIRECTION:',
  'LIGHTING MOOD:',
  'PLANNED GERMAN TEXT:',
  'SPEECH CONTEXT'
];

for (const file of files.filter((p) => !p.split(path.sep).includes('00-vorlage'))) {
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  const isHumanBehaviorV2 = /CINEMATIC_HUMAN_BEHAVIOR_V2/iu.test(text);
  const isFlowOutputV2 = /FINAL_SEPARATE_IMAGE_ASSETS_V2/iu.test(text);
  const isNaturalFlow = /NATURAL_FLOW_MASTER_V1/iu.test(text);

  if (isNaturalFlow) {
    const images = [...text.matchAll(/^BILD\s+(\d+)\s*$/gimu)];
    if (!images.length) {
      failures.push(`${rel}: NATURAL_FLOW_MASTER_V1 has no BILD blocks.`);
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
    mustMatch(text, /Never create a storyboard/iu, `${rel}: natural Flow prompt must forbid storyboard output.`);
    mustMatch(text, /3 SEPARATE cover candidates|exactly 3 SEPARATE cover candidates/iu, `${rel}: natural Flow prompt must request 3 separate BILD-01 cover candidates.`);
    mustMatch(text, /wait for the user to choose one cover/iu, `${rel}: natural Flow prompt must stop for user cover choice.`);
    mustMatch(text, /AFTER THE USER CHOOSES THE COVER/iu, `${rel}: natural Flow prompt must gate later generation behind cover approval.`);
    mustMatch(text, /one batch operation|five-image batch operation|five-image batch/iu, `${rel}: natural Flow prompt must request five-image batch generation.`);
    mustMatch(text, /NN\.png|matching number/iu, `${rel}: natural Flow prompt must require immediate numbered filenames.`);
    mustMatch(text, /03-bilder\//iu, `${rel}: natural Flow prompt must collect accepted images in 03-bilder/.`);
    mustMatch(text, /no cover subfolder, no batch subfolders|no batch subfolders/iu, `${rel}: natural Flow prompt must forbid batch subfolders.`);
    mustMatch(text, /same illustrator|SAME illustrator/iu, `${rel}: natural Flow prompt must preserve one same-illustrator visual world.`);

    if (isHumanBehaviorV2) {
      mustMatch(text, /cute\/chibi\/mascot|cute[^\n]*chibi[^\n]*mascot/iu, `${rel}: natural v2 prompt lacks mature-character anti-chibi guard.`);
      if (!/blank cream|cream backgrounds|cream\/off-white|off-white/iu.test(text)) warnings.push(`${rel}: v2 prompt should block blank cream/off-white default scenes.`);
    }

    forbiddenNaturalLabels.forEach((label) => {
      if (text.includes(label)) failures.push(`${rel}: natural Flow prompt must keep '${label}' in 99-intern planning, not final BILD blocks.`);
    });

    for (let i = 0; i < images.length; i += 1) {
      const start = images[i].index ?? 0;
      const end = images[i + 1]?.index ?? text.indexOf('\nFINAL QA', start) > -1 ? text.indexOf('\nFINAL QA', start) : text.length;
      const blockEnd = Number.isInteger(end) ? end : text.length;
      const block = text.slice(start, blockEnd);
      const n = Number(images[i][1]);

      if (block.trim().split(/\s+/u).length < 20) warnings.push(`${rel}: BILD ${n} is unusually short for natural art direction.`);

      const hasExactText = /Render exactly|Integrate exactly|render exactly|integrate exactly/iu.test(block);
      const forbidsExtraText = /No visible text|No other readable text|ZERO READABLE TEXT/iu.test(block);
      if (!hasExactText && !forbidsExtraText) warnings.push(`${rel}: BILD ${n} should explicitly prevent accidental readable text.`);
      if (hasExactText && !/No other readable text|only readable text/iu.test(block) && n !== 3 && n !== 11) {
        warnings.push(`${rel}: BILD ${n} has planned text but should explicitly forbid extra readable text.`);
      }

      if (n === 1) {
        const quoted = block.match(/Render exactly:\s*["“]([^"”\n]+)["”]/iu)?.[1];
        if (quoted && (countWords(quoted) < 2 || countWords(quoted) > 7)) failures.push(`${rel}: BILD 01 cover title must be 2-7 words.`);
      }
    }

    const remaining = images.length - 1;
    if (remaining >= 5) {
      const expectedFullBatches = Math.floor(remaining / 5);
      const explicitBatchMentions = [...text.matchAll(/Batch\s+\d+:/giu)].length;
      const genericFiveRule = /batches of EXACTLY 5 image numbers|five-image batch/iu.test(text);
      if (!genericFiveRule && explicitBatchMentions < expectedFullBatches) {
        failures.push(`${rel}: regular post-cover generation must use five-image batches.`);
      }
    }

    continue;
  }

  // Legacy / pre-NATURAL_FLOW_MASTER_V1 compatibility path.
  const scenes = [...text.matchAll(/^SCENE\s+(\d+)\s*$/gimu)];
  if (!scenes.length) {
    failures.push(`${rel}: no SCENE blocks found and NATURAL_FLOW_MASTER_V1 is not declared.`);
    continue;
  }

  scenes.forEach((m, i) => {
    if (Number(m[1]) !== i + 1) failures.push(`${rel}: scenes must be contiguous.`);
  });

  if (isHumanBehaviorV2) {
    if (!/NEVER create a storyboard/iu.test(text)) failures.push(`${rel}: v2 prompt must explicitly forbid storyboard output.`);
    if (!/contact sheet/iu.test(text)) failures.push(`${rel}: v2 prompt must explicitly forbid contact-sheet output.`);
    if (!/SEPARATE[^\n]*standalone[^\n]*16:9|standalone[^\n]*16:9[^\n]*image/iu.test(text)) failures.push(`${rel}: v2 prompt must require separate standalone 16:9 images.`);
    if (!/Generate\s+(?:SCENE|Scene)\s+01\s+ONLY/iu.test(text)) failures.push(`${rel}: v2 prompt must gate initial generation to Scene 01 only.`);
    if (!/3\s+SEPARATE[^\n]*Scene-01[^\n]*cover candidates|exactly\s+3\s+separate[^\n]*cover candidates/iu.test(text)) failures.push(`${rel}: v2 prompt must request 3 separate Scene-01 cover candidates.`);
    if (!/cute\/chibi\/mascot|cute[^\n]*chibi[^\n]*mascot/iu.test(text)) failures.push(`${rel}: v2 prompt lacks mature-character anti-chibi guard.`);
  }

  if (isFlowOutputV2) {
    if (!/NN\.png/iu.test(text)) failures.push(`${rel}: FINAL_SEPARATE_IMAGE_ASSETS_V2 must require NN.png naming.`);
    if (!/03-bilder\//iu.test(text)) failures.push(`${rel}: FINAL_SEPARATE_IMAGE_ASSETS_V2 must collect accepted images in 03-bilder/.`);
  }
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
