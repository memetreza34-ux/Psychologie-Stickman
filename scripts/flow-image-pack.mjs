#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {deflateSync,inflateSync} from 'node:zlib';

const PNG_SIGNATURE=Buffer.from([137,80,78,71,13,10,26,10]);

const CRC=Uint32Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
function crc32(buffer){let c=0xffffffff;for(const b of buffer)c=CRC[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0;}
function chunk(type,body){const tag=Buffer.from(type),len=Buffer.alloc(4),crc=Buffer.alloc(4);len.writeUInt32BE(body.length);crc.writeUInt32BE(crc32(Buffer.concat([tag,body])));return Buffer.concat([len,tag,body,crc]);}
function pngDimensions(file){
  if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw Error('Missing image: '+file);
  const data=fs.readFileSync(file);
  const fail=reason=>{throw Error('Invalid PNG '+file+': '+reason);};
  if(data.length<57||!data.subarray(0,8).equals(PNG_SIGNATURE))fail('signature or incomplete file');
  let i=8,header=null,finished=false;
  const compressed=[];
  while(i<data.length){
    if(i+12>data.length)fail('truncated chunk header');
    const size=data.readUInt32BE(i),end=i+size+12;
    if(end>data.length)fail('truncated chunk');
    const type=data.toString('ascii',i+4,i+8),dataStart=i+8,body=data.subarray(dataStart,dataStart+size);
    if(crc32(data.subarray(i+4,dataStart+size))!==data.readUInt32BE(dataStart+size))fail(type+' CRC mismatch');
    if(!header&&type!=='IHDR')fail('IHDR must be first');
    if(type==='IHDR'){
      if(header||size!==13)fail('invalid IHDR');
      const width=body.readUInt32BE(0),height=body.readUInt32BE(4),depth=body[8],ct=body[9],interlace=body[12];
      const channels={0:1,2:3,3:1,4:2,6:4}[ct];
      const depths={0:[1,2,4,8,16],2:[8,16],3:[1,2,4,8],4:[8,16],6:[8,16]};
      if(!width||!height||width*9!==height*16)fail('wrong 16:9 ratio');
      if(!channels||!depths[ct].includes(depth)||body[10]!==0||body[11]!==0||![0,1].includes(interlace))fail('invalid image encoding');
      header={width,height,depth,channels,interlace};
    }else if(type==='IDAT')compressed.push(body);
    else if(type==='IEND'){
      if(size!==0||end!==data.length)fail('bad IEND or extra trailing bytes');
      finished=true;break;
    }
    i=end;
  }
  if(!header||!compressed.length||!finished)fail('missing essential PNG chunks');
  const passes=header.interlace?[[0,0,8,8],[4,0,8,8],[0,4,4,8],[2,0,4,4],[0,2,2,4],[1,0,2,2],[0,1,1,2]]:[[0,0,1,1]];
  let expected=0;const rows=[];
  for(const [sx,sy,dx,dy] of passes){
    const w=Math.max(0,Math.ceil((header.width-sx)/dx)),h=Math.max(0,Math.ceil((header.height-sy)/dy));
    if(w&&h){const stride=1+Math.ceil(w*header.channels*header.depth/8);expected+=stride*h;rows.push({stride,h});}
  }
  if(expected>256*1024*1024)fail('uncompressed PNG too large');
  let raw;
  try{raw=inflateSync(Buffer.concat(compressed),{maxOutputLength:256*1024*1024});}
  catch(e){fail('invalid compressed pixel data: '+e.message);}
  if(raw.length!==expected)fail('pixel data length mismatch');
  let offset=0;
  for(const {stride,h} of rows)for(let n=0;n<h;n++,offset+=stride)if(raw[offset]>4)fail('invalid PNG scanline filter');
  return {width:header.width,height:header.height};
}

function finalImageName(n,count){
  return String(n).padStart(Math.max(2,String(count).length),'0')+'.png';
}

// V2 (oneFolder): Cover bleibt als 00-cover.png zusammen mit allen Bildern in 03-bilder/.
const COVER_IN_FOLDER='00-cover.png';

function selectCover(imageDir,selected,separate=false,oneFolder=false) {
  if(![1,2,3].includes(selected)) throw new Error('Cover selection must be 1, 2, or 3.');
  const originals=[1,2,3].map(n=>path.join(imageDir,'cover-candidate-'+String(n).padStart(2,'0')+'.png'));
  const target=oneFolder ? path.join(imageDir,COVER_IN_FOLDER) : separate ? path.join(path.dirname(imageDir),'05-export','thumbnail.png') : path.join(imageDir,'01.png');
  if(fs.existsSync(target)) throw new Error('Selected thumbnail/01.png already exists; refusing to overwrite it.');
  originals.forEach(pngDimensions);
  const accepted=originals[selected-1];
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.renameSync(accepted,target);
  originals.filter(f=>f!==accepted).forEach(f=>fs.unlinkSync(f));
  console.log('FLOW COVER: PASS — selected '+selected+' -> '+(oneFolder?'03-bilder/'+COVER_IN_FOLDER:separate?'05-export/thumbnail.png':'03-bilder/01.png')+'; two rejected candidates deleted.');
}

function verify(imageDir,total,separate=false,oneFolder=false){
  if(!Number.isInteger(total)||total<1) throw new Error('Missing or invalid number of planned scenes.');
  const thumbnail=path.join(path.dirname(imageDir),'05-export','thumbnail.png');
  if(!oneFolder && separate)pngDimensions(thumbnail);
  if(!fs.existsSync(imageDir)) throw new Error('Missing 03-bilder/ folder.');
  const entries=fs.readdirSync(imageDir,{withFileTypes:true});
  const expected=new Set(Array.from({length:total},(_,i)=>finalImageName(i+1,total)));
  if(oneFolder)expected.add(COVER_IN_FOLDER);
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
  console.log('FLOW IMAGE FINAL QA: PASS — '+(oneFolder?COVER_IN_FOLDER+' + ':'')+total+' numbered separate 16:9 PNG assets, no gaps, rejected cover candidates, extras or subfolders.');
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
  return {imageDir:path.join(dir,'03-bilder'),total:plan.scenes.length,separate:plan.thumbnailGenerationPolicy==='THUMBNAIL_SEPARATE_FROM_SCENE01_V1',oneFolder:plan.workflowVersion==='V2'};
}

function mockImage(file,width=160,height=90){
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=0;
  const raw=Buffer.alloc((width+1)*height);
  fs.writeFileSync(file,Buffer.concat([PNG_SIGNATURE,chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
}

function selfTest(){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'flow-image-pack-'));
  const img=path.join(root,'03-bilder');
  fs.mkdirSync(img);
  try {
    for(let i=1;i<=3;i++)mockImage(path.join(img,'cover-candidate-'+String(i).padStart(2,'0')+'.png'));
    selectCover(img,2,true);
    if(!fs.existsSync(path.join(root,'05-export','thumbnail.png')))throw Error('Missing separate winning thumbnail');
    if(fs.existsSync(path.join(img,'01.png')))throw Error('Thumbnail was used as first scene');
    if(fs.readdirSync(img).some(v=>v.startsWith('cover-candidate')))throw Error('Losing covers were not deleted');
    mockImage(path.join(img,'01.png'));mockImage(path.join(img,'02.png'));mockImage(path.join(img,'03.png'));
    if(!verify(img,3,true))throw Error('Complete scene set rejected');
    fs.unlinkSync(path.join(img,'02.png'));
    if(verify(img,3,true))throw Error('Missing scene accepted');
    mockImage(path.join(img,'02.png'),800,600);
    if(verify(img,3,true))throw Error('Wrong scene dimensions accepted');
    fs.unlinkSync(path.join(img,'02.png'));mockImage(path.join(img,'02.png'));
    fs.mkdirSync(path.join(img,'batch-1'));
    if(verify(img,3,true))throw Error('Subfolder accepted');
    fs.rmdirSync(path.join(img,'batch-1'));
    fs.unlinkSync(path.join(root,'05-export','thumbnail.png'));
    try {verify(img,3,true);throw Error('Missing thumbnail accepted');}
    catch(e){if(e.message==='Missing thumbnail accepted')throw e;}
    // V2: Cover als 00-cover.png im selben Ordner, Verlierer gelöscht.
    const img2=path.join(root,'v2','03-bilder');
    fs.mkdirSync(img2,{recursive:true});
    for(let i=1;i<=3;i++)mockImage(path.join(img2,'cover-candidate-'+String(i).padStart(2,'0')+'.png'));
    selectCover(img2,3,true,true);
    if(!fs.existsSync(path.join(img2,COVER_IN_FOLDER)))throw Error('V2 cover not in image folder');
    if(fs.readdirSync(img2).some(v=>v.startsWith('cover-candidate')))throw Error('V2 losing covers were not deleted');
    mockImage(path.join(img2,'01.png'));mockImage(path.join(img2,'02.png'));
    if(!verify(img2,2,true,true))throw Error('V2 complete folder rejected');
    const corrupt=path.join(img2,'01.png'),good=fs.readFileSync(corrupt),bad=Buffer.from(good);
    bad[bad.length-6]^=0xff;fs.writeFileSync(corrupt,bad);
    if(verify(img2,2,true,true))throw Error('Corrupted PNG accepted');
    fs.writeFileSync(corrupt,good);
    fs.unlinkSync(path.join(img2,COVER_IN_FOLDER));
    if(verify(img2,2,true,true))throw Error('V2 missing cover accepted');
    console.log('FLOW IMAGE PACK SELF-TEST: PASS — thumbnail and scene 01 independent; V2 cover + images in one folder');
  } finally {fs.rmSync(root,{recursive:true,force:true});}
}

const command=process.argv[2];
if(command==='self-test'){selfTest();}
else if(command==='cover'){
  const {imageDir,separate,oneFolder}=projectFolder(process.argv[3]);
  selectCover(imageDir,Number(process.argv[4]),separate,oneFolder);
}else if(command==='verify'){
  const {imageDir,total,separate,oneFolder}=projectFolder(process.argv[3]);
  if(!verify(imageDir,total,separate,oneFolder))process.exitCode=1;
}else{
  console.error('Usage: node scripts/flow-image-pack.mjs cover <youtube/project> <1|2|3> | verify <youtube/project> | self-test');
  process.exitCode=1;
}
