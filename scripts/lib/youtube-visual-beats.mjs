import fs from 'node:fs';
import path from 'node:path';

export const countWords = (value) => String(value ?? '').trim().split(/\s+/u).filter(Boolean).length;

const hardSplit = (text, maxWords) => {
  const words = String(text).trim().split(/\s+/u).filter(Boolean);
  const out = [];
  for (let i = 0; i < words.length; i += maxWords) out.push(words.slice(i, i + maxWords).join(' '));
  return out.filter(Boolean);
};

const mergeTinyParts = (parts, minWords = 4) => {
  const merged = [];
  for (const part of parts.map((x) => x.trim()).filter(Boolean)) {
    if (merged.length && countWords(part) < minWords) merged[merged.length - 1] = `${merged[merged.length - 1]} ${part}`.trim();
    else merged.push(part);
  }
  return merged;
};

const splitLongSentence = (sentence, targetWords, maxWords, semanticSplit = true) => {
  const text = sentence.trim();
  if (!semanticSplit || countWords(text) <= targetWords) return countWords(text) > maxWords ? hardSplit(text, maxWords) : [text];
  const parts = mergeTinyParts(text.split(/(?<=[,;:–—])\s+|\s+(?=(?:aber|doch|während|obwohl|deshalb|dagegen|anschließend|danach)\b)/iu));
  if (parts.length <= 1) return countWords(text) > maxWords ? hardSplit(text, maxWords) : [text];
  const out = [];
  let current = '';
  for (const part of parts) {
    const candidate = current ? `${current} ${part}` : part;
    if (current && countWords(candidate) > targetWords) { out.push(current); current = part; }
    else current = candidate;
  }
  if (current) out.push(current);
  return out.flatMap((item) => countWords(item) > maxWords ? hardSplit(item, maxWords) : [item]);
};

export const splitScriptIntoVisualBeats = (script, options = {}) => {
  const targetWords = Number(options.targetWords ?? 14);
  const maxWords = Number(options.maxWords ?? 20);
  const semanticSplit = options.semanticSplit !== false;
  if (!Number.isFinite(targetWords) || targetWords < 6) throw new Error('targetWords must be >= 6.');
  if (!Number.isFinite(maxWords) || maxWords < targetWords) throw new Error('maxWords must be >= targetWords.');
  if (maxWords > 28) throw new Error('maxWords must be <= 28.');
  const paragraphs = String(script).replace(/\r\n/g, '\n').split(/\n\s*\n/u).map((part) => part.trim()).filter(Boolean);
  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  const beats = [];
  for (const paragraph of paragraphs) {
    const sentences = [...segmenter.segment(paragraph)].map((item) => item.segment.trim()).filter(Boolean);
    for (const sentence of sentences) beats.push(...splitLongSentence(sentence, targetWords, maxWords, semanticSplit));
  }
  return beats.filter(Boolean);
};

const firstWords = (text, count = 8) => String(text).trim().split(/\s+/u).filter(Boolean).slice(0, count).join(' ');
const lastWord = (text) => String(text).trim().split(/\s+/u).filter(Boolean).at(-1) ?? '';

const inferSocialDensity = (beat) => {
  const text = String(beat);
  if (/\b(gruppe|gruppen|publikum|menschen|personen|teilnehm|kollegen|familie|freunde|beobachter|mehrere menschen)\b/iu.test(text)) return 'group';
  if (/\b(gespräch|feedback|kritik|lob|freund|kollege|partner|gegenüber|verhandlung|zwei personen|jemand anderes|chef|mitarbeiter|berater|lehrer|elternteil)\b/iu.test(text)) return 'duo';
  if (/\b(du|dich|dir|jemand|person|mensch|er|sie|teilnehmer|teilnehmende)\b/iu.test(text)) return 'solo';
  return 'none';
};

const inferCompositionType = (beat) => /\b(einerseits|andererseits|im vergleich|dagegen|während|stattdessen|erwartung|tatsächlich|vorher|nachher|aber)\b/iu.test(String(beat)) ? 'contrast' : 'standard';

const inferSceneType = (beat, rawSocialDensity, compositionType, {textMoment, isCover} = {}) => {
  const text = String(beat);
  if (compositionType === 'contrast') return 'COMPARE_VISUAL';

  const languageCue = /\b(botschaft|formuliert|formulierung|sprache|satz|wort|wörter|sagt|sagen|heißt|nennt man|du musst|du darfst|verbot|warnung|hinweis)\b/iu.test(text);
  const objectCue = /\b(handy|smartphone|telefon|preis|preisschild|schild|tür|karte|option|wahl|etikett|produkt|buch|datei|brief|nachricht|knopf|objekt|gegenstand|zettel|formular)\b/iu.test(text);
  const environmentCue = /\b(bus|bahn|bibliothek|büro|wohnung|zimmer|labor|schule|universität|café|restaurant|laden|supermarkt|bahnhof|straße|wartezimmer|park|werkstatt)\b/iu.test(text);
  const mechanismCue = /\b(mechanismus|prozess|ablauf|schritt|führt zu|dadurch|folge|ursache|verhältnis|freiheit bedroht|wiederherstellen|reaktanz|wirkung|zusammenhang)\b/iu.test(text);
  const humanInteractionCue = /\b(fragt|antwortet|spricht|diskutiert|streitet|zeigt|weist an|befiehlt|blockiert|hilft|beobachtet|schaut|blickt|drängt|überredet|überzeugt|droht|lobt|kritisiert|lehnt sich|geht auf|tritt näher|zieht sich zurück)\b/iu.test(text);

  if (!isCover && textMoment && languageCue) return 'TEXT_ILLUSTRATION';
  if (mechanismCue && !humanInteractionCue && !objectCue) return 'SCHEMA_EXPLAINER';
  if (objectCue && !humanInteractionCue) return 'OBJECT_FOCUS';
  if (environmentCue && !humanInteractionCue && rawSocialDensity !== 'group') return 'ENVIRONMENT_SCENE';
  if (rawSocialDensity === 'group' || humanInteractionCue || rawSocialDensity === 'duo') return 'CHARACTER_SCENE';
  if (objectCue) return 'OBJECT_FOCUS';
  if (environmentCue) return 'ENVIRONMENT_SCENE';
  if (rawSocialDensity === 'solo') return 'OBJECT_FOCUS';
  return 'SCHEMA_EXPLAINER';
};

const inferCamera = ({sceneType, socialDensity}) => {
  if (sceneType === 'COMPARE_VISUAL') return 'Use one clean comparison view where both states are immediately readable.';
  if (sceneType === 'OBJECT_FOCUS') return 'Use a close, close-medium or tabletop view that makes the object relation immediately readable.';
  if (sceneType === 'ENVIRONMENT_SCENE') return 'Use a wide or medium-wide establishing view where the place itself carries the evidence.';
  if (sceneType === 'SCHEMA_EXPLAINER') return 'Use a clean illustrated mechanism view with one dominant relation and minimal labels only when planned.';
  if (sceneType === 'TEXT_ILLUSTRATION') return 'Compose the exact planned wording as the primary visual inside the same illustrated world, supported by only a few useful props.';
  if (socialDensity === 'group') return 'Use a wide or medium-wide view that keeps the key social relation readable.';
  if (socialDensity === 'duo') return 'Use a medium or medium-wide interaction view with readable gaze, distance and action.';
  if (socialDensity === 'solo') return 'Use a medium or close-medium view only as close as needed to read the concrete action.';
  return 'Choose the simplest view that makes the evidence immediately understandable.';
};

const representationReason = (sceneType) => {
  const reasons = {
    CHARACTER_SCENE: 'Visible human behavior or interaction is the clearest evidence for this beat.',
    OBJECT_FOCUS: 'A concrete object relation can explain this beat more directly than another full character scene.',
    ENVIRONMENT_SCENE: 'The place, layout or contextual environment is the clearest evidence for this beat.',
    SCHEMA_EXPLAINER: 'The beat describes a mechanism or relation that benefits from one simple structured illustration.',
    COMPARE_VISUAL: 'The viewer needs to see two states together to understand the contrast.',
    TEXT_ILLUSTRATION: 'The wording itself is the mechanism, so exact planned text should lead the frame.',
  };
  return reasons[sceneType] ?? 'Choose the clearest visible form for this beat.';
};

const literalMetaphorGuard = (beat) => {
  const text = String(beat).toLocaleLowerCase('de-DE');
  const guards = [];
  if (/spotlight[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a theatrical spotlight.');
  if (/anker[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a ship anchor.');
  if (/halo[- ]?effekt/iu.test(text)) guards.push('Do not automatically use a glowing halo.');
  if (/framing[- ]?effekt|framing/iu.test(text)) guards.push('Do not automatically use a literal picture frame.');
  if (/echo chamber|echokammer/iu.test(text)) guards.push('Do not automatically use a literal echo room.');
  if (/bandwagon/iu.test(text)) guards.push('Do not automatically use a wagon.');
  return guards.join(' ') || 'NONE';
};

const buildPlanningFields = (beat, options = {}) => {
  const rawSocialDensity = inferSocialDensity(beat);
  const compositionType = inferCompositionType(beat);
  const sceneType = inferSceneType(beat, rawSocialDensity, compositionType, options);
  const socialDensity = ['CHARACTER_SCENE', 'COMPARE_VISUAL'].includes(sceneType) ? rawSocialDensity : 'none';
  const evidenceByType = {
    CHARACTER_SCENE: 'Plan one concrete human action/reaction/relationship with specific gaze, posture, spacing and behavior.',
    OBJECT_FOCUS: 'Plan one concrete object relation that can carry the idea without a full character scene.',
    ENVIRONMENT_SCENE: 'Plan one concrete environment/layout whose visible details carry the idea.',
    SCHEMA_EXPLAINER: 'Plan one simple visible mechanism or relation with no decorative complexity.',
    COMPARE_VISUAL: 'Plan one inseparable comparison where both states are readable at once.',
    TEXT_ILLUSTRATION: 'Plan the exact approved wording as the primary visual with only supporting illustrated context.',
  };
  const observableEvidence = evidenceByType[sceneType] ?? 'Plan one concrete visible relation that can be drawn literally.';
  const peopleRequired = sceneType === 'CHARACTER_SCENE' || (sceneType === 'COMPARE_VISUAL' && socialDensity !== 'none');
  return {
    sceneType,
    representationReason: representationReason(sceneType),
    compositionType,
    socialDensity,
    viewerTakeaway: beat,
    observableEvidence,
    dominantRelation: 'ONE observable action, object relation, mechanism, comparison or exact text focus only; define it concretely during creative review.',
    literalMetaphorWarning: literalMetaphorGuard(beat),
    visualIdea: `Translate this spoken beat into concrete visible evidence using the clearest representation: ${beat}`,
    subject: peopleRequired ? 'Use only the people genuinely required by the visible mechanism.' : 'Do not add a full person unless the chosen representation genuinely needs one.',
    characterDirection: peopleRequired ? 'Describe role through visible posture, gaze, spacing and action while using the active Psychology Stickman World.' : 'NO FULL CHARACTER BY DEFAULT; object/environment/text/schema may carry the frame.',
    action: 'Describe what is visibly happening. Replace abstract psychology with observable evidence.',
    actionOrRelation: 'One visible action/object relation/mechanism/comparison/text focus from the current beat only.',
    environment: 'Choose a concrete scene-specific place and props only when they help prove the beat.',
    camera: inferCamera({sceneType, socialDensity}),
    continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
  };
};

const normalizeTextList = (value) => (Array.isArray(value) ? value : [value]).map((item) => String(item ?? '').trim()).filter(Boolean);

const normalizeFlowTextMoments = ({coverHeadline, flowTextMoments = [], sceneCount}) => {
  const moments = Array.isArray(flowTextMoments) ? flowTextMoments.map((item) => ({...item})) : [];
  const cover = String(coverHeadline ?? '').trim();
  if (cover && !moments.some((item) => Number(item.scene) === 1)) moments.unshift({scene: 1, kind: 'cover', text: cover});
  const seen = new Set();
  for (const moment of moments) {
    moment.scene = Number(moment.scene);
    moment.kind = moment.scene === 1 ? 'cover' : (moment.kind ?? 'keyword');
    const texts = normalizeTextList(moment.text);
    if (!texts.length) throw new Error(`flowTextMoments scene ${moment.scene} requires text.`);
    if (!Number.isInteger(moment.scene) || moment.scene < 1 || moment.scene > sceneCount) throw new Error(`flowTextMoments contains invalid scene ${moment.scene}.`);
    if (seen.has(moment.scene)) throw new Error(`flowTextMoments contains duplicate scene ${moment.scene}.`);
    seen.add(moment.scene);
    if (moment.scene === 1) {
      const words = countWords(texts[0]);
      if (words < 2 || words > 7) throw new Error('Cover title must contain 2-7 words.');
    } else {
      for (const text of texts) if (countWords(text) > 5) throw new Error(`Flow text scene ${moment.scene} exceeds 5 words: ${text}`);
    }
    if (texts.length > 4) throw new Error(`Flow text scene ${moment.scene} may contain at most 4 strings.`);
    moment.texts = texts;
    moment.text = texts.length === 1 ? texts[0] : texts;
  }
  return moments.sort((a, b) => a.scene - b.scene);
};

export const buildVisualBeatScenes = (beats, options = {}) => {
  const coverHeadline = String(options.coverHeadline ?? '').trim();
  const suppliedMoments = Array.isArray(options.flowTextMoments) ? options.flowTextMoments : [];
  const moments = coverHeadline || suppliedMoments.length ? normalizeFlowTextMoments({coverHeadline, flowTextMoments: suppliedMoments, sceneCount: beats.length}) : [];
  const byScene = new Map(moments.map((moment) => [moment.scene, moment]));
  return beats.map((beat, index) => {
    const scene = index + 1;
    const isCover = scene === 1;
    const textMoment = byScene.get(scene);
    const plan = buildPlanningFields(beat, {textMoment, isCover});
    const textList = textMoment ? normalizeTextList(textMoment.texts ?? textMoment.text) : [];
    const quoted = textList.map((text) => `"${text}"`).join(', ');
    const textInstruction = textMoment ? `FLOW TEXT: render exactly ${quoted}. NO OTHER READABLE TEXT.` : 'FLOW TEXT: ZERO READABLE TEXT.';
    const coverInstruction = isCover ? 'COVER: this is also the thumbnail. Use one concrete visible conflict/relationship and a deliberate title zone.' : '';
    const literal = plan.literalMetaphorWarning === 'NONE' ? '' : ` ${plan.literalMetaphorWarning}`;
    return {
      scene,
      isCover,
      ...(isCover ? {coverRole: 'SCENE_01_COVER'} : {}),
      startPhrase: firstWords(beat, 8),
      endWord: lastWord(beat),
      speechSection: beat,
      textPolicy: textMoment ? (isCover ? 'FLOW_EXACT_COVER_TEXT' : 'FLOW_EXACT_KEYWORD_TEXT') : 'NONE',
      ...(textMoment ? {flowText: textList.length === 1 ? textList[0] : textList, flowTextKind: textMoment.kind} : {}),
      ...plan,
      visualTask: `${coverInstruction} REPRESENTATION FIRST: ${plan.representationReason} OBSERVABLE-SCENE FIRST: ${plan.observableEvidence} ${plan.action} ${plan.environment} ${plan.camera}${literal} ${textInstruction}`.trim(),
    };
  });
};

export const resolvePhase1Plan = (plan, planPath = '') => {
  if (Array.isArray(plan.scenes) && plan.scenes.length > 0) return plan;
  const auto = plan.autoFromScript;
  if (!auto || typeof auto !== 'object') return plan;
  if (typeof auto.scriptPath !== 'string' || auto.scriptPath.trim() === '') throw new Error(`autoFromScript.scriptPath is required in ${planPath || 'phase1 plan'}.`);
  const scriptPath = path.resolve(auto.scriptPath);
  if (!fs.existsSync(scriptPath)) throw new Error(`Script not found: ${scriptPath}`);
  const script = fs.readFileSync(scriptPath, 'utf8');
  const beats = splitScriptIntoVisualBeats(script, auto);
  if (!beats.length) throw new Error(`No visual beats derived from ${scriptPath}.`);
  const coverHeadline = String(auto.coverHeadline ?? plan.coverHeadline ?? '').trim();
  const flowTextMoments = normalizeFlowTextMoments({coverHeadline, flowTextMoments: auto.flowTextMoments ?? plan.flowTextMoments ?? [], sceneCount: beats.length});
  return {
    ...plan,
    visualWorldStatus: 'ACTIVE',
    visualWorld: 'PSYCHOLOGY_STICKMAN_WORLD_V1',
    visualPlanningPolicy: 'SEMANTIC_OBSERVABLE_VISUALS_V1',
    visualDirectorPolicy: 'OBSERVABLE_SCENE_FIRST_V1',
    representationVarietyPolicy: 'REPRESENTATION_VARIETY_V1',
    flowPromptPolicy: 'NATURAL_FLOW_MASTER_V2',
    flowOutputPolicy: plan.flowOutputPolicy ?? 'FINAL_SEPARATE_IMAGE_ASSETS_V2',
    socialScenePolicy: 'SEMANTIC_SOCIAL_DENSITY_V1',
    ...(coverHeadline ? {
      visibleTextLanguage: 'de',
      visibleTextRenderer: 'GOOGLE_FLOW',
      flowSourceImageTextPolicy: 'PLANNED_EXACT_GERMAN_TEXT_ONLY',
      flowTextStylePolicy: 'PSYCHOLOGY_STICKMAN_WORLD_V1',
      preferNoVisibleText: true,
      coverHeadlineRequired: true,
      coverHeadline,
      coverTextRenderer: 'GOOGLE_FLOW',
      renderGermanLabelsInRemotion: false,
      forbidEnglishVisibleText: true,
      finalTextPolicy: 'FLOW_VISIBLE_TEXT_ONLY_V3',
      finalTextOverlayPolicy: 'FLOW_VISIBLE_TEXT_ONLY_V3',
      flowTextMoments,
      sceneLabels: [],
    } : {}),
    scenes: buildVisualBeatScenes(beats, {coverHeadline, flowTextMoments}),
    resolvedFromScript: auto.scriptPath,
  };
};
