export const COVER_STYLE_POLICY = 'APPROVED_COVER_EVERY_SCENE_V1';
export const COVER_APPROVAL_POLICY = 'EXPLICIT_FINAL_COVER_APPROVAL_V1';
export const CHARACTER_REFERENCE_POLICY = 'VISIBLE_RECURRING_CHARACTER_ONLY_V1';

export const checkFlowReferencePolicy = (plan, prompt, location = 'Google Flow') => {
  if (!plan.coverStyleReferencePolicy) return [];
  const errors = [];
  const fail = text => errors.push(`${location}: ${text}`);
  if (plan.coverStyleReferencePolicy !== COVER_STYLE_POLICY) fail('unknown cover style reference policy.');
  if (plan.coverApprovalPolicy !== COVER_APPROVAL_POLICY || plan.requireFinalCoverApproval !== true || plan.autoStartAfterCoverSelection !== false) fail('scene production requires explicit final cover approval, beyond selection.');
  if (plan.characterReferenceUsagePolicy !== CHARACTER_REFERENCE_POLICY) fail('character references must be limited to relevant visible recurring people.');
  const text = String(prompt);
  const referenceStage = text.indexOf('STAGE A — CHARACTER REFERENCES ONLY');
  const coverStage = text.indexOf('STAGE B — THREE COVERS, THEN WAIT');
  const sceneStage = text.indexOf('STAGE C — SCENES AFTER FINAL COVER APPROVAL');
  if (referenceStage < 0 || coverStage <= referenceStage || sceneStage <= coverStage) fail('explicit references → covers/wait → scenes stages missing or out of order.');
  if (!text.includes('A cover selection alone does not authorize scene generation.')) fail('cover selection must not automatically release scenes.');
  if (!text.includes('REQUIRED FOR EVERY IMAGE, including object-only scenes, diagrams, comparisons and text illustrations.')) fail('approved cover must anchor every representation, including scenes without people.');
  const blocks = new Map([...text.matchAll(/^BILD\s+(\d+)\s*\r?\n([\s\S]*?)(?=^BILD\s+\d+\s*$|^FINAL QA\s*$|(?![\s\S]))/gmu)].map(m => [Number(m[1]), m[2]]));
  const defined = new Set((plan.characterReferences ?? []).map(ref => ref.file));
  for (const scene of plan.scenes ?? []) {
    const label = `scene ${scene.scene}`;
    if (scene.styleReferenceImage !== '05-export/thumbnail.png') fail(`${label}: approved cover style reference missing.`);
    const refs = scene.characterReferenceImages;
    if (!Array.isArray(refs)) { fail(`${label}: explicit character-reference array required (empty when unnecessary).`); continue; }
    if (new Set(refs).size !== refs.length || refs.some(ref => !defined.has(ref))) fail(`${label}: unknown/duplicate character reference.`);
    const block = blocks.get(Number(scene.scene)) ?? '';
    if (!block.includes('STYLE REFERENCE: thumbnail.png — REQUIRED FOR THIS IMAGE.')) fail(`${label}: cover reuse must be explicit in this BILD.`);
    const expected = refs.length ? refs.join(', ') : 'none';
    if (!block.includes(`CHARACTER REFERENCES: ${expected}.`)) fail(`${label}: prompt reference set does not match the planned visible characters.`);
  }
  return errors;
};
