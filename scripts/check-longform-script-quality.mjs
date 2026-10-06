#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve('youtube');
const failures=[];
const warnings=[];
const plans=[];

const walk=(dir)=>{
  if(!fs.existsSync(dir)) return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(full);
    else if(entry.name==='phase1-scenes.json') plans.push(full);
  }
};
walk(root);

const norm=(value)=>String(value??'').replace(/\s+/gu,' ').trim().toLocaleLowerCase('de-DE');
const wc=(value)=>String(value??'').trim().split(/\s+/u).filter(Boolean).length;
const requiredText=(value,label,rel,min=10)=>{
  if(String(value??'').trim().length<min) failures.push(`${rel}: ${label} is missing/too short.`);
};

for(const phase1Path of plans){
  if(phase1Path.split(path.sep).includes('00-vorlage')) continue;
  let phase1;
  try{ phase1=JSON.parse(fs.readFileSync(phase1Path,'utf8')); }
  catch{ failures.push(`${path.relative(process.cwd(),phase1Path)}: invalid JSON.`); continue; }

  if(phase1.productionMode!=='LONGFORM_STANDARD_V1') continue;
  const rel=path.relative(process.cwd(),phase1Path);
  const policy=String(phase1.longformScriptPolicy??'').trim();

  if(policy==='LEGACY_PRE_LONGFORM_STORY_RETENTION_V1'){
    warnings.push(`${rel}: legacy longform predates LONGFORM_STORY_RETENTION_V1; no retroactive rewrite enforced.`);
    continue;
  }
  if(policy!=='LONGFORM_STORY_RETENTION_V1'){
    failures.push(`${rel}: LONGFORM_STANDARD_V1 requires longformScriptPolicy=LONGFORM_STORY_RETENTION_V1.`);
    continue;
  }

  const projectDir=path.dirname(path.dirname(phase1Path));
  const scriptPath=path.join(projectDir,'01-script','script.txt');
  const scriptPlanPath=path.join(projectDir,'99-intern','script-plan.json');

  if(!fs.existsSync(scriptPath)){ failures.push(`${rel}: missing 01-script/script.txt.`); continue; }
  if(!fs.existsSync(scriptPlanPath)){ failures.push(`${rel}: missing required 99-intern/script-plan.json.`); continue; }

  const script=fs.readFileSync(scriptPath,'utf8').trim();
  let plan;
  try{ plan=JSON.parse(fs.readFileSync(scriptPlanPath,'utf8')); }
  catch{ failures.push(`${rel}: script-plan.json is invalid JSON.`); continue; }

  if(plan.policy!=='LONGFORM_STORY_RETENTION_V1') failures.push(`${rel}: script-plan policy mismatch.`);
  if(plan.status!=='APPROVED') failures.push(`${rel}: script-plan status must be APPROVED before Phase 1.`);

  const targetMin=Number(plan?.targetWords?.min??850);
  const targetMax=Number(plan?.targetWords?.max??1100);
  const words=wc(script);
  if(words<targetMin || words>targetMax){
    if(String(plan.wordCountJustification??'').trim().length<20){
      failures.push(`${rel}: script has ${words} words; target is ${targetMin}-${targetMax} and no wordCountJustification is provided.`);
    }
  }

  for(const [key,label] of [['hook','structure.hook'],['introduction','structure.introduction'],['mainPart','structure.mainPart'],['conclusion','structure.conclusion']]){
    requiredText(plan?.structure?.[key],label,rel,15);
  }

  const scriptNorm=norm(script);
  const anchor=norm(plan?.narrativeSpine?.anchorPhrase);
  const callback=norm(plan?.narrativeSpine?.callbackPhrase);
  const midpoint=norm(plan?.retention?.midpointReengagementPhrase);
  requiredText(anchor,'narrativeSpine.anchorPhrase',rel,8);
  requiredText(callback,'narrativeSpine.callbackPhrase',rel,8);
  requiredText(midpoint,'retention.midpointReengagementPhrase',rel,8);

  if(anchor){
    const i=scriptNorm.indexOf(anchor);
    if(i<0) failures.push(`${rel}: approved anchorPhrase is not found in script.`);
    else if(i/scriptNorm.length>0.22) failures.push(`${rel}: narrative anchor appears too late; introduce it in the opening.`);
  }
  if(callback){
    const i=scriptNorm.lastIndexOf(callback);
    if(i<0) failures.push(`${rel}: approved spoken callbackPhrase is not found in script.`);
    else if(i/scriptNorm.length<0.58) failures.push(`${rel}: callbackPhrase must return in the second half/final third.`);
  }
  if(midpoint){
    const i=scriptNorm.indexOf(midpoint);
    if(i<0) failures.push(`${rel}: midpoint re-engagement phrase is not found in script.`);
    else {
      const ratio=i/scriptNorm.length;
      if(ratio<0.28 || ratio>0.78) failures.push(`${rel}: midpoint re-engagement should occur in the middle portion of the script.`);
    }
  }

  if(plan?.research?.mode!=='STORY_FIRST_SOURCES_SECOND'){
    failures.push(`${rel}: research.mode must be STORY_FIRST_SOURCES_SECOND.`);
  }
  const names=Array.isArray(plan?.research?.spokenResearchNames)?plan.research.spokenResearchNames:[];
  if(names.length>6) failures.push(`${rel}: ${names.length} spoken researcher names listed; maximum is 6.`);
  for(const name of names){
    if(!scriptNorm.includes(norm(name))) failures.push(`${rel}: listed spoken researcher name "${name}" is not found in script.`);
  }
  const years=(script.match(/\b(?:19|20)\d{2}\b/gu)??[]);
  if(years.length>4) failures.push(`${rel}: ${years.length} explicit year mentions found; maximum is 4.`);
  if(Number(plan?.qa?.yearMentionsSpokenCount)!==years.length){
    failures.push(`${rel}: qa.yearMentionsSpokenCount must match actual script count (${years.length}).`);
  }
  if(Number(plan?.qa?.namedResearchersSpokenCount)!==names.length){
    failures.push(`${rel}: qa.namedResearchersSpokenCount must equal spokenResearchNames length (${names.length}).`);
  }
  if(Number(plan?.qa?.maxConsecutiveNamedResearchBlocks)>2){
    failures.push(`${rel}: more than 2 named research blocks are planned back-to-back.`);
  }
  if(Number(plan?.qa?.maxConsecutiveMicroExamples)>3){
    failures.push(`${rel}: more than 3 micro-examples are planned back-to-back.`);
  }
  const deepExamples=Array.isArray(plan?.examples?.substantialExamples)?plan.examples.substantialExamples:[];
  if(deepExamples.length<2) failures.push(`${rel}: at least 2 substantial examples/experiments are required.`);
  if(Number(plan?.qa?.deepExampleCount)!==deepExamples.length){
    failures.push(`${rel}: qa.deepExampleCount must equal substantialExamples length (${deepExamples.length}).`);
  }
  requiredText(plan?.examples?.synthesisAfterExampleRuns,'examples.synthesisAfterExampleRuns',rel,12);
  requiredText(plan?.ending?.practicalTakeaway,'ending.practicalTakeaway',rel,12);
  requiredText(plan?.ending?.finalLine,'ending.finalLine',rel,8);

  const finalLine=norm(plan?.ending?.finalLine);
  if(finalLine && !scriptNorm.endsWith(finalLine)){
    failures.push(`${rel}: script must end on the approved finalLine; do not keep talking after the strongest ending.`);
  }
}

if(warnings.length){
  console.warn('\nLONGFORM SCRIPT QA: WARNINGS\n');
  warnings.forEach((x)=>console.warn(`- ${x}`));
}
if(failures.length){
  console.error('\nLONGFORM SCRIPT QA: FAIL\n');
  failures.forEach((x)=>console.error(`- ${x}`));
  process.exit(1);
}
console.log('\nLONGFORM SCRIPT QA: PASS\n');
