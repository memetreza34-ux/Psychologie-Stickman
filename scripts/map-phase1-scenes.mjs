#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const [wordTimingPath, phase1PlanPath, outputPath] = process.argv.slice(2);
if(!wordTimingPath||!phase1PlanPath||!outputPath){console.error('Usage: npm run map:phase1 -- <word-timings.json> <phase1-scenes.json> <scene-plan.json>');process.exit(1);}
const read=(p)=>JSON.parse(fs.readFileSync(path.resolve(p),'utf8')); const words=read(wordTimingPath); const phase1=read(phase1PlanPath); const scenes=phase1.scenes??[];
const norm=(v)=>String(v??'').normalize('NFKC').toLocaleLowerCase('de-DE').replace(/[„“”"‚‘’'`´….,!?;:()\[\]{}<>/\\|+*=~_^%$#@&–—-]/g,'').replace(/\s+/g,'').trim();
const toks=(v)=>String(v??'').trim().split(/\s+/).map(norm).filter(Boolean); const timing=words.map(w=>norm(w.text)); const starts=[]; let min=0;
for(const scene of scenes){const p=toks(scene.startPhrase);const matches=[];for(let i=min;i<=timing.length-p.length;i++){if(p.every((t,j)=>timing[i+j]===t))matches.push(i);}if(matches.length!==1){console.error(`Scene ${scene.scene}: startPhrase must map exactly once.`);process.exit(1);}starts.push(matches[0]+1);min=matches[0]+p.length;}
if(starts[0]!==1){console.error('Scene 1 must start at word 1.');process.exit(1);} scenes.forEach((scene,index)=>{const s=starts[index]-1;const e=index+1<starts.length?starts[index+1]-2:words.length-1;const planned=toks(scene.speechSection);const actual=timing.slice(s,e+1);if(planned.length!==actual.length||planned.some((t,i)=>t!==actual[i])){throw new Error(`Scene ${scene.scene}: speechSection mismatch.`);}if(norm(scene.endWord)!==timing[e])throw new Error(`Scene ${scene.scene}: endWord mismatch.`);});
const out={format:String(phase1.format).toLowerCase(),audio:phase1.audio,imageBasePath:phase1.imageBasePath,sceneStartWords:starts,imageExtension:String(phase1.imageExtension??'png').replace(/^\./,''),...(Number.isFinite(phase1.imageDigits)?{imageDigits:phase1.imageDigits}:{}),...(Number.isFinite(phase1.endHoldMs)?{endHoldMs:phase1.endHoldMs}:{})};
fs.mkdirSync(path.dirname(path.resolve(outputPath)),{recursive:true});fs.writeFileSync(path.resolve(outputPath),`${JSON.stringify(out,null,2)}\n`);console.log('PHASE 1 MAP: PASS');
