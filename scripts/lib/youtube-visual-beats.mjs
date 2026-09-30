import fs from 'node:fs';
import path from 'node:path';

export const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

const hardSplit = (text, maxWords) => {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  const out = [];
  for (let i = 0; i < words.length; i += maxWords) out.push(words.slice(i, i + maxWords).join(' '));
  return out.filter(Boolean);
};

const mergeTinyParts = (parts, minWords = 4) => {
  const merged = [];
  for (const rawPart of parts.map((part) => part.trim()).filter(Boolean)) {
    if (merged.length > 0 && countWords(rawPart) < minWords) merged[merged.length - 1] = `${merged[merged.length - 1]} ${rawPart}`.trim();
    else merged.push(rawPart);
  }
  return merged;
};

const splitSemanticSentence = (sentence, targetWords, maxWords, semanticSplit = true) => {
  const text = sentence.trim();
  if (!semanticSplit) return [text];
  const wordCount = countWords(text);
  const commaCount = (text.match(/,/g) ?? []).length;
  const hasListChoice = /\soder\s/iu.test(text);
  const hasContrastOrCause = /\b(aber|doch|während|obwohl|deshalb|dagegen|anschließend|danach)\b/iu.test(text);
  const shouldTrySemanticSplit = wordCount > targetWords || (wordCount >= 10 && commaCount >= 1 && hasListChoice) || (wordCount >= 12 && hasContrastOrCause);
  if (!shouldTrySemanticSplit) return [text];
  const parts = text
    .split(/(?<=[,;:–—])\s+|\s+(?=(?:aber|doch|während|obwohl|deshalb|dagegen|anschließend|danach)\b)/iu)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return [text];
  return mergeTinyParts(parts);
};

const splitLongSentence = (sentence, targetWords, maxWords, semanticSplit = true) => {
  const semanticParts = splitSemanticSentence(sentence, targetWords, maxWords, semanticSplit);
  const beats = [];
  for (const semanticPart of semanticParts) {
    if (countWords(semanticPart) <= maxWords) {
      beats.push(semanticPart);
      continue;
    }
    const clauses = semanticPart.split(/(?<=[,;:–—])\s+/u).filter(Boolean);
    if (clauses.length === 1) {
      beats.push(...hardSplit(semanticPart, maxWords));
      continue;
    }
    let current = '';
    for (const clause of clauses) {
      if (countWords(clause) > maxWords) {
        if (current) {
          beats.push(current);
          current = '';
        }
        beats.push(...hardSplit(clause, maxWords));
        continue;
      }
      const candidate = current ? `${current} ${clause}` : clause;
      if (current && countWords(candidate) > targetWords) {
        beats.push(current);
        current = clause;
      } else current = candidate;
    }
    if (current) beats.push(current);
  }
  return beats.flatMap((beat) => (countWords(beat) > maxWords ? hardSplit(beat, maxWords) : [beat]));
};

export const splitScriptIntoVisualBeats = (script, options = {}) => {
  const targetWords = Number(options.targetWords ?? 14);
  const maxWords = Number(options.maxWords ?? 20);
  const semanticSplit = options.semanticSplit !== false;
  if (!Number.isFinite(targetWords) || targetWords < 6) throw new Error('targetWords must be >= 6.');
  if (!Number.isFinite(maxWords) || maxWords < targetWords) throw new Error('maxWords must be >= targetWords.');
  if (maxWords > 28) throw new Error('maxWords must be <= 28.');

  const paragraphs = String(script).replace(/\r\n/g, '\n').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  const beats = [];
  for (const paragraph of paragraphs) {
    const sentences = [...segmenter.segment(paragraph)].map((item) => item.segment.trim()).filter(Boolean);
    for (const sentence of sentences) beats.push(...splitLongSentence(sentence, targetWords, maxWords, semanticSplit));
  }
  return beats.filter(Boolean);
};

const firstWords = (text, count = 8) => String(text).trim().split(/\s+/).filter(Boolean).slice(0, count).join(' ');
const lastWord = (text) => String(text).trim().split(/\s+/).filter(Boolean).at(-1) ?? '';

const inferMoodProfile = (beat) => {
  const text = String(beat).toLocaleLowerCase('de-DE');
  if (/\b(manipulat|täusch|betrug|kontroll|missbrauch|zwang|einschüchter|grausam|ausnutz|lüg|dehuman|bedroh)/iu.test(text)) return {moodMode: 'DARK', moodIntensity: 3, powerDynamic: 'DOMINANT_VS_TARGET'};
  if (/\b(macht|autorität|hierarch|domin|status|chef|gehorsam|untergeordnet|herrsch)/iu.test(text)) return {moodMode: 'POWER', moodIntensity: 2, powerDynamic: /gruppe|menschen|publikum/iu.test(text) ? 'AUTHORITY_VS_GROUP' : 'STATUS_CONTRAST'};
  if (/\b(geld|preis|euro|€|gehalt|kauf|konsum|rabatt|angebot|verhandlung|aktie|anleger|verlust|gewinn|teuer|günstig)/iu.test(text)) return {moodMode: 'MONEY', moodIntensity: 1, powerDynamic: /verhandlung|angebot|gehalt/iu.test(text) ? 'PEER_TO_PEER' : 'NEUTRAL'};
  if (/\b(einsam|allein|isolier|ausgeschlossen|ausgrenz|verlassen|angst|verletzlich|furcht)/iu.test(text)) return {moodMode: 'ISOLATION', moodIntensity: 3, powerDynamic: /gruppe|ausgegrenzt|ausgeschlossen/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'NONE'};
  if (/\b(schutz|lösung|helfen|verhindern|gegenmaßnahme|ausweg|reduzier|verbesser|klarheit)/iu.test(text)) return {moodMode: 'HOPE', moodIntensity: 1, powerDynamic: 'NEUTRAL'};
  if (/\b(druck|unsicher|zweifel|konflikt|kritik|unangenehm|spannung|misstrau|skeptisch|gruppendruck)/iu.test(text)) return {moodMode: 'UNEASY', moodIntensity: 2, powerDynamic: /gruppe|gruppendruck/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'PEER_TO_PEER'};
  if (/\b(gruppe|menschen|andere|publikum|kollegen|freunde|familie)/iu.test(text)) return {moodMode: 'CLEAR', moodIntensity: 1, powerDynamic: 'PEER_TO_PEER'};
  return {moodMode: 'CLEAR', moodIntensity: 0, powerDynamic: 'NEUTRAL'};
};

const inferSocialDensity = (beat) => {
  const text = String(beat);
  if (/\b(gruppe|gruppen|publikum|menschen|personen|teilnehm|kollegen|familie|freunde|beobachter|andere leute|mehrere menschen)\b/iu.test(text)) return 'group';
  if (/\b(gespräch|feedback|kritik|lob|freund|kollege|partner|gegenüber|verhandlung|zwei personen|jemand anderes)\b/iu.test(text)) return 'duo';
  if (/\b(du|dich|dir|jemand|person|mensch|er|sie|teilnehmer|teilnehmende)\b/iu.test(text)) return 'solo';
  return 'none';
};

const inferCompositionType = (beat) => {
  const text = String(beat);
  if (/\b(einerseits|andererseits|im vergleich|dagegen|während|stattdessen|erwartung|tatsächlich|vorher|nachher)\b/iu.test(text)) return 'contrast';
  return 'standard';
};

const inferSceneType = (beat, socialDensity, compositionType) => {
  const text = String(beat);
  if (compositionType === 'contrast') return 'COMPARE_VISUAL';
  if (socialDensity !== 'none') return 'CHARACTER_SCENE';
  if (/\b(prozess|ablauf|schritt|mechanismus|führt zu|dadurch|folge|ursache|zwischen|verhältnis)\b/iu.test(text)) return 'SCHEMA_EXPLAINER';
  return 'OBJECT_METAPHOR';
};

const inferCamera = ({sceneType, socialDensity, mood}) => {
  if (mood.powerDynamic === 'AUTHORITY_VS_GROUP' || mood.powerDynamic === 'DOMINANT_VS_TARGET' || mood.powerDynamic === 'STATUS_CONTRAST') {
    return 'Choose a medium-wide or wide angle that makes hierarchy, distance and body position readable; use a low/high angle only if it materially clarifies power.';
  }
  if (sceneType === 'COMPARE_VISUAL') return 'Use one clean balanced comparison view; both sides/states must be immediately readable without dashboard styling.';
  if (socialDensity === 'group') return 'Use a wide or medium-wide environmental view that keeps the key social relation readable.';
  if (socialDensity === 'duo') return 'Use a medium or medium-wide interaction view with readable gaze, distance and body language.';
  if (socialDensity === 'solo') return 'Use a medium or close-medium action/reaction view only as close as needed to read the concrete behavior and relevant object.';
  return 'Choose the simplest view that makes the object/environment relation immediately understandable.';
};

const literalMetaphorGuard = (beat) => {
  const text = String(beat).toLocaleLowerCase('de-DE');
  const guards = [];
  if (/spotlight[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a theatrical spotlight or attention beam.');
  if (/anker[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a ship anchor.');
  if (/halo[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a glowing halo.');
  if (/framing[- ]?effekt|framing/iu.test(text)) guards.push('Do not automatically use a literal picture frame.');
  if (/echo chamber|echokammer/iu.test(text)) guards.push('Do not automatically use a literal echo room.');
  if (/bandwagon/iu.test(text)) guards.push('Do not automatically use a wagon.');
  return guards.join(' ');
};

const buildPlanningFields = (beat, options = {}) => {
  const socialDensity = inferSocialDensity(beat);
  const compositionType = inferCompositionType(beat);
  const sceneType = inferSceneType(beat, socialDensity, compositionType);
  const isV2 = options.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
  const mood = isV2 ? inferMoodProfile(beat) : {};
  const literalWarning = literalMetaphorGuard(beat);
  const multiExampleRisk = ((String(beat).match(/,/g) ?? []).length >= 2 && /\b(oder|zum beispiel|beispiele|mehrere|verschiedene)\b/iu.test(String(beat)));

  const observableEvidence = socialDensity === 'group'
    ? 'Plan one concrete social interaction. Give background people specific visible activities and gaze directions instead of generic crowd posing.'
    : socialDensity === 'duo'
      ? 'Plan one concrete two-person interaction with readable gaze, distance, posture and action.'
      : socialDensity === 'solo'
        ? 'Plan one concrete visible action/reaction with the relevant object or environment; do not rely on an emotion adjective alone.'
        : 'Plan one concrete object/environment relation or simple mechanism that can be drawn literally without interpreting an abstract psychology phrase.';

  const camera = inferCamera({sceneType, socialDensity, mood: isV2 ? mood : {powerDynamic: 'NEUTRAL'}});

  return {
    sceneType,
    compositionType,
    socialDensity,
    viewerTakeaway: beat,
    observableEvidence,
    dominantRelation: 'ONE observable action, relation or comparison only; define it concretely during creative review.',
    literalMetaphorWarning: literalWarning || 'NONE',
    requiresBeatSplitReview: multiExampleRisk,
    visualIdea: `Translate this spoken beat into concrete visible evidence, not a symbolic restatement: ${beat}`,
    subject: socialDensity === 'none'
      ? 'Use no human unless a person is genuinely needed for the visible mechanism.'
      : 'Use the unified mature strict-stickman family only when human behavior is the clearest evidence.',
    characterDirection: socialDensity === 'none'
      ? 'NO HUMAN REQUIRED unless semantically necessary.'
      : 'Express the role through visible posture, gaze, spacing, clothing and action while preserving the same stickman anatomy family.',
    action: 'Describe what the subject is visibly doing. Replace abstract emotions with observable body language, gaze, spacing and interaction.',
    actionOrRelation: 'One visible action/relation/mechanism from the current beat only; no later information.',
    environment: 'Choose a concrete scene-specific place and props only when they help prove the beat. Avoid generic cinematic filler.',
    camera,
    lightingMood: isV2 ? `Use motivated illustrated light appropriate to ${mood.moodMode} only after the concrete scene is defined; light must support the visible action, not substitute for it.` : undefined,
    colorDirection: isV2 ? `Use believable local colors with controlled contrast appropriate to ${mood.moodMode}; do not use color symbolism as a substitute for behavior.` : undefined,
    continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
    ...(isV2 ? mood : {}),
  };
};

const normalizeTextList = (value) => {
  const values = Array.isArray(value) ? value : [value];
  return values.map((item) => String(item ?? '').trim()).filter(Boolean);
};

const normalizeFlowTextMoments = ({coverHeadline, flowTextMoments = [], sceneCount}) => {
  const moments = Array.isArray(flowTextMoments) ? flowTextMoments.map((item) => ({...item})) : [];
  const cover = String(coverHeadline ?? '').trim();
  if (cover && !moments.some((item) => Number(item.scene) === 1)) moments.unshift({scene: 1, kind: 'cover', text: cover});

  const seen = new Set();
  for (const moment of moments) {
    moment.scene = Number(moment.scene);
    moment.kind = moment.scene === 1 ? 'cover' : (moment.kind ?? 'keyword');
    const texts = normalizeTextList(moment.text);
    if (!texts.length) throw new Error(`flowTextMoments scene ${moment.scene} requires at least one text string.`);
    moment.texts = texts;
    moment.text = texts.length === 1 ? texts[0] : texts;
    if (!Number.isInteger(moment.scene) || moment.scene < 1 || moment.scene > sceneCount) throw new Error(`flowTextMoments contains invalid scene ${moment.scene}.`);
    if (seen.has(moment.scene)) throw new Error(`flowTextMoments contains duplicate scene ${moment.scene}.`);
    seen.add(moment.scene);
    if (moment.scene === 1) {
      const coverWords = countWords(texts[0]);
      if (coverWords < 2 || coverWords > 7) throw new Error('Cover title must contain 2-7 words.');
      texts.slice(1).forEach((text) => {
        if (countWords(text) > 4) throw new Error(`Cover secondary text must contain at most 4 words: ${text}`);
      });
    } else {
      texts.forEach((text) => {
        if (countWords(text) > 5) throw new Error(`Flow text scene ${moment.scene} exceeds 5 words: ${text}`);
      });
    }
    if (texts.length > 4) throw new Error(`Flow text scene ${moment.scene} may contain at most 4 strings.`);
  }

  if (!moments.some((item) => item.scene === 1)) throw new Error('flowTextMoments requires scene 1 cover text.');
  const max = Math.max(1, Math.ceil(sceneCount * 0.3));
  if (moments.length > max) throw new Error(`Flow text density ${moments.length}/${sceneCount} exceeds 30% (${max}).`);
  return moments.sort((a, b) => a.scene - b.scene);
};

export const buildVisualBeatScenes = (beats, options = {}) => {
  const coverHeadline = String(options.coverHeadline ?? '').trim();
  const suppliedMoments = Array.isArray(options.flowTextMoments) ? options.flowTextMoments : [];
  const hasModernTextPlan = Boolean(coverHeadline) || suppliedMoments.length > 0;
  const moments = hasModernTextPlan ? normalizeFlowTextMoments({coverHeadline, flowTextMoments: suppliedMoments, sceneCount: beats.length}) : [];
  const byScene = new Map(moments.map((moment) => [moment.scene, moment]));

  return beats.map((beat, index) => {
    const plan = buildPlanningFields(beat, options);
    const sceneNumber = index + 1;
    const isCover = sceneNumber === 1;
    const textMoment = byScene.get(sceneNumber);
    const textList = textMoment ? normalizeTextList(textMoment.texts ?? textMoment.text) : [];
    const quotedText = textList.map((text) => `\"${text}\"`).join(', ');
    const textInstruction = textMoment
      ? `FLOW TEXT: render exactly ${quotedText}. Preserve spelling and punctuation. NO OTHER READABLE TEXT.`
      : 'FLOW TEXT: ZERO READABLE TEXT.';
    const coverInstruction = isCover
      ? 'COVER: this is also the thumbnail. Use one concrete visible conflict/relationship, strong small-size readability and a deliberate title zone. Do not rely on abstract spectacle.'
      : '';

    const literalGuard = plan.literalMetaphorWarning === 'NONE' ? '' : ` ${plan.literalMetaphorWarning}`;
    const splitWarning = plan.requiresBeatSplitReview ? ' REVIEW REQUIRED: this beat may contain several independent examples; split it instead of forcing a montage if they cannot be shown as one inseparable idea.' : '';

    return {
      scene: sceneNumber,
      isCover,
      ...(isCover ? {coverRole: 'SCENE_01_COVER'} : {}),
      startPhrase: firstWords(beat, 8),
      endWord: lastWord(beat),
      speechSection: beat,
      textPolicy: textMoment ? (isCover ? 'FLOW_EXACT_COVER_TEXT' : 'FLOW_EXACT_KEYWORD_TEXT') : 'NONE',
      ...(textMoment ? {flowText: textList.length === 1 ? textList[0] : textList, flowTextKind: textMoment.kind} : {}),
      ...plan,
      visualTask: `${coverInstruction} OBSERVABLE-SCENE FIRST: ${plan.observableEvidence} Define the exact visible action/relation before Phase 2. ${plan.action} ${plan.environment} ${plan.camera}${literalGuard}${splitWarning} ${textInstruction}`.trim(),
    };
  });
};

const buildModernTextPlan = (plan, auto, sceneCount) => {
  const coverHeadline = String(auto.coverHeadline ?? plan.coverHeadline ?? '').trim();
  if (!coverHeadline) return null;
  const sourceMoments = Array.isArray(auto.flowTextMoments) ? auto.flowTextMoments : (Array.isArray(plan.flowTextMoments) ? plan.flowTextMoments : []);
  const flowTextMoments = normalizeFlowTextMoments({coverHeadline, flowTextMoments: sourceMoments, sceneCount});
  return {coverHeadline, flowTextMoments};
};

export const resolvePhase1Plan = (plan, planPath = '') => {
  if (Array.isArray(plan.scenes) && plan.scenes.length > 0) return plan;
  const auto = plan.autoFromScript;
  if (!auto || typeof auto !== 'object') return plan;
  if (typeof auto.scriptPath !== 'string' || auto.scriptPath.trim() === '') throw new Error(`autoFromScript.scriptPath is required in ${planPath || 'phase1 plan'}.`);

  const scriptPath = path.resolve(auto.scriptPath);
  if (!fs.existsSync(scriptPath)) throw new Error(`Script not found for visual-beat generation: ${scriptPath}`);
  const script = fs.readFileSync(scriptPath, 'utf8');
  const beats = splitScriptIntoVisualBeats(script, auto);
  if (beats.length === 0) throw new Error(`No visual beats derived from ${scriptPath}.`);

  const modernTextPlan = buildModernTextPlan(plan, auto, beats.length);
  const isV2 = plan.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';

  return {
    ...plan,
    visualPlanningPolicy: 'SEMANTIC_OBSERVABLE_VISUALS_V1',
    visualDirectorPolicy: 'OBSERVABLE_SCENE_FIRST_V1',
    flowPromptPolicy: 'NATURAL_FLOW_MASTER_V2',
    socialScenePolicy: 'SEMANTIC_SOCIAL_DENSITY_V1',
    ...(isV2 ? {
      visualSystem: 'CINEMATIC_HUMAN_BEHAVIOR_V2',
      characterSystem: 'STYLIZED_STICKMAN_CAST_V2',
      humanCharacterPolicy: 'UNIFIED_STICKMAN_HUMANS_V2',
      characterPresencePolicy: 'OPTIONAL_HUMANS_MIXED_VISUALS_V1',
      moodPolicy: 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1',
      environmentPolicy: 'BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2',
      renderingPolicy: 'SOFT_CEL_SHADED_FILM_FRAME_V2',
      representationPolicy: 'MIXED_HUMAN_BEHAVIOR_VISUALS_V2',
      representationVarietyPolicy: 'REPRESENTATION_VARIETY_V1',
    } : {}),
    ...(modernTextPlan ? {
      visibleTextLanguage: 'de',
      visibleTextRenderer: 'GOOGLE_FLOW',
      flowSourceImageTextPolicy: 'PLANNED_EXACT_GERMAN_TEXT_ONLY',
      flowTextStylePolicy: isV2 ? 'CINEMATIC_WORLD_INTEGRATED_V2' : 'EDITORIAL_INTEGRATED_V1',
      preferNoVisibleText: true,
      coverHeadlineRequired: true,
      coverHeadline: modernTextPlan.coverHeadline,
      coverTextRenderer: 'GOOGLE_FLOW',
      renderGermanLabelsInRemotion: false,
      forbidEnglishVisibleText: true,
      finalTextPolicy: 'FLOW_VISIBLE_TEXT_ONLY_V3',
      finalTextOverlayPolicy: 'FLOW_VISIBLE_TEXT_ONLY_V3',
      flowTextMoments: modernTextPlan.flowTextMoments,
      sceneLabels: [],
    } : {}),
    scenes: buildVisualBeatScenes(beats, {
      coverHeadline: modernTextPlan?.coverHeadline,
      flowTextMoments: modernTextPlan?.flowTextMoments ?? [],
      visualSystem: plan.visualSystem,
    }),
    resolvedFromScript: auto.scriptPath,
  };
};
