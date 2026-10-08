#!/usr/bin/env node
// Regression: real newline-separated upload text, readable transcript and YouTube SRT.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=path.resolve('youtube');
fs.mkdirSync(root,{recursive:true});
const dir=fs.mkdtempSync(path.join(root,'.qa-youtube-export-'));
const rel=path.relative(path.resolve('.'),dir);
const internal=path.join(dir,'99-intern'),scripts=path.join(dir,'01-script'),out=path.join(dir,'05-export');
fs.mkdirSync(internal);fs.mkdirSync(scripts);fs.mkdirSync(out);
const run=(script)=>{
  const p=spawnSync(process.execPath,[script,rel],{encoding:'utf8'});
  if(p.status!==0)throw Error(script+' failed: '+p.stderr+'\n'+p.stdout);
};
try{
  fs.writeFileSync(path.join(scripts,'script.txt'),'Warum dauert dieses Projekt länger? Wir schauen genauer hin.','utf8');
  fs.writeFileSync(path.join(internal,'word-timings.json'),JSON.stringify([
    {text:'Warum',startMs:0,endMs:280},{text:'dauert',startMs:280,endMs:600},
    {text:'dieses',startMs:600,endMs:920},{text:'Projekt',startMs:920,endMs:1260},
    {text:'länger?',startMs:1260,endMs:1650},{text:'Wir',startMs:1700,endMs:1950},
    {text:'schauen',startMs:1950,endMs:2350},{text:'genauer',startMs:2350,endMs:2650},
    {text:'hin.',startMs:2650,endMs:3030}
  ]),'utf8');
  fs.writeFileSync(path.join(internal,'youtube-upload.json'),JSON.stringify({
    title:'Warum dauert das so lange?',description:'Testbeschreibung zur deutschen Psychologie.',
    sources:['https://example.org/source'],tags:['Psychologie'],hashtags:['#Psychologie']
  }),'utf8');
  run('scripts/generate-youtube-upload.mjs');
  run('scripts/generate-youtube-captions.mjs');
  const upload=fs.readFileSync(path.join(out,'youtube-upload.txt'),'utf8');
  const srt=fs.readFileSync(path.join(out,'captions.srt'),'utf8');
  const txt=fs.readFileSync(path.join(out,'subtitle-script.txt'),'utf8');
  if(!upload.includes('TITEL:\nWarum dauert das so lange?'))throw Error('Copy title missing/incorrect line breaks');
  if(!upload.includes('BESCHREIBUNG:\nTestbeschreibung zur deutschen Psychologie.'))throw Error('Copy description missing/incorrect line breaks');
  if(!srt.includes('00:00:00,000 --> 00:00:'))throw Error('Invalid SRT timestamp format');
  if(!txt.includes('00:00–00:'))throw Error('Readable copy transcript has no compact time range');
  if(!txt.includes('Warum dauert dieses Projekt länger?'))throw Error('Transcript did not contain spoken words');
  if(!srt.includes('\n\n'))throw Error('Subtitles lack separated SRT cues');
  console.log('YOUTUBE EXPORT GENERATORS: PASS — copy-ready metadata, readable timestamp transcript, valid SRT layout');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
