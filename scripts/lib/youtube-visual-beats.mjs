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
  const parts = text.split(/(?<=[,;:–—])\s+|\s+(?=(?:aber|doch|während|obwohl|deshalb|dagegen|anschließend|danach)\b)/iu).map((part) => part.trim()).filter(Boolean);
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

const cameraPresets = [
  'Medium-wide three-quarter angle; klare Handlung und Umgebung gleichzeitig lesbar. Nur verwenden, wenn es zum Beat passt.',
  'Over-the-shoulder oder seitliche Perspektive; Fokus auf konkrete Interaktion mit Objekt/Person. Nicht dieselbe Perspektive wie im vorherigen Beat wiederholen.',
  'Wide environmental shot; Ort und Handlung klar verbinden, ohne die Figur zu klein werden zu lassen.',
  'Close-medium reaction/action shot; Körperhaltung und eine konkrete Handlung tragen die Aussage, keine neutrale Pose.',
  'Low or high three-quarter angle; nur wenn dadurch Hierarchie, Druck, Größe oder Aufmerksamkeit verständlicher wird.',
  'Diagonal medium-wide composition mit Vorder-, Mittel- und Hintergrund; frische Bildtiefe statt Standard-Medium-Shot.',
];

const compositionPattern = ['standard', 'standard', 'split', 'standard', 'standard', 'contrast', 'standard', 'montage', 'standard', 'standard'];
const socialPattern = ['solo', 'duo', 'solo', 'solo', 'group', 'solo', 'duo', 'solo', 'solo', 'group'];

const inferCompositionType = (beat, index) => {
  if (index === 0) return 'standard';
  const text = String(beat);
  const comparison = /\b(aber|dagegen|während|statt|mehr|weniger|anders|vergleich|gegenbeispiel|einerseits|andererseits)\b/iu.test(text);
  const multiExample = /\b(zum beispiel|beispiele|mehrere|verschiedene|sowohl|oder)\b/iu.test(text) && ((text.match(/,/g) ?? []).length >= 1 || countWords(text) >= 12);
  if (comparison) return index % 2 === 0 ? 'split' : 'contrast';
  if (multiExample) return 'montage';
  return compositionPattern[index % compositionPattern.length];
};

const inferSocialDensity = (beat, index) => {
  const text = String(beat);
  if (/\b(gruppe|gruppen|publikum|menschen|personen|teilnehm|kollegen|familie|freunde|andere|beobachter)\b/iu.test(text)) return 'group';
  if (/\b(gespräch|feedback|kritik|lob|freund|kollege|partner|jemand|zwei|gegenüber|verhandlung)\b/iu.test(text)) return 'duo';
  return socialPattern[index % socialPattern.length];
};

const inferMoodProfile = (beat) => {
  const text = String(beat).toLocaleLowerCase('de-DE');

  if (/\b(manipulat|täusch|betrug|kontroll|missbrauch|zwang|einschüchter|grausam|ausnutz|lüg|dehuman|bedroh)/iu.test(text)) {
    return {moodMode: 'DARK', moodIntensity: 3, powerDynamic: 'DOMINANT_VS_TARGET'};
  }
  if (/\b(macht|autorität|hierarch|domin|status|chef|gehorsam|untergeordnet|herrsch)/iu.test(text)) {
    return {moodMode: 'POWER', moodIntensity: 2, powerDynamic: /gruppe|menschen|publikum/iu.test(text) ? 'AUTHORITY_VS_GROUP' : 'STATUS_CONTRAST'};
  }
  if (/\b(geld|preis|euro|€|gehalt|kauf|konsum|rabatt|angebot|verhandlung|aktie|anleger|verlust|gewinn|teuer|günstig)/iu.test(text)) {
    return {moodMode: 'MONEY', moodIntensity: 1, powerDynamic: /verhandlung|angebot|gehalt/iu.test(text) ? 'PEER_TO_PEER' : 'NEUTRAL'};
  }
  if (/\b(einsam|allein|isolier|ausgeschlossen|ausgrenz|verlassen|angst|verletzlich|furcht)/iu.test(text)) {
    return {moodMode: 'ISOLATION', moodIntensity: 3, powerDynamic: /gruppe|ausgegrenzt|ausgeschlossen/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'NONE'};
  }
  if (/\b(schutz|lösung|helfen|verhindern|gegenmaßnahme|ausweg|reduzier|verbesser|klarheit)/iu.test(text)) {
    return {moodMode: 'HOPE', moodIntensity: 1, powerDynamic: 'NEUTRAL'};
  }
  if (/\b(druck|unsicher|zweifel|konflikt|kritik|unangenehm|spannung|misstrau|skeptisch|gruppendruck)/iu.test(text)) {
    return {moodMode: 'UNEASY', moodIntensity: 2, powerDynamic: /gruppe|gruppendruck/iu.test(text) ? 'GROUP_VS_INDIVIDUAL' : 'PEER_TO_PEER'};
  }
  if (/\b(gruppe|menschen|andere|publikum|kollegen|freunde|familie)/iu.test(text)) {
    return {moodMode: 'CLEAR', moodIntensity: 1, powerDynamic: 'PEER_TO_PEER'};
  }
  return {moodMode: 'CLEAR', moodIntensity: 0, powerDynamic: 'NEUTRAL'};
};

const compositionGuidance = {
  standard: 'KOMPOSITION: STANDARD. Eine zusammenhängende konkrete Szene mit klarer Hierarchie. Nicht automatisch dieselbe one-stickman-in-room Formel wie zuvor verwenden.',
  split: 'KOMPOSITION: SPLIT. Zwei klar getrennte Bildhälften visualisieren zwei Seiten desselben gesprochenen Gedankens. Klare Blickführung, keine zusätzlichen unabhängigen Aussagen.',
  contrast: 'KOMPOSITION: CONTRAST. Zwei Zustände oder Perspektiven desselben Beats deutlich gegenüberstellen, ohne den Frame mit separaten Themen zu überladen.',
  montage: 'KOMPOSITION: MONTAGE. Ein dominantes Hauptmotiv plus höchstens 1–2 unterstützende Teilmomente desselben Beats. Keine Collage aus unabhängigen Aussagen.',
};

const socialGuidance = {
  solo: 'SOZIALDICHTE: SOLO. Eine Hauptfigur ist sinnvoll; Hintergrundfiguren nur, wenn sie den Kontext verbessern.',
  duo: 'SOZIALDICHTE: DUO. Wenn semantisch passend zwei relevante Stickmen mit echter Interaktion/Reaktion zeigen, nicht nur nebeneinander stellen.',
  group: 'SOZIALDICHTE: GROUP. Wenn semantisch passend drei oder mehr relevante Stickmen mit klarer sozialer Dynamik zeigen; visuelle Hierarchie behalten.',
  none: 'SOZIALDICHTE: NONE. Keine Person einfügen, wenn Objekt, Schema oder Umgebung den Beat klarer erklärt.',
};

const buildPlanningFields = (beat, index, options = {}) => {
  const compositionType = inferCompositionType(beat, index);
  const socialDensity = inferSocialDensity(beat, index);
  const isV2 = options.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';
  const mood = isV2 ? inferMoodProfile(beat) : {};

  return {
    visualIdea: `Visualisiere ausschließlich diesen gesprochenen Gedanken: ${beat}`,
    subject: 'CAST: Wähle beat-passende Stickmen gemäß SOZIALDICHTE. Standard ist neue passende Figur/Rolle; exakte Figurenwiederholung nur bei echter LOCAL CONTINUITY. Kleidung/Farben/Rollen dürfen variieren, Stickman-DNA bleibt gleich.',
    characterDirection: socialDensity === 'none'
      ? 'NO HUMAN REQUIRED unless human action is semantically necessary.'
      : 'Use the unified stickman family; choose role-appropriate clothing, posture, expression and silhouette without changing anatomy.',
    action: 'HANDLUNG: Übersetze den Beat in eine konkrete sichtbare Handlung, Relation oder Interaktion. Keine bloß stehende neutrale Figur, wenn eine Handlung möglich ist.',
    actionOrRelation: 'Translate the spoken beat into one visible action, relation, mechanism or contrast; do not add later information.',
    environment: 'ORT: Wähle einen glaubwürdigen inhaltlich passenden Ort oder eine klar begründete konzeptuelle Umgebung. Nicht automatisch Schreibtisch/Homeoffice; Ort soll die Aussage erklären und sich ohne Grund nicht ständig wiederholen.',
    camera: `KAMERA: ${cameraPresets[index % cameraPresets.length]}`,
    lightingMood: isV2 ? `Motivated cinematic illustrated lighting for ${mood.moodMode} at intensity ${mood.moodIntensity}; retain believable spatial depth.` : undefined,
    colorDirection: isV2 ? `Controlled color appropriate to ${mood.moodMode}; strongest useful contrast on the focal subject; no grey/beige default wash.` : undefined,
    compositionType,
    socialDensity,
    composition: compositionGuidance[compositionType],
    socialPlan: socialGuidance[socialDensity] ?? socialGuidance.solo,
    continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
    ...(isV2 ? {...mood, promptContract: 'FLOW_SCENE_PROMPT_CONTRACT_V1'} : {}),
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
        if (countWords(text) > 4) throw new Error(`Cover secondary text '${text}' must contain at most 4 words.`);
      });
    } else {
      texts.forEach((text) => {
        if (countWords(text) < 1 || countWords(text) > 5) throw new Error(`Flow text in scene ${moment.scene} must contain 1-5 words per string.`);
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
  const moments = hasModernTextPlan
    ? normalizeFlowTextMoments({coverHeadline, flowTextMoments: suppliedMoments, sceneCount: beats.length})
    : [];
  const byScene = new Map(moments.map((moment) => [moment.scene, moment]));
  const isV2 = options.visualSystem === 'CINEMATIC_HUMAN_BEHAVIOR_V2';

  return beats.map((beat, index) => {
    const plan = buildPlanningFields(beat, index, options);
    const sceneNumber = index + 1;
    const isCover = sceneNumber === 1;
    const textMoment = byScene.get(sceneNumber);
    const textList = textMoment ? normalizeTextList(textMoment.texts ?? textMoment.text) : [];
    const quotedText = textList.map((text) => `\"${text}\"`).join(', ');
    const textInstruction = textMoment
      ? `FLOW TEXT HARD LOCK: Render EXACT GERMAN TEXT ${quotedText} directly inside this image. Preserve spelling, umlauts and punctuation exactly. Keep all letters fully inside the safe frame. Use professional integrated editorial typography and strong contrast against the actual background. NO OTHER READABLE TEXT. `
      : 'FLOW TEXT HARD LOCK: ZERO READABLE TEXT. Do not copy text from any reference image. ';
    const coverInstruction = isCover
      ? 'COVER HARD LOCK: Diese erste Szene ist zugleich COVER/THUMBNAIL. Sie muss den ersten gesprochenen Beat korrekt zeigen und bewusst stärker als eine normale Szene funktionieren: dominantes Hauptmotiv, klare emotionale Spannung/Konflikt oder Handlung, starke Silhouette, schnelle Thumbnail-Lesbarkeit, klare Typografiezone, wenig visuelles Rauschen, keine spätere Information vorwegnehmen. Scene 01 is NOT the global style/anatomy master. '
      : '';

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
      visualTask:
        `${coverInstruction}${textInstruction}` +
        `VISUAL BEAT: Zeige ausschließlich die Information, die in diesem gesprochenen Beat vorkommt. ` +
        `Wähle CHARACTER_SCENE, SCHEMA_EXPLAINER, OBJECT_METAPHOR, COMPARE_VISUAL oder TEXT_ILLUSTRATION nach Klarheit statt nach Gewohnheit. ` +
        `Mehrere Teilbilder sind erlaubt, wenn sie denselben Beat besser erklären; niemals mehrere unabhängige Beats zusammenpressen. ` +
        `Keine spätere Information vorwegnehmen. Neue Orte, Personen, Objekte, Zahlen, Handlungen oder Ursache-Folge-Schritte müssen sichtbar werden, wenn sie in diesem Beat wichtig sind. ` +
        `${plan.subject} ${plan.environment} ${plan.action} ${plan.composition} ${plan.socialPlan} ${plan.camera} ` +
        `${isV2 ? `MOOD: ${plan.moodMode} intensity ${plan.moodIntensity}; POWER DYNAMIC: ${plan.powerDynamic}. ` : ''}` +
        `Gesprochener Beat: ${beat}`,
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
    visualPlanningPolicy: 'VARIED_COMPOSITION_V1',
    compositionTargets: {standard: 0.7, comparison: 0.2, montage: 0.1},
    socialScenePolicy: 'SOCIAL_VARIETY_V1',
    ...(isV2
      ? {
          visualSystem: 'CINEMATIC_HUMAN_BEHAVIOR_V2',
          characterSystem: 'STYLIZED_STICKMAN_CAST_V2',
          moodPolicy: 'ADAPTIVE_PSYCHOLOGICAL_MOOD_V1',
          promptContract: 'FLOW_SCENE_PROMPT_CONTRACT_V1',
          environmentPolicy: 'BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2',
          renderingPolicy: 'SOFT_CEL_SHADED_FILM_FRAME_V2',
          representationPolicy: 'MIXED_HUMAN_BEHAVIOR_VISUALS_V2',
        }
      : {}),
    ...(modernTextPlan
      ? {
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
        }
      : {}),
    scenes: buildVisualBeatScenes(beats, {
      coverHeadline: modernTextPlan?.coverHeadline,
      flowTextMoments: modernTextPlan?.flowTextMoments ?? [],
      visualSystem: plan.visualSystem,
    }),
    resolvedFromScript: auto.scriptPath,
  };
};
