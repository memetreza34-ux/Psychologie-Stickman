#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const PNG_SIGNATURE=Buffer.from([137,80,78,71,13,10,26,10]);

function pngDimensions(file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error('Missing image: '+file);
  if (fs.statSync(file).size < 100) throw new Error('Empty or invalid small PNG: '+file);
  const header=Buffer.alloc(24);
  const fd=fs.openSync(file,'r');
  try {
    if(fs.readSync(fd,header,0,24,0)!==24) throw new Error('Short PNG header: '+file);
  } finally {fs.closeSync(fd);}
  if(!header.subarray(0,8).equals(PNG_SIGNATURE) || header.toString('ascii',12,16)!=='IHDR') {
    throw new Error('Not a PNG with an IHDR header: '+file);
  }
  const width=header.readUInt32BE(16),height=header.readUInt32BE(20);
  if(!width || !height || width*9!==height*16) throw new Error('Not a 16:9 PNG: '+file+' ('+width+'x'+height+')');
  return {width,height};
}

function finalImageName(n,count){
  return String(n).padStart(Math.max(2,String(count).length),'0')+'.png';
}

function selectCover(imageDir,selected) {
  if(![1,2,3].includes(selected)) throw new Error('Cover selection must be 1, 2, or 3.');
  const originals=[1,2,3].map(n=>path.join(imageDir,'cover-candidate-'+String(n).padStart(2,'0')+'.png'));
  const target=path.join(imageDir,'01.png');
  if(fs.existsSync(target)) throw new Error('01.png already exists; refusing to overwrite the selected cover.');
  originals.forEach(pngDimensions);
  const accepted=originals[selected-1];
  fs.renameSync(accepted,target);
  originals.filter(f=>f!==accepted).forEach(f=>fs.unlinkSync(f));
  console.log('FLOW COVER: PASS — selected '+selected+' -> 03-bilder/01.png; two rejected cover candidates deleted.');
}

function verify(imageDir,total){
  if(!Number.isInteger(total)||total<1) throw new Error('Missing or invalid number of planned scenes.');
  if(!fs.existsSync(imageDir)) throw new Error('Missing 03-bilder/ folder.');
  const entries=fs.readdirSync(imageDir,{withFileTypes:true});
  const expected=new Set(Array.from({length:total},(_,i)=>finalImageName(i+1,total)));
  const present=new Set();
  const failures=[];
  for(const entry of entries){
    if(entry.isFile() && ['.gitkeep','.DS_Store'].includes(entry.name)) continue;
    if(!entry.isFile()){failures.push('Unexpected subfolder/link: '+entry.name);continue;}
    if(!expected.has(entry.name)){failures.push('Unexpected file / leftover cover: '+entry.name);continue;}
    present.add(entry.name);
    try {pngDimensions(path.join(imageDir,entry.name));}
    catch(error){failures.push(error.message);}
  }
  for(const file of expected) if(!present.has(file)) failures.push('Missing: '+file);
  if(failures.length) {
    console.error('FLOW IMAGE FINAL QA: FAIL — '+failures.length+' problem(s):');
    failures.forEach(x=>console.error('- '+x));
    return false;
  }
  console.log('FLOW IMAGE FINAL QA: PASS — '+total+' numbered separate 16:9 PNG assets, no gaps, rejected cover candidates, extras or subfolders.');
  console.log('NOTE: visual subject, style/species and accidental text still require visual review.');
  return true;
}

function projectFolder(arg){
  if(!arg) throw new Error('Usage: npm run flow:cover -- <youtube/project> <1|2|3> OR npm run flow:verify -- <youtube/project>');
  const repoRoot=path.resolve('.');
  const relative=path.relative(repoRoot,path.resolve(arg)).replaceAll('\\','/');
  if(!relative.startsWith('youtube/') || relative.startsWith('youtube/00-vorlage/') || relative.includes('/../')) {
    throw new Error('Project must be an existing video project under youtube/, not the template.');
  }
  const dir=path.join(repoRoot,relative);
  const planPath=path.join(dir,'99-intern','phase1-scenes.json');
  if(!fs.existsSync(planPath)) throw new Error('Missing project phase1-scenes.json');
  const plan=JSON.parse(fs.readFileSync(planPath,'utf8'));
  if(!Array.isArray(plan.scenes)||!plan.scenes.length) throw new Error('No planned scenes');
  return {imageDir:path.join(dir,'03-bilder'),total:plan.scenes.length};
}

function mockImage(file,width=1600,height=900){
  const b=Buffer.alloc(128);
  PNG_SIGNATURE.copy(b,0);
  b.writeUInt32BE(13,8);
  b.write('IHDR',12,'ascii');
  b.writeUInt32BE(width,16);b.writeUInt32BE(height,20);
  fs.writeFileSync(file,b);
}

function selfTest(){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'flow-image-pack-'));
  try{
    for(let i=1;i<=3;i++)mockImage(path.join(dir,'cover-candidate-'+String(i).padStart(2,'0')+'.png'));
    selectCover(dir,2);
    if(!fs.existsSync(path.join(dir,'01.png')))throw new Error('Self-test: winning cover missing');
    if(fs.readdirSync(dir).some(n=>n.startsWith('cover-candidate')))throw new Error('Self-test: losing covers not deleted');
    mockImage(path.join(dir,'02.png'));mockImage(path.join(dir,'03.png'));
    if(!verify(dir,3))throw new Error('Self-test: complete pack was rejected');
    fs.unlinkSync(path.join(dir,'02.png'));
    if(verify(dir,3))throw new Error('Self-test: missing asset was accepted');
    mockImage(path.join(dir,'02.png'),800,600);
    if(verify(dir,3))throw new Error('Self-test: wrong-aspect asset was accepted');
    fs.unlinkSync(path.join(dir,'02.png'));mockImage(path.join(dir,'02.png'));
    fs.mkdirSync(path.join(dir,'batch-1'));
    if(verify(dir,3))throw new Error('Self-test: batch subfolder was accepted');
    console.log('FLOW IMAGE PACK SELF-TEST: PASS');
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
}

const command=process.argv[2];
if(command==='self-test'){selfTest();}
else if(command==='cover'){
  const {imageDir}=projectFolder(process.argv[3]);
  selectCover(imageDir,Number(process.argv[4]));
}else if(command==='verify'){
  const {imageDir,total}=projectFolder(process.argv[3]);
  if(!verify(imageDir,total))process.exitCode=1;
}else{
  console.error('Usage: node scripts/flow-image-pack.mjs cover <youtube/project> <1|2|3> | verify <youtube/project> | self-test');
  process.exitCode=1;
}
