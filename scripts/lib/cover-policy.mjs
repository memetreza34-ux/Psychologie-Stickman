import fs from 'node:fs';
import path from 'node:path';

export const countCoverWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

export const findProjectRootFromFile = (filePath) => {
  let current = path.dirname(path.resolve(filePath));
  const root = path.parse(current).root;
  while (current !== root) {
    if (fs.existsSync(path.join(current, '01-script')) && fs.existsSync(path.join(current, '99-intern'))) return current;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
};

export const readSidecarCoverPolicy = (sourceFilePath) => {
  const projectRoot = findProjectRootFromFile(sourceFilePath);
  if (!projectRoot) return null;
  const policyPath = path.join(projectRoot, '99-intern', 'cover-policy.json');
  if (!fs.existsSync(policyPath)) return null;
  const parsed = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
  return {...parsed, policyPath, projectRoot};
};

export const resolveCoverPolicy = (plan, sourceFilePath = '') => {
  const sidecar = sourceFilePath ? readSidecarCoverPolicy(sourceFilePath) : null;
  const renderer = String(sidecar?.coverTextRenderer ?? plan?.coverTextRenderer ?? '').trim().toUpperCase();
  const headline = String(sidecar?.coverHeadline ?? plan?.coverHeadline ?? '').trim();
  const flowPolicy = String(
    sidecar?.flowSourceImageTextPolicy ?? plan?.flowSourceImageTextPolicy ?? '',
  ).trim();

  const isGoogleFlow = renderer === 'GOOGLE_FLOW' || flowPolicy === 'SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY';
  return {
    isGoogleFlow,
    coverTextRenderer: isGoogleFlow ? 'GOOGLE_FLOW' : renderer || 'REMOTION',
    coverHeadline: headline,
    flowSourceImageTextPolicy: isGoogleFlow ? 'SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY' : flowPolicy || 'NONE',
    sidecar,
  };
};

export const assertValidFlowCoverPolicy = (policy, context = 'cover policy') => {
  if (!policy.isGoogleFlow) return;
  const words = countCoverWords(policy.coverHeadline);
  if (!policy.coverHeadline) throw new Error(`${context}: coverHeadline is required for GOOGLE_FLOW cover rendering.`);
  if (words < 2 || words > 7) throw new Error(`${context}: coverHeadline must contain 2-7 words.`);
};
