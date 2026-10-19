#!/usr/bin/env node
// Print verified, tablet-friendly GitHub links for the completed Phase-1 handoff.
import fs from 'node:fs';
import path from 'node:path';
import {needsCreativeReview, checkCreativeVisualPlan, checkCreativeFlowPrompt} from './lib/creative-visual-qa.mjs';
import {weekForProjectName} from './lib/youtube-week-folders.mjs';
import {checkStoryScript, STORY_EXPLANATION_POLICY} from './lib/story-explanation-qa.mjs';

const [projectArg, ref = 'main'] = process.argv.slice(2);
if (!projectArg || projectArg.startsWith('--')) {
  console.error('Usage: npm run phase1:links -- <youtube/project-folder> [branch]');
  process.exit(1);
}
if (!/^[a-zA-Z0-9._/-]+$/u.test(ref) || ref.includes('..')) {
  throw new Error('Invalid GitHub branch/ref.');
}

const root = path.resolve('.');
const projectDir = path.resolve(projectArg);
const relative = path.relative(root, projectDir).replace(/\\/g, '/');
const parts = relative.split('/');
if (parts.length !== 3 || parts[0] !== 'youtube' || parts[1] !== weekForProjectName(parts[2]).folder) {
  throw new Error('Expected a real project under youtube/<ISO-week>/<DD.MM.YYYY-topic>. No template, wrong-week or root project allowed.');
}

const scriptRelative = `${relative}/01-script/script.txt`;
const promptRelative = `${relative}/02-google-flow/google-flow-prompt.txt`;
const planPath = path.join(projectDir, '99-intern', 'phase1-scenes.json');
const legacyPlanPath = path.join(projectDir, '99-intern', 'projektdateien', 'phase1-scenes.json');
const actualPlanPath = fs.existsSync(planPath) ? planPath : legacyPlanPath;
const readRequired = (file, label) => {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    throw new Error(`Phase 1 NOT READY: ${label} missing: ${file}`);
  }
  const value = fs.readFileSync(file, 'utf8').trim();
  if (!value) throw new Error(`Phase 1 NOT READY: ${label} is empty: ${file}`);
  return value;
};

const script = readRequired(path.join(root, scriptRelative), 'final speaker script');
const prompt = readRequired(path.join(root, promptRelative), 'Google Flow master prompt');
const plan = JSON.parse(readRequired(actualPlanPath, 'Phase-1 visual-beat plan'));
if (plan.storyExplanationPolicy === STORY_EXPLANATION_POLICY) {
  const scriptPlan = JSON.parse(readRequired(path.join(projectDir, '99-intern', 'script-plan.json'), 'story/explanation script plan'));
  const storyErrors = checkStoryScript(scriptPlan, script, {required: true, location: relative + '/99-intern/script-plan.json'});
  if (storyErrors.length) throw new Error('STORY EXPLANATION QA NOT READY:\n' + storyErrors.join('\n'));
}
const scenes = plan.scenes;
if (needsCreativeReview(plan, relative)) {
  const review = checkCreativeVisualPlan(plan, relative);
  if (review.failures.length) throw new Error('CREATIVE VISUAL QA NOT READY:\n' + review.failures.join('\n'));
  const promptCheck = checkCreativeFlowPrompt(plan, prompt, promptRelative);
  if (promptCheck.failures.length) throw new Error('FLOW CREATIVE QA NOT READY:\n' + promptCheck.failures.join('\n'));
  console.log('CREATIVE VISUAL REVIEW: PASS — ' + JSON.stringify(review.summary));
}
if (!Array.isArray(scenes) || scenes.length < 1) {
  throw new Error('Phase 1 NOT READY: phase1-scenes.json contains no finished scenes.');
}
if (script.includes('[Finales Voice-over-Skript hier schreiben]') || script.includes('[Hook schreiben]')) {
  throw new Error('Phase 1 NOT READY: speaker script is still a template.');
}
if (prompt.includes('[VIDEO-THEMA]') || prompt.includes('[SCENE') || prompt.includes('[BILD-')) {
  throw new Error('Phase 1 NOT READY: Google Flow master prompt still contains template placeholders.');
}
const numbers = [...prompt.matchAll(/^\s*BILD\s+(\d+)\s*$/gimu)].map((match) => Number(match[1]));
if (numbers.length !== scenes.length || numbers.some((n, i) => n !== i + 1)) {
  throw new Error(`Phase 1 NOT READY: Flow prompt has ${numbers.length} numbered BILD blocks for ${scenes.length} planned scenes; expected sequential BILD 01–${scenes.length}.`);
}

const repo = process.env.GITHUB_REPOSITORY || 'memetreza34-ux/Psychologie-Stickman';
if (!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/u.test(repo)) throw new Error('Invalid GITHUB_REPOSITORY value.');
const githubLink = (file) => `https://github.com/${repo}/blob/${encodeURIComponent(ref)}/${file.split('/').map(encodeURIComponent).join('/')}`;

console.log('PHASE 1 HANDOFF: READY LOCALLY');
console.log(`Project: ${relative}`);
console.log(`Verified: final script + all ${scenes.length} numbered Google Flow scene prompts.`);
console.log('');
console.log(`Google Flow — alle Bildprompts: ${githubLink(promptRelative)}`);
console.log(`Sprecher-Skript: ${githubLink(scriptRelative)}`);
console.log('');
console.log('IMPORTANT: Confirm both files are committed and reachable on the linked GitHub branch BEFORE sending these URLs as verified links to the user. The local check cannot verify a GitHub push.');
