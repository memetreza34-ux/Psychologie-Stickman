#!/usr/bin/env node
// Ensure every V2 card survives the generator and the prompt.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {flowTextFor,validateFlowCard} from './lib/v2-flow-text.mjs';
assert.ok(validateFlowCard({type:'keyword',text:'Test',sub:'eins zwei drei vier fünf sechs'}).some(x=>x.includes('NOT be dropped')));
assert.deepEqual(flowTextFor({type:'keyword',text:'Test',sub:'eins zwei drei vier fünf sechs'}),['Test','eins zwei drei vier fünf sechs']);
const projects=[];
function walk(dir){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(e.name==='00-vorlage')continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory())walk(p);
    else if(e.name==='shotlist.json')projects.push(path.dirname(path.dirname(p)));
  }
}
walk(path.resolve('youtube'));
let cardCount=0,shotsCount=0;
for(const project of projects){
  const list=JSON.parse(fs.readFileSync(path.join(project,'99-intern','shotlist.json'),'utf8'));
  const phase=JSON.parse(fs.readFileSync(path.join(project,'99-intern','phase1-scenes.json'),'utf8'));
  if(phase.workflowVersion!=='V2')continue;
  const prompt=fs.readFileSync(path.join(project,'02-google-flow','google-flow-prompt.txt'),'utf8');
  assert.equal(phase.scenes.length,list.shots.length,project+': shot count');
  list.shots.forEach((shot,i)=>{
    const id=String(i+1).padStart(2,'0');
    const start=prompt.indexOf('\nBILD '+id+'\n');
    assert.ok(start>=0,project+' BILD '+id+' missing');
    const next=prompt.indexOf('\n\nBILD '+String(i+2).padStart(2,'0')+'\n',start+1);
    const segment=prompt.slice(start,next<0?undefined:next);
    if(shot.card){
      assert.deepEqual(validateFlowCard(shot.card),[],project+' card '+id);
      const texts=flowTextFor(shot.card);
      assert.deepEqual(phase.scenes[i].flowText,texts,project+' plan '+id);
      for(const text of texts)assert.ok(segment.includes('"'+text+'"'),project+' prompt BILD '+id+' lost '+text);
      cardCount++;
    }else assert.ok(!phase.scenes[i].flowText?.length,project+' unexpected text BILD '+id);
    shotsCount++;
  });
}
console.log('V2 FLOW TEXT QA: PASS — '+projects.length+' V2 project(s), '+shotsCount+' scenes, '+cardCount+' cards.');
