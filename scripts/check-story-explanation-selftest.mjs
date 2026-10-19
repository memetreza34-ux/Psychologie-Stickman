#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {STORY_EXPLANATION_POLICY as policy, checkStoryScript, checkVisualProofs, checkVisualProofPrompt} from './lib/story-explanation-qa.mjs';
import {checkCreativeFlowPrompt} from './lib/creative-visual-qa.mjs';
import {hasFiveImageBatch} from './lib/flow-workflow-language.mjs';

const script = [
  'Der offene Karton wartet auf dem Tisch.',
  'Ein Gegenstand kann an die vorige Aufgabe erinnern.',
  'Am Tisch erinnert dich der Karton an das fehlende Klebeband.',
  'Ein Raumwechsel ist kein garantierter Gedächtnisverlust.',
  'Auch in der Küche kannst du dich noch an den Karton erinnern.',
  'Du kehrst zurück und verschließt den Karton.',
].join(' ');
const plan = {
  status: 'APPROVED', storyExplanationPolicy: policy,
  storyExplanation: {
    viewerQuestion: 'Warum geht beim Raumwechsel manchmal der vorige Gedanke verloren?',
    goal: 'Die Figur will einen offenen Versandkarton verschließen.',
    obstacle: 'Das Klebeband liegt außerhalb des aktuellen Zimmers.',
    stakes: 'Die begonnene Aufgabe bleibt sonst unerledigt liegen.',
    openingQuote: 'Der offene Karton wartet auf dem Tisch.',
    explanationApplications: [
      {explanationQuote: 'Ein Gegenstand kann an die vorige Aufgabe erinnern.', applicationQuote: 'Am Tisch erinnert dich der Karton an das fehlende Klebeband.', changedUnderstanding: 'Der Karton hat im Beispiel eine Hinweisfunktion.'},
      {explanationQuote: 'Ein Raumwechsel ist kein garantierter Gedächtnisverlust.', applicationQuote: 'Auch in der Küche kannst du dich noch an den Karton erinnern.', changedUnderstanding: 'Das Modell beschreibt eine Möglichkeit und keinen automatischen Reset.'},
    ],
    payoffQuote: 'Du kehrst zurück und verschließt den Karton.',
    payoffChange: 'Die Aufgabe wird mit vorsichtiger Einordnung abgeschlossen.',
    editorialReview: {status: 'PASS', method: 'CODEX_TEXT_REVIEW', findings: 'Beide Erklärungen werden auf die konkrete Situation angewandt.', unresolvedIssues: [], comprehensionStatus: 'NOT_TESTED'},
  },
};
assert.deepEqual(checkStoryScript(plan, script), []);
assert.deepEqual(checkStoryScript({}, script), [], 'historical script plans unchanged');
assert.ok(checkStoryScript({}, script, {required: true}).length, 'opt-in cannot bypass script review');
const changed = structuredClone(plan);
changed.storyExplanation.explanationApplications[1].applicationQuote = 'Dieser Satz wurde nie gesprochen.';
assert.ok(checkStoryScript(changed, script).some(e => e.includes('planned order')), 'reject invented quote');
const reordered = structuredClone(plan);
reordered.storyExplanation.explanationApplications.reverse();
assert.ok(checkStoryScript(reordered, script).some(e => e.includes('planned order')), 'reject detached/out-of-order application');
const unreviewed = structuredClone(plan);
unreviewed.storyExplanation.editorialReview.unresolvedIssues = ['Erklärung noch abstrakt.'];
assert.ok(checkStoryScript(unreviewed, script).some(e => e.includes('unresolvedIssues')));
const claimedTest = structuredClone(plan);
claimedTest.storyExplanation.editorialReview.comprehensionStatus = 'HUMAN_FEEDBACK_RECORDED';
assert.ok(checkStoryScript(claimedTest, script).some(e => e.includes('feedbackReference')), 'no invented human test');
const draft = structuredClone(plan); draft.status = 'PENDING';
assert.ok(checkStoryScript(draft, script).some(e => e.includes('APPROVED')));

const anchor = 'the same open parcel is visible beside the work table';
const visuals = {storyExplanationPolicy: policy, scenes: [{
  scene: 1, visualFunction: 'MECHANISM', flowText: ['AM TISCH', 'IN DER KÜCHE'],
  visualProof: {
    kind: 'STATE_CHANGE', withoutLabels: 'Ein identischer Karton ist einmal nah sichtbar und einmal im anderen Raum weit entfernt.',
    relationship: 'Der Ort der Aufgabe bleibt gleich; die unmittelbar sichtbare Umgebung ändert sich.',
    viewerInference: 'Die Aufgabe verschwindet nicht, aber ihre sichtbaren Hinweise sind weniger präsent.',
    limitation: 'Illustration eines möglichen Zusammenhangs, kein Abbild eines gemessenen Gehirnprozesses.',
    promptAnchor: anchor, evidenceStatus: 'ILLUSTRATIVE_MODEL',
  },
}]};
assert.deepEqual(checkVisualProofs(visuals), []);
const labels = structuredClone(visuals);
labels.scenes[0].visualProof.kind = 'LABEL_ONLY';
labels.scenes[0].visualProof.withoutLabels = 'AM TISCH IN DER KÜCHE';
assert.ok(checkVisualProofs(labels).some(e => e.includes('not labels')));
assert.ok(checkVisualProofs(labels).some(e => e.includes('repeat the labels')));
const research = structuredClone(visuals);
research.scenes[0].visualProof.evidenceStatus = 'SOURCED_RESULT';
assert.ok(checkVisualProofs(research).some(e => e.includes('sourceRef')));
const flow = `BILD 01\nShow ${anchor}.\nBILD 02\nA separate scene.\n`;
assert.deepEqual(checkVisualProofPrompt(visuals, flow), []);
const wrongScene = `BILD 01\nA separate scene.\nBILD 02\nShow ${anchor}.\n`;
assert.ok(checkVisualProofPrompt(visuals, wrongScene).length, 'proof must appear in its own scene prompt');
assert.ok(checkVisualProofPrompt(visuals, `BILD 01\nA separate scene.\nFINAL QA\n${anchor}`).length, 'a footer cannot substitute for scene instructions');
const integrated = {...visuals, creativeVisualPolicy: 'CONTENT_FIRST_VISUAL_QA_V2'};
assert.ok(checkCreativeFlowPrompt(integrated, wrongScene).failures.some(e => e.includes('promptAnchor')), 'existing Flow gate enforces proof');
const template = JSON.parse(fs.readFileSync(new URL('../youtube/00-vorlage/thema-vorlage/99-intern/script-plan.json', import.meta.url)));
const visualTemplate = JSON.parse(fs.readFileSync(new URL('../youtube/00-vorlage/thema-vorlage/99-intern/phase1-scenes.json', import.meta.url)));
assert.equal(template.storyExplanationPolicy, policy);
assert.equal(visualTemplate.storyExplanationPolicy, policy);
assert.equal(visualTemplate.productionMode, 'LONGFORM_STANDARD_V1');
assert.ok(checkStoryScript(template, script).length, 'blank template cannot be approved');
for (const wording of ['batches of five video image numbers', 'batches of exactly 5', '5-image batches', '5-image batch', 'groups of 5']) assert.ok(hasFiveImageBatch(wording), wording);
for (const wording of ['batches of six images', 'groups of 6', 'batches of 50', '15-image batches', 'continue in batches']) assert.equal(hasFiveImageBatch(wording), false, wording);
console.log('STORY EXPLANATION SELFTEST: PASS — story/application order, missing quotes, unresolved review, audience-test honesty, label-only visuals, source references, per-scene prompt propagation, legacy compatibility.');
