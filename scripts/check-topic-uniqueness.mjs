#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {listYouTubeProjects} from './lib/youtube-week-folders.mjs';

const repoRoot = path.resolve('.');
const registryPath = path.join(repoRoot, 'TOPIC_REGISTRY.json');
const youtubeDir = path.join(repoRoot, 'youtube');
const failures = [];

const normalize = (value) =>
  String(value ?? '')
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('de-DE')
    .replace(/ß/gu, 'ss')
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '');

if (!fs.existsSync(registryPath)) {
  console.error('TOPIC UNIQUENESS QA: FAIL');
  console.error('- TOPIC_REGISTRY.json is missing.');
  process.exit(1);
}

let registry;
try {
  registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
} catch (error) {
  console.error('TOPIC UNIQUENESS QA: FAIL');
  console.error(`- TOPIC_REGISTRY.json is invalid JSON: ${error.message}`);
  process.exit(1);
}

if (registry.policyId !== 'TOPIC_UNIQUENESS_V1') {
  failures.push('TOPIC_REGISTRY.json must use policyId TOPIC_UNIQUENESS_V1.');
}

const entries = Array.isArray(registry.entries) ? registry.entries : [];
if (!entries.length) failures.push('TOPIC_REGISTRY.json has no topic entries.');

const topicIds = new Set();
const aliasOwners = new Map();
const registeredProjects = new Map();

for (const entry of entries) {
  const topicId = String(entry?.topicId ?? '').trim();
  const canonicalTopic = String(entry?.canonicalTopic ?? '').trim();
  const status = String(entry?.status ?? '').trim();
  const aliases = Array.isArray(entry?.aliases) ? entry.aliases : [];
  const projects = Array.isArray(entry?.projects) ? entry.projects : [];

  if (!topicId) failures.push('Registry entry missing topicId.');
  if (!canonicalTopic) failures.push(`${topicId || '<unknown>'}: missing canonicalTopic.`);
  if (topicIds.has(topicId)) failures.push(`${topicId}: duplicate topicId in registry.`);
  topicIds.add(topicId);

  if (!['USED', 'LEGACY_DUPLICATE_LOCKED'].includes(status)) {
    failures.push(`${topicId}: invalid status '${status}'.`);
  }
  if (!projects.length) failures.push(`${topicId}: no project path registered.`);
  if (status === 'USED' && projects.length !== 1) {
    failures.push(`${topicId}: USED topics must have exactly one project; found ${projects.length}.`);
  }
  if (status === 'LEGACY_DUPLICATE_LOCKED' && projects.length < 2) {
    failures.push(`${topicId}: LEGACY_DUPLICATE_LOCKED must document at least two historical projects.`);
  }

  const allAliases = [topicId, canonicalTopic, ...aliases];
  for (const alias of allAliases) {
    const key = normalize(alias);
    if (!key) continue;
    const owner = aliasOwners.get(key);
    if (owner && owner !== topicId) {
      failures.push(`Alias collision '${alias}' maps to both ${owner} and ${topicId}.`);
    } else {
      aliasOwners.set(key, topicId);
    }
  }

  for (const project of projects) {
    const projectPath = String(project ?? '').replace(/\\/gu, '/').trim();
    if (!projectPath.startsWith('youtube/')) {
      failures.push(`${topicId}: invalid project path '${projectPath}'.`);
      continue;
    }
    const owner = registeredProjects.get(projectPath);
    if (owner && owner !== topicId) {
      failures.push(`${projectPath}: registered to both ${owner} and ${topicId}.`);
    } else {
      registeredProjects.set(projectPath, topicId);
    }
  }
}

// Recursively inspect weekly folders; reject flat/incorrectly dated projects.
let actualProjects = [];
try { actualProjects = listYouTubeProjects(repoRoot); }
catch (error) { failures.push('Weekly YouTube folder structure: ' + error.message); }

const actualSet = new Set(actualProjects);

for (const [projectPath, topicId] of registeredProjects) {
  if (!actualSet.has(projectPath)) {
    failures.push(`${topicId}: registry points to missing project '${projectPath}'.`);
  }
}

const slugFromProject = (projectPath) => {
  const name = path.posix.basename(projectPath).replace(/^\d{2}\.\d{2}\.\d{4}-/u, '');
  let slug = name;
  let previous;
  do {
    previous = slug;
    slug = slug.replace(/-(?:v\d+|test)$/u, '');
  } while (slug !== previous);
  return normalize(slug);
};

for (const projectPath of actualProjects) {
  if (registeredProjects.has(projectPath)) continue;
  const slug = slugFromProject(projectPath);
  const existingTopicId = aliasOwners.get(slug);
  if (existingTopicId) {
    failures.push(
      `${projectPath}: unregistered duplicate of existing topic '${existingTopicId}'. ` +
        'Do not create another video for the same topic.',
    );
  } else {
    failures.push(
      `${projectPath}: new YouTube project is missing from TOPIC_REGISTRY.json. ` +
        'Register a genuinely new canonical topic in the same change.',
    );
  }
}

if (failures.length) {
  console.error('\nTOPIC UNIQUENESS QA: FAIL\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const legacyDuplicates = entries.filter((entry) => entry.status === 'LEGACY_DUPLICATE_LOCKED');
console.log(
  `\nTOPIC UNIQUENESS QA: PASS — ${entries.length} canonical topics, ${actualProjects.length} registered YouTube projects.`,
);
if (legacyDuplicates.length) {
  console.log(
    `Historical duplicate topics locked: ${legacyDuplicates.map((entry) => entry.topicId).join(', ')}. No new projects may be added to them.`,
  );
}
