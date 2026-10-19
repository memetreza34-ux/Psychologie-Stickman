#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {listYouTubeProjects} from './lib/youtube-week-folders.mjs';
import {checkFlowReferencePolicy} from './lib/flow-reference-policy.mjs';

const POLICY='COVER_ONCE_AUTOCONTINUE_FINAL_QA_V1';
const failures=[];
const read=p=>fs.readFileSync(p,'utf8');
const plans=['youtube/00-vorlage/thema-vorlage/99-intern/phase1-scenes.json'];
for(const project of listYouTubeProjects()){
  const p=path.join(project,'99-intern','phase1-scenes.json');
  if(fs.existsSync(p)){
    const data=JSON.parse(read(p));
    if(data.flowAutonomyPolicy===POLICY) plans.push(p);
  }
}
for(const phase1 of plans){
  const config=JSON.parse(read(phase1));
  if(config.flowAutonomyPolicy!==POLICY)failures.push(phase1+': missing flowAutonomyPolicy.');
  const master=path.join(path.dirname(path.dirname(phase1)),'02-google-flow','google-flow-prompt.txt');
  if(!fs.existsSync(master)){failures.push(master+': missing master prompt');continue;}
  const text=read(master);
  failures.push(...checkFlowReferencePolicy(config, text, master));
  const required=[
    [POLICY,'autonomy policy marker'],
    ['STOP','single cover pause'],
    ['delete','delete losing covers'],
    ['rejected','rejected-cover cleanup'],
    ['without asking','no approval pauses'],
    ['batch','continuous five-image batching'],
    ['03-bilder/','single image folder'],
    ...(config.thumbnailGenerationPolicy === 'THUMBNAIL_SEPARATE_FROM_SCENE01_V1' ? [['05-export/thumbnail.png','independent thumbnail destination'],['BILD 01','first real scene']] : []),
    ['NN.png','numbered file naming'],
    ['FINAL','final QA'],
    ['missing','missing-file recovery']
  ];
  for(const [token,label] of required)if(!text.toLowerCase().includes(token.toLowerCase()))failures.push(master+': missing '+label);
}
const rule=read('rules/FLOW_OUTPUT_MODE.md');
if(!rule.includes('THUMBNAIL_SEPARATE_FROM_SCENE01_V1'))failures.push('Flow output rule missing current separate-thumbnail policy.');
if(failures.length){
  console.error('FLOW AUTONOMY POLICY: FAIL');
  failures.forEach(x=>console.error('- '+x));
  process.exit(1);
}
console.log('FLOW AUTONOMY POLICY: PASS — '+plans.length+' template/opted-in project prompts verified.');
