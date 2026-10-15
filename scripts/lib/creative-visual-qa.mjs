// Structural/semantic planning gate: cannot replace human inspection of generated images.
export const CREATIVE_POLICY = 'CONTENT_FIRST_VISUAL_QA_V2';
export const visualTypes = new Set(['CHARACTER_SCENE','OBJECT_FOCUS','ENVIRONMENT_SCENE','SCHEMA_EXPLAINER','COMPARE_VISUAL','TEXT_ILLUSTRATION']);
export const visualFunctions = new Set(['HOOK','STORY_ACTION','MECHANISM','RESEARCH','COMPARISON','EVIDENCE','TAKEAWAY','CALLBACK','TRANSITION']);
export const cameraScales = new Set(['wide','medium','close','macro','topdown','diagram','mixed']);
const explanatoryTypes = new Set(['SCHEMA_EXPLAINER','COMPARE_VISUAL','TEXT_ILLUSTRATION']);
const clean = (v) => String(v ?? '').trim();
const words = (v) => clean(v).split(/\s+/u).filter(Boolean);
const normalized = (v) => clean(v).toLocaleLowerCase('de-DE').replace(/[^a-z0-9äöüß]/gu,'');
export const isFutureVideoProject = (projectPath) => {
  const m = /(?:^|\/)(\d{2})\.(\d{2})\.(\d{4})-[^/]+(?:\/|$)/u.exec(String(projectPath));
  if (!m) return false;
  const iso = m[3] + '-' + m[2] + '-' + m[1];
  return iso >= '2026-10-16';
};
export const needsCreativeReview = (plan, projectPath) =>
  plan?.creativeVisualPolicy === CREATIVE_POLICY || isFutureVideoProject(projectPath);

export const checkCreativeVisualPlan = (plan, location='phase1-scenes.json') => {
  const failures = [], warnings = [];
  const scenes = Array.isArray(plan?.scenes) ? plan.scenes : [];
  const fail = (message) => failures.push(`${location}: ${message}`);
  if (plan?.creativeVisualPolicy !== CREATIVE_POLICY) {
    fail(`missing creativeVisualPolicy="${CREATIVE_POLICY}" for new/revised video.`);
    return {failures,warnings,summary:{}};
  }
  if (!scenes.length) {
    fail('no planned scenes; cannot approve visual direction.');
    return {failures,warnings,summary:{}};
  }
  const types = {};
  const unique = [];
  for (let i=0;i<scenes.length;i++) {
    const s=scenes[i], n=i+1;
    if (Number(s.scene) !== n) fail(`scene ${n}: scene number must be ${n}.`);
    if (!visualTypes.has(s.sceneType)) fail(`scene ${n}: invalid sceneType.`);
    if (!visualFunctions.has(s.visualFunction)) fail(`scene ${n}: missing/invalid visualFunction.`);
    if (!cameraScales.has(s.cameraScale)) fail(`scene ${n}: missing/invalid cameraScale.`);
    if (!/^[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(clean(s.focalSubjectKey))) fail(`scene ${n}: focalSubjectKey must be a meaningful lowercase snake_case subject.`);
    if (!/^[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(clean(s.settingKey))) fail(`scene ${n}: settingKey must identify a consistent location or illustrated_schema.`);
    if (clean(s.informationGain).length < 24) fail(`scene ${n}: explain the NEW informationGain (min 24 characters).`);
    if (normalized(s.informationGain) === normalized(s.speechSection)) fail(`scene ${n}: informationGain cannot copy the whole narration.`);
    if (clean(s.alternativeVisualType) === clean(s.sceneType) || !visualTypes.has(s.alternativeVisualType)) fail(`scene ${n}: choose a genuinely different alternativeVisualType.`);
    if (clean(s.alternativeRejectionReason).length < 22) fail(`scene ${n}: explain why the alternative loses (min 22 characters).`);
    if (clean(s.observableEvidence).length < 40) fail(`scene ${n}: concrete observableEvidence too vague (min 40 characters).`);
    if (clean(s.representationReason).length < 24) fail(`scene ${n}: why this representation is necessary is unclear.`);
    if (s.visualFunction === 'MECHANISM' && !explanatoryTypes.has(s.sceneType) &&
        clean(s.mechanismRenderingJustification).length < 42) {
      fail(`scene ${n}: MECHANISM using ${s.sceneType} needs a specific mechanismRenderingJustification; consider a labeled schema, diagram or comparison instead.`);
    }
    const allText = Array.isArray(s.flowText) ? s.flowText.join(' ') : clean(s.flowText);
    if (s.sceneType === 'TEXT_ILLUSTRATION' && !allText) fail(`scene ${n}: text-led illustration needs exact planned German flowText.`);
    types[s.sceneType] = (types[s.sceneType] ?? 0) + 1;
    unique.push(s.focalSubjectKey);
  }

  // This catches repetition even when motifKey differs because prompts begin with different words.
  for (let start=0;start<scenes.length;start++) {
    const part = scenes.slice(start,start+4);
    if (part.length === 4) {
      const sameSubject = part.filter(s=>s.focalSubjectKey===part[0].focalSubjectKey);
      if (sameSubject.length>=3 && sameSubject.every(s=>s.settingKey===part[0].settingKey && s.cameraScale===part[0].cameraScale)) {
        const override = part.every(s=>clean(s.sequenceOverrideReason).length>=55);
        if (!override) fail(`scenes ${start+1}–${start+4}: 3+ nearly identical subject/location/camera combinations (${part[0].focalSubjectKey}); redesign a cutaway instead of renaming motifKey.`);
      }
    }
    const seven=scenes.slice(start,start+7);
    if (seven.length === 7) {
      const bySubject = new Map();
      seven.forEach(s=>bySubject.set(s.focalSubjectKey,(bySubject.get(s.focalSubjectKey)??0)+1));
      for (const [subject,count] of bySubject) {
        if (count<5) continue;
        const affected=seven.filter(s=>s.focalSubjectKey===subject);
        const variety=new Set(affected.map(s=>s.sceneType+'|'+s.cameraScale+'|'+s.visualFunction));
        if (variety.size >= 4) continue; // genuine story progression can retain recurring characters/props
        if (!affected.every(s=>clean(s.sequenceOverrideReason).length>=55)) {
          fail(`scenes ${start+1}–${start+7}: subject '${subject}' dominates ${count}/7 beats with little explanatory change; introduce a diagram, relevant object, evidence or contrast.`);
        }
      }
    }
  }
  for(let start=0;start<scenes.length;start+=1) {
    const chunk=scenes.slice(start,start+12);
    if(chunk.length<12)break;
    const mechanisms=chunk.filter(s=>s.visualFunction==='MECHANISM');
    if (mechanisms.length>=4 && !chunk.some(s=>explanatoryTypes.has(s.sceneType))) {
      if(clean(plan.schemaAlternativeJustification).length<80)
        fail(`scenes ${start+1}–${start+12}: ${mechanisms.length} mechanism beats but no explanatory schema/comparison/text illustration; plan a graphic or justify in schemaAlternativeJustification.`);
    }
  }
  const total=scenes.length;
  const share=(types.CHARACTER_SCENE??0)/total;
  if(total>=12&&share>=0.75&&!clean(plan.characterHeavyJustification)) fail('character-heavy visuals require a scene-specific editorial reason.');
  if(total>=12&&new Set(scenes.map(s=>s.sceneType)).size===1) fail('one representation used for the entire video.');
  if(total>=20&&(!scenes.some(s=>explanatoryTypes.has(s.sceneType))))warnings.push(`${location}: long episode has no schemas, comparisons or text-led explanation; check whether mechanisms are underserved.`);
  const summary={total,representationCounts:types,characterPercent:Math.round(share*100),uniqueSubjects:new Set(unique).size};
  return {failures:[...new Set(failures)],warnings,summary};
};

export const checkCreativeFlowPrompt = (plan, text, location='google-flow-prompt.txt') => {
  const failures=[];
  if (plan?.creativeVisualPolicy !== CREATIVE_POLICY) return {failures:[`${location}: V2 plan policy missing.`]};
  const content=clean(text);
  for(const [token, label] of [
    [CREATIVE_POLICY,'creative visual policy marker'],
    ['MECHANISM','mechanism-first visual directing'],
    ['SCHEMA_EXPLAINER','schematic illustration option'],
    ['COMPARE_VISUAL','comparison option'],
    ['TEXT_ILLUSTRATION','short exact text-led illustration option'],
    ['NO REPETITIVE','repetition avoidance instructions'],
  ]) if(!content.includes(token)) failures.push(`${location}: missing ${label} (${token}).`);
  const ids=[...content.matchAll(/^BILD\s+(\d+)\s*$/gmu)].map(m=>Number(m[1]));
  if(ids.length!==plan.scenes.length||ids.some((x,i)=>x!==i+1))
    failures.push(`${location}: numbered BILD blocks do not match plan scenes.`);
  return {failures};
};
