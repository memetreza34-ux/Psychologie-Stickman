#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
const [input] = process.argv.slice(2);
if (!input || !existsSync(input)) { console.error('Usage: npm run qa:youtube-pacing -- <final-video-or-audio>'); process.exit(1); }
const probe = spawnSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',input],{encoding:'utf8'});
const duration = Number(probe.stdout?.trim());
if (!Number.isFinite(duration) || duration <= 0) process.exit(1);
const detect = spawnSync('ffmpeg',['-hide_banner','-nostats','-i',input,'-af','silencedetect=noise=-42dB:d=0.20','-f','null','-'],{encoding:'utf8'});
const log = `${detect.stderr ?? ''}\n${detect.stdout ?? ''}`;
const regex = /silence_end:\s*([0-9.]+)\s*\|\s*silence_duration:\s*([0-9.]+)/g;
const pauses=[]; let match;
while ((match=regex.exec(log))!==null) { const end=Number(match[1]); const d=Number(match[2]); const start=end-d; const finalHold=end>=duration-0.25 && start>=duration-1.5; if(!finalHold) pauses.push({duration:d}); }
const total=pauses.reduce((s,p)=>s+p.duration,0); const ratio=total/duration*100; const long=pauses.filter(p=>p.duration>=0.75);
console.log(`Duration: ${duration.toFixed(2)} s | silence: ${ratio.toFixed(1)}% | pauses >=0.75s: ${long.length}`);
if(long.length>0 || ratio>14){ console.error('YOUTUBE PACING QA: FAIL'); process.exit(1); }
console.log('YOUTUBE PACING QA: PASS');
