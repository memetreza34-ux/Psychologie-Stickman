#!/usr/bin/env node
import assert from 'node:assert/strict';
import {CREATIVE_POLICY,checkCreativeVisualPlan,checkCreativeFlowPrompt,isFutureVideoProject} from './lib/creative-visual-qa.mjs';

const names=['parcel','doorway','memory_model','research_comparison','phone','spreadsheet','message','recall_note','desk','experiment','context','callback'];
const kinds=['OBJECT_FOCUS','CHARACTER_SCENE','SCHEMA_EXPLAINER','COMPARE_VISUAL','OBJECT_FOCUS','OBJECT_FOCUS','OBJECT_FOCUS','TEXT_ILLUSTRATION','ENVIRONMENT_SCENE','SCHEMA_EXPLAINER','ENVIRONMENT_SCENE','CHARACTER_SCENE'];
const functions=['HOOK','STORY_ACTION','MECHANISM','COMPARISON','EVIDENCE','STORY_ACTION','STORY_ACTION','TAKEAWAY','TRANSITION','MECHANISM','EVIDENCE','CALLBACK'];
const shots=['close','medium','diagram','mixed','macro','topdown','close','diagram','wide','diagram','wide','medium'];
const good={creativeVisualPolicy:CREATIVE_POLICY,scenes:names.map((name,i)=>({
scene:i+1,sceneType:kinds[i],visualFunction:functions[i],focalSubjectKey:name,
settingKey:i<4?'living_room':i<8?'home_office':'laboratory',
cameraScale:shots[i],
speechSection:'Narration about a specific psychological everyday experience with visual detail '+i,
informationGain:'The audience now sees a precise different relationship for story step '+i,
alternativeVisualType:kinds[i]==='CHARACTER_SCENE'?'OBJECT_FOCUS':'CHARACTER_SCENE',
alternativeRejectionReason:'The alternative would not explain this specific visual relationship as clearly.',
observableEvidence:'A concrete action and object relation changes in the depicted scene number '+i,
representationReason:'The selected representation visually explains the actual new fact.',
...(i===7?{flowText:'ERINNERUNG'}:{}),
...(i===2||i===9?{mechanismRenderingJustification:'The chosen structure makes the memory mechanism visibly testable in this exact shot.'}:{})
}))};
const ok=checkCreativeVisualPlan(good,'good');
assert.deepEqual(ok.failures,[],ok.failures.join('\n'));
assert.equal(isFutureVideoProject('youtube/2026-KW42_12.10-18.10/15.10.2026-old-v1'),false);
assert.equal(isFutureVideoProject('youtube/2026-KW42_12.10-18.10/16.10.2026-new-v1'),true);

const repeated=structuredClone(good);
for (let i=0;i<4;i++) {
 repeated.scenes[i].focalSubjectKey='doorway';
 repeated.scenes[i].settingKey='kitchen';
 repeated.scenes[i].cameraScale='medium';
}
const bad=checkCreativeVisualPlan(repeated,'bad');
assert.ok(bad.failures.some(x=>x.includes('nearly identical subject/location/camera')),JSON.stringify(bad.failures));

const copied=structuredClone(good);
copied.scenes[0].informationGain=copied.scenes[0].speechSection;
assert.ok(checkCreativeVisualPlan(copied,'copied').failures.some(x=>x.includes('cannot copy')), 'reject scene text copy');

const mechanic=structuredClone(good);
mechanic.scenes[2].sceneType='CHARACTER_SCENE';
delete mechanic.scenes[2].mechanismRenderingJustification;
mechanic.scenes[2].alternativeVisualType='OBJECT_FOCUS';
assert.ok(checkCreativeVisualPlan(mechanic,'mechanic').failures.some(x=>x.includes('needs a specific mechanismRenderingJustification')));

const flow=['CONTENT_FIRST_VISUAL_QA_V2','MECHANISM','SCHEMA_EXPLAINER','COMPARE_VISUAL','TEXT_ILLUSTRATION','NO REPETITIVE',...names.map((_,i)=>'BILD '+String(i+1).padStart(2,'0'))].join('\n');
assert.deepEqual(checkCreativeFlowPrompt(good,flow).failures,[]);
assert.ok(checkCreativeFlowPrompt(good,flow.replace('NO REPETITIVE','repeat')).failures.length);
console.log('CREATIVE VISUAL UNIT TESTS: PASS (valid plan, repeated subject, copied narration, mechanism gate, prompt markers, future-project gate)');
