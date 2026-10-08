#!/usr/bin/env node
// Complete export files from an EXISTING MP4 without modifying the video.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {resolveProjectPath} from './lib/word-timing-alignment.mjs';

const args=process.argv.slice(2);
const project=args[0];
if(!project||project.startsWith('--'))throw Error('Usage: npm run finalize:youtube -- <youtube/project> [--force-timings]');
const {projectDir,relative}=resolveProjectPath(project,path.resolve('.'));
const exportDir=path.join(projectDir,'05-export');
const intern=path.join(projectDir,'99-intern');
const phase=JSON.parse(fs.readFileSync(path.join(intern,'phase1-scenes.json'),'utf8'));
const hasFile=(file)=>fs.existsSync(file)&&fs.statSync(file).isFile()&&fs.statSync(file).size>0;
const thumbnail=path.join(exportDir,'thumbnail.png');
if(!fs.existsSync(exportDir))throw Error('Export folder missing. Render MP4 first.');
const videos=fs.readdirSync(exportDir).filter(x=>x.toLowerCase().endsWith('.mp4'));
const video=videos.includes('final.mp4')?'final.mp4':videos.length===1?videos[0]:null;
if(!video)throw Error('No unique final MP4 in 05-export/. Existing video will not be changed.');
const mp4=path.join(exportDir,video);
if(fs.statSync(mp4).size<100000)throw Error('MP4 appears incomplete.');
if(phase.thumbnailGenerationPolicy==='THUMBNAIL_SEPARATE_FROM_SCENE01_V1' && !hasFile(thumbnail))throw Error('Select a separate 05-export/thumbnail.png first; video scene 01 is NOT a cover.');
const run=(parts)=>{const r=spawnSync(process.execPath,parts,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw Error(parts[0]+' exited '+r.status);};
const timings=path.join(intern,'word-timings.json');
const legacy=path.join(intern,'projektdateien','word-timings.json');
if(args.includes('--force-timings') || !(hasFile(timings)||hasFile(legacy))) {
  run(['scripts/generate-word-timings.mjs',relative,'--audio-source',mp4,...(args.includes('--force-timings')?['--force']:[])]);
}
if(!hasFile(timings)&&!hasFile(legacy))throw Error('Missing real word timings; cannot fabricate subtitle times.');
for(const [cmd,names] of [
  ['scripts/generate-youtube-upload.mjs',['youtube-upload.txt']],
  ['scripts/generate-youtube-captions.mjs',['captions.srt','subtitle-script.txt']]
]){
  const existing=names.filter(n=>hasFile(path.join(exportDir,n)));
  if(existing.length===names.length){console.log('REUSE: '+names.join(', '));continue;}
  if(existing.length)throw Error('Partial existing output '+existing.join(', ')+'; refusing to overwrite.');
  run([cmd,relative]);
}
for(const f of ['youtube-upload.txt','captions.srt','subtitle-script.txt'])if(!hasFile(path.join(exportDir,f)))throw Error('Final export missing '+f);
console.log('YOUTUBE EXPORT: PASS — '+video+' + separate thumbnail + upload metadata + SRT + timed transcript');
console.log('Files are in '+path.relative(path.resolve('.'),exportDir));
