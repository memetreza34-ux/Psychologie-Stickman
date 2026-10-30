// V2: no visible caption or label may be silently discarded.
const words=v=>String(v??'').trim().split(/\s+/u).filter(Boolean);
const line=v=>String(v??'').trim();
export function flowTextFor(c) {
  if(c.type==='keyword')return [line(c.text),...(line(c.sub)?[line(c.sub)]:[])];
  if(c.type==='stat')return [line(c.value),line(c.label)];
  if(c.type==='compare')return [[c.left,c.leftSub].map(line).filter(Boolean).join(' – '),[c.right,c.rightSub].map(line).filter(Boolean).join(' – ')];
  return Array.isArray(c.steps)?c.steps.map(line):[];
}
export function validateFlowCard(c) {
  if(!c||!['keyword','stat','compare','steps'].includes(c.type))return ['unsupported card type'];
  const out=[],texts=flowTextFor(c);
  if(c.position&&!['top','center','bottom'].includes(c.position))out.push('position must be top/center/bottom');
  if(texts.some(x=>!x))out.push('empty visible text');
  if(texts.some(x=>/[\r\n"]/u.test(x)))out.push('quotes and newlines are forbidden in visible text');
  if(c.type==='keyword'){
    if(words(c.text).length<1||words(c.text).length>4)out.push('keyword title exceeds 4 words');
    if(c.sub!=null&&(words(c.sub).length<1||words(c.sub).length>5))out.push('keyword subtitle exceeds 5 words; it will NOT be dropped');
  }
  if(c.type==='stat'&&(!line(c.value)||words(c.label).length<1||words(c.label).length>6))out.push('stat value required, label 1–6 words');
  if(c.type==='steps'&&(texts.length<2||texts.length>4))out.push('steps must contain 2–4 labels');
  if(c.type==='compare'&&texts.some(x=>!x))out.push('compare requires both sides');
  if(words(texts.join(' ')).length>14)out.push('combined text exceeds 14 words');
  return out;
}
