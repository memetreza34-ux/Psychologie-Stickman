#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {checkCreativeVisualPlan,checkCreativeFlowPrompt,needsCreativeReview} from './lib/creative-visual-qa.mjs';

const input=process.argv.slice(2).find(x=>!x.startsWith('--'));
const roots=input?[path.resolve(input)]:[path.resolve('youtube')];
const plans=[];
const visit=(p)=>{
 if(!fs.existsSync(p))throw new Error('Path not found: '+p);
 const stat=fs.statSync(p);
 if(stat.isDirectory()){
   if(path.basename(p)==='00-vorlage')return;
   for(const entry of fs.readdirSync(p,{withFileTypes:true}))if(entry.isDirectory()||entry.name==='phase1-scenes.json')visit(path.join(p,entry.name));
 } else if(path.basename(p)==='phase1-scenes.json')plans.push(p);
};
roots.forEach(visit);
if(!plans.length)throw new Error('No Phase-1 plans found.');
const problems=[], warnings=[];
let checked=0, legacy=0;
for(const file of plans) {
 const projectDir=path.dirname(path.dirname(file));
 const relative=path.relative(process.cwd(),projectDir).replace(/\\/g,'/');
 const plan=JSON.parse(fs.readFileSync(file,'utf8'));
 if(!needsCreativeReview(plan,relative)){legacy++;continue;}
 if(!Array.isArray(plan.scenes)||!plan.scenes.length) {
    if(plan.status==='PENDING') {warnings.push(relative+': draft plan not ready for creative approval.');continue;}
    problems.push(relative+': empty scene plan cannot be approved.');continue;
 }
 checked++;
 const result=checkCreativeVisualPlan(plan,relative);
 problems.push(...result.failures);warnings.push(...result.warnings);
 const prompt=path.join(projectDir,'02-google-flow','google-flow-prompt.txt');
 if(!fs.existsSync(prompt))problems.push(relative+': Google Flow master prompt missing.');
 else problems.push(...checkCreativeFlowPrompt(plan,fs.readFileSync(prompt,'utf8'),relative+'/02-google-flow/google-flow-prompt.txt').failures);
 if(!result.failures.length)console.log('CREATIVE VISUAL QA: PLAN PASS '+relative+' — '+JSON.stringify(result.summary));
}
for(const w of warnings)console.warn('CREATIVE VISUAL QA: WARNING '+w);
if(problems.length){problems.forEach(p=>console.error('CREATIVE VISUAL QA: FAIL '+p));process.exit(1);}
console.log('CREATIVE VISUAL QA: PASS — '+checked+' V2 plans reviewed; '+legacy+' historical plans unchanged.');
