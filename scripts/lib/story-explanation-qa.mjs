export const STORY_EXPLANATION_POLICY = 'STORY_EXPLANATION_PROOF_V1';
const norm = value => String(value ?? '').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('de-DE');
const filled = value => typeof value === 'string' && norm(value).length >= 12 && !/^(pending|todo|tbd|placeholder|noch offen|\[.*\])$/u.test(norm(value));
const proofFunctions = new Set(['MECHANISM', 'RESEARCH', 'COMPARISON', 'EVIDENCE']);
const proofKinds = new Set(['STATE_CHANGE', 'CONTROLLED_COMPARISON', 'PROCESS', 'OBSERVATIONAL_DETAIL']);

export const checkStoryScript = (plan, script, {required = false, location = 'script-plan.json'} = {}) => {
  const errors = [];
  if (!required && !plan?.storyExplanationPolicy) return errors;
  const fail = message => errors.push(`${location}: ${message}`);
  if (plan?.storyExplanationPolicy !== STORY_EXPLANATION_POLICY) {
    fail(`storyExplanationPolicy must be ${STORY_EXPLANATION_POLICY}.`);
    return errors;
  }
  if (plan.status !== 'APPROVED') fail('script-plan status must be APPROVED.');
  const text = norm(script), story = plan.storyExplanation ?? {};
  for (const field of ['viewerQuestion', 'goal', 'obstacle', 'stakes']) {
    if (!filled(story[field])) fail(`storyExplanation.${field} needs a concrete description.`);
  }
  const quotePosition = (quote, label, from = 0) => {
    if (!filled(quote)) { fail(`${label} needs an exact spoken quote.`); return -1; }
    const position = text.indexOf(norm(quote), from);
    if (position < 0) fail(`${label} must occur in the script in the planned order.`);
    return position;
  };
  const opening = quotePosition(story.openingQuote, 'openingQuote');
  if (opening >= 0 && opening / Math.max(1, text.length) > 0.22) fail('openingQuote appears after the opening.');
  const links = Array.isArray(story.explanationApplications) ? story.explanationApplications : [];
  if (links.length < 2) fail('Plan at least two explanationApplications: explanation followed by a concrete return/application in the story.');
  let cursor = Math.max(0, opening + norm(story.openingQuote).length);
  for (const [index, link] of links.entries()) {
    const label = `explanationApplications[${index}]`;
    const explanation = quotePosition(link.explanationQuote, `${label}.explanationQuote`, cursor);
    const application = quotePosition(link.applicationQuote, `${label}.applicationQuote`, explanation < 0 ? cursor : explanation + norm(link.explanationQuote).length);
    if (norm(link.explanationQuote) === norm(link.applicationQuote)) fail(`${label}: application cannot repeat the explanation.`);
    if (!filled(link.changedUnderstanding)) fail(`${label}.changedUnderstanding must explain what the story now means differently.`);
    if (application >= 0) cursor = application + norm(link.applicationQuote).length;
  }
  const payoff = quotePosition(story.payoffQuote, 'payoffQuote', cursor);
  if (payoff >= 0 && payoff / Math.max(1, text.length) < 0.58) fail('payoffQuote must return to the opening in the second half.');
  if (!filled(story.payoffChange)) fail('payoffChange must describe a changed decision or understanding, beyond repeating the opening.');
  const review = story.editorialReview ?? {};
  if (review.status !== 'PASS') fail('editorialReview must be completed after revising the script.');
  if (!['CODEX_TEXT_REVIEW', 'HUMAN_READ_THROUGH'].includes(review.method)) fail('editorialReview.method must identify how the script was actually reviewed.');
  if (!filled(review.findings)) fail('editorialReview.findings must record a concrete finding.');
  if (!Array.isArray(review.unresolvedIssues) || review.unresolvedIssues.length) fail('editorialReview.unresolvedIssues must be an empty array before approval.');
  if (!['NOT_TESTED', 'HUMAN_FEEDBACK_RECORDED'].includes(review.comprehensionStatus)) fail('Record comprehensionStatus honestly; a Codex self-review is not an audience test.');
  if (review.comprehensionStatus === 'HUMAN_FEEDBACK_RECORDED' && !filled(review.feedbackReference)) fail('Human comprehension feedback needs a recorded feedbackReference.');
  return errors;
};

export const checkVisualProofs = (plan, location = 'phase1-scenes.json') => {
  if (!plan?.storyExplanationPolicy) return [];
  if (plan.storyExplanationPolicy !== STORY_EXPLANATION_POLICY) return [`${location}: unknown storyExplanationPolicy.`];
  const errors = [];
  for (const scene of plan.scenes ?? []) {
    if (!proofFunctions.has(scene.visualFunction)) continue;
    const proof = scene.visualProof ?? {}, label = `${location}: scene ${scene.scene} visualProof`;
    if (!proofKinds.has(proof.kind)) errors.push(`${label}: choose an observable relation, not labels or decorative props.`);
    for (const field of ['withoutLabels', 'relationship', 'viewerInference', 'limitation', 'promptAnchor']) {
      if (!filled(proof[field])) errors.push(`${label}.${field} is missing or still a placeholder.`);
    }
    const labels = (Array.isArray(scene.flowText) ? scene.flowText : [scene.flowText]).filter(Boolean).join(' ');
    if (labels && norm(proof.withoutLabels) === norm(labels)) errors.push(`${label}.withoutLabels cannot just repeat the labels.`);
    if (!['ILLUSTRATIVE_MODEL', 'RESEARCH_SETUP', 'SOURCED_RESULT'].includes(proof.evidenceStatus)) errors.push(`${label}: distinguish an illustration/model from research evidence.`);
    if (['RESEARCH_SETUP', 'SOURCED_RESULT'].includes(proof.evidenceStatus) && !filled(proof.sourceRef)) errors.push(`${label}: research/evidence requires a sourceRef to the checked claim/source.`);
  }
  return errors;
};

export const checkVisualProofPrompt = (plan, prompt, location = 'google-flow-prompt.txt') => {
  if (plan?.storyExplanationPolicy !== STORY_EXPLANATION_POLICY) return [];
  const errors = [];
  const blocks = new Map([...String(prompt).matchAll(/^BILD\s+(\d+)\s*\r?\n([\s\S]*?)(?=^BILD\s+\d+\s*$|^FINAL QA\s*$|(?![\s\S]))/gmu)].map(match => [Number(match[1]), norm(match[2])]));
  for (const scene of plan.scenes ?? []) {
    if (!proofFunctions.has(scene.visualFunction)) continue;
    const anchor = scene.visualProof?.promptAnchor;
    if (!filled(anchor) || !blocks.get(Number(scene.scene))?.includes(norm(anchor))) {
      errors.push(`${location}: BILD ${scene.scene} must contain its exact English visualProof.promptAnchor; metadata alone cannot direct Flow.`);
    }
  }
  return errors;
};
