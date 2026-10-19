#!/usr/bin/env node
import assert from 'node:assert/strict';
import {COVER_STYLE_POLICY, COVER_APPROVAL_POLICY, CHARACTER_REFERENCE_POLICY, checkFlowReferencePolicy} from './lib/flow-reference-policy.mjs';

const plan = {
  coverStyleReferencePolicy: COVER_STYLE_POLICY, coverApprovalPolicy: COVER_APPROVAL_POLICY,
  requireFinalCoverApproval: true, autoStartAfterCoverSelection: false,
  characterReferenceUsagePolicy: CHARACTER_REFERENCE_POLICY,
  characterReferences: [{file: 'character-reference-01.png'}],
  scenes: [
    {scene: 1, styleReferenceImage: '05-export/thumbnail.png', characterReferenceImages: ['character-reference-01.png']},
    {scene: 2, styleReferenceImage: '05-export/thumbnail.png', characterReferenceImages: []},
  ],
};
const prompt = `STAGE A — CHARACTER REFERENCES ONLY
STAGE B — THREE COVERS, THEN WAIT
A cover selection alone does not authorize scene generation.
REQUIRED FOR EVERY IMAGE, including object-only scenes, diagrams, comparisons and text illustrations.
STAGE C — SCENES AFTER FINAL COVER APPROVAL
BILD 01
STYLE REFERENCE: thumbnail.png — REQUIRED FOR THIS IMAGE.
CHARACTER REFERENCES: character-reference-01.png.
An identifiable recurring person.
BILD 02
STYLE REFERENCE: thumbnail.png — REQUIRED FOR THIS IMAGE.
CHARACTER REFERENCES: none.
A diagram without people.
FINAL QA
`;
assert.deepEqual(checkFlowReferencePolicy(plan, prompt), []);
assert.deepEqual(checkFlowReferencePolicy({}, ''), [], 'historical projects remain unchanged');
const automatic = structuredClone(plan); automatic.autoStartAfterCoverSelection = true;
assert.ok(checkFlowReferencePolicy(automatic, prompt).some(e => e.includes('beyond selection')));
assert.ok(checkFlowReferencePolicy(plan, prompt.replace('A cover selection alone does not authorize scene generation.', '')).length);
assert.ok(checkFlowReferencePolicy(plan, prompt.replace('STAGE A — CHARACTER REFERENCES ONLY', 'REFERENCES LATER')).some(e => e.includes('out of order')));
assert.ok(checkFlowReferencePolicy(plan, prompt.replace('BILD 02\nSTYLE REFERENCE: thumbnail.png — REQUIRED FOR THIS IMAGE.', 'BILD 02\nNO STYLE REFERENCE')).some(e => e.includes('scene 2')));
assert.ok(checkFlowReferencePolicy(plan, prompt.replace('CHARACTER REFERENCES: none.', 'CHARACTER REFERENCES: character-reference-01.png.')).some(e => e.includes('scene 2')));
const wrongCover = structuredClone(plan); wrongCover.scenes[1].styleReferenceImage = 'cover-candidate-01.png';
assert.ok(checkFlowReferencePolicy(wrongCover, prompt).some(e => e.includes('approved cover')));
const unknown = structuredClone(plan); unknown.scenes[0].characterReferenceImages = ['unknown.png'];
assert.ok(checkFlowReferencePolicy(unknown, prompt).some(e => e.includes('unknown/duplicate')));
console.log('FLOW REFERENCE SELFTEST: PASS — stage order, explicit final approval, cover in object/diagram scenes, selective character references, rejected-cover exclusion, legacy compatibility.');
