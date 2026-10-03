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
const oldMarkers = /CINEMATIC_HUMAN_BEHAVIOR_V2|STYLIZED_STICKMAN_CAST_V2|GEOMETRIC_STICKMAN_ANATOMY_V1|CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1|MINIMAL_EDITORIAL_STICKMAN_V2|Universal Editorial Stickman World/iu;
const must = (text, regex, message) => { if (!regex.test(text)) failures.push(message); };

const requiredWorkflow = (text, rel) => {
  must(text, /3\s+SEPARATE|exactly\s+3\s+separate/iu, `${rel}: missing 3-cover gate.`);
  must(text, /STOP|wait for the user/iu, `${rel}: missing user cover-selection stop.`);
  must(text, /batch(?:es)?\s+of\s+exactly\s+5|5-image batch|groups of 5/iu, `${rel}: missing five-image batching.`);
  must(text, /NN\.png|matching number/iu, `${rel}: missing numbered filenames.`);
  must(text, /03-bilder\//iu, `${rel}: missing flat 03-bilder/ output.`);
  must(text, /storyboard|contact sheet/iu, `${rel}: must explicitly address storyboard/contact-sheet output.`);
};

const requiredRepresentationFirst = (text, rel) => {
  must(text, /representation first|best visual form|people are optional|people.*optional/iu, `${rel}: missing representation-first / people-optional rule.`);
  must(text, /OBJECT_FOCUS|object-focused|object focus/iu, `${rel}: missing object-led representation option.`);
  must(text, /TEXT_ILLUSTRATION|text-led|text illustration/iu, `${rel}: missing text-led representation option.`);
};

const requiredSequenceHardening = (text, rel) => {
  must(text, /same[- ]frame|all.*humans.*same|identical.*base.*head|mixed.*species/iu, `${rel}: missing same-frame species lock.`);
  must(text, /motif progression|motifKey|recurring.*object.*progress/iu, `${rel}: missing motif-progression rule.`);
  must(text, /maximum:?\s*2|max\s*2|2\s+distinct.*(?:states|panels)|no\s+3[- ]?\/4[- ]?panel/iu, `${rel}: missing max-two-state/panel rule.`);
  must(text, /unplanned.*(?:English|readable text)|English.*FAIL|gibberish.*FAIL|zero readable text/iu, `${rel}: missing accidental-text hard fail.`);
};

const templatePath = path.resolve('youtube/00-vorlage/thema-vorlage/02-google-flow/google-flow-prompt.txt');
if (!fs.existsSync(templatePath)) failures.push('YouTube Flow template is missing.');
else {
  const template = fs.readFileSync(templatePath, 'utf8');
  must(template, /VISUAL WORLD:\s*PSYCHOLOGY_STICKMAN_WORLD_V1/iu, 'Template must declare active PSYCHOLOGY_STICKMAN_WORLD_V1.');
  must(template, /OBSERVABLE_SCENE_FIRST_V1/iu, 'Template must keep observable-scene policy.');
  must(template, /FINAL_SEPARATE_IMAGE_ASSETS_V2/iu, 'Template must keep output policy.');
  must(template, /VISUAL_SEQUENCE_HARDENING_V1/iu, 'Template must declare VISUAL_SEQUENCE_HARDENING_V1.');
  requiredWorkflow(template, 'YouTube Flow template');
  requiredRepresentationFirst(template, 'YouTube Flow template');
  requiredSequenceHardening(template, 'YouTube Flow template');
  if (oldMarkers.test(template)) failures.push('Template still contains a deleted/old visual-world marker.');
}

for (const file of files.filter((p) => !p.split(path.sep).includes('00-vorlage'))) {
  const rel = path.relative(process.cwd(), file);
  const text = fs.readFileSync(file, 'utf8');
  if (oldMarkers.test(text)) {
    warnings.push(`${rel}: historical prompt retains old visual-world markers; it is not a source for new production.`);
    continue;
  }
  if (/VISUAL WORLD STATUS:\s*UNDEFINED/iu.test(text)) {
    warnings.push(`${rel}: visual world undefined; image generation must remain blocked.`);
    continue;
  }
  if (!/NATURAL_FLOW_MASTER_V2/iu.test(text)) continue;
  requiredWorkflow(text, rel);
  if (/PSYCHOLOGY_STICKMAN_WORLD_V1/iu.test(text)) requiredRepresentationFirst(text, rel);
  if (/VISUAL_SEQUENCE_HARDENING_V1/iu.test(text)) requiredSequenceHardening(text, rel);
  const images = [...text.matchAll(/^BILD\s+(\d+)\s*$/gimu)];
  if (!images.length) failures.push(`${rel}: no BILD blocks found.`);
  images.forEach((match, index) => {
    if (Number(match[1]) !== index + 1) failures.push(`${rel}: BILD blocks must be contiguous from 01.`);
  });
  must(text, /observable|concrete visible|visible action|visible evidence/iu, `${rel}: missing observable-scene instruction.`);

  if (/VISUAL_SEQUENCE_HARDENING_V1/iu.test(text)) {
    const riskyThreePart = /(?:three|3)[- ]?(?:part|stage|panel|state)/iu.test(text);
    const explicitlyForbidThreePart = /do not create 3|no 3[- ]?\/4[- ]?panel|max(?:imum)?\s*2|default maximum:?\s*2/iu.test(text);
    if (riskyThreePart && !explicitlyForbidThreePart) failures.push(`${rel}: hardened prompt mentions a 3-part/3-stage visual without an explicit max-two-state safeguard.`);
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
