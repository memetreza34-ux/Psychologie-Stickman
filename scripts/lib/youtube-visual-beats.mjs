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
  if (/\b(gespräch|feedback|kritik|lob|freund|kollege|partner|jemand|zwei|gegenüber)\b/iu.test(text)) return 'duo';
  return socialPattern[index % socialPattern.length];
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
};

const buildPlanningFields = (beat, index) => {
  const compositionType = inferCompositionType(beat, index);
  const socialDensity = inferSocialDensity(beat, index);
  return {
    visualIdea: `Visualisiere ausschließlich diesen gesprochenen Gedanken: ${beat}`,
    subject: 'CAST: Wähle beat-passende Stickmen gemäß SOZIALDICHTE. Standard ist neue passende Figur/Rolle; exakte Figurenwiederholung nur bei echter LOCAL CONTINUITY. Kleidung/Farben/Rollen dürfen variieren, Stickman-DNA bleibt gleich.',
    action: 'HANDLUNG: Übersetze den Beat in eine konkrete sichtbare Handlung oder Interaktion. Keine bloß stehende neutrale Figur, wenn eine Handlung möglich ist.',
    environment: 'ORT: Wähle einen glaubwürdigen inhaltlich passenden Ort. Nicht automatisch Schreibtisch/Homeoffice; Ort soll die Aussage erklären und sich ohne Grund nicht ständig wiederholen.',
    camera: `KAMERA: ${cameraPresets[index % cameraPresets.length]}`,
    compositionType,
    socialDensity,
    composition: compositionGuidance[compositionType],
    socialPlan: socialGuidance[socialDensity],
    continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
  };
};

const normalizeFlowTextMoments = ({coverHeadline, flowTextMoments = [], sceneCount}) => {
  const moments = Array.isArray(flowTextMoments) ? flowTextMoments.map((item) => ({...item})) : [];
  const cover = String(coverHeadline ?? '').trim();
  if (cover && !moments.some((item) => Number(item.scene) === 1)) moments.unshift({scene: 1, kind: 'cover', text: cover});

  const seen = new Set();
  for (const moment of moments) {
    moment.scene = Number(moment.scene);
    moment.kind = moment.scene === 1 ? 'cover' : (moment.kind ?? 'keyword');
    moment.text = String(moment.text ?? '').trim();
    if (!Number.isInteger(moment.scene) || moment.scene < 1 || moment.scene > sceneCount) throw new Error(`flowTextMoments contains invalid scene ${moment.scene}.`);
    if (seen.has(moment.scene)) throw new Error(`flowTextMoments contains duplicate scene ${moment.scene}.`);
    seen.add(moment.scene);
    const words = countWords(moment.text);
    if (moment.scene === 1 && (words < 2 || words > 7)) throw new Error('Cover text must contain 2-7 words.');
    if (moment.scene !== 1 && (words < 1 || words > 5)) throw new Error(`Flow keyword in scene ${moment.scene} must contain 1-5 words.`);
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

  return beats.map((beat, index) => {
    const plan = buildPlanningFields(beat, index);
    const sceneNumber = index + 1;
    const isCover = sceneNumber === 1;
    const textMoment = byScene.get(sceneNumber);
    const textInstruction = textMoment
      ? `FLOW TEXT HARD LOCK: Render EXACT GERMAN TEXT \"${textMoment.text}\" directly inside this image. Preserve spelling, umlauts and punctuation exactly. Keep all letters fully inside the safe frame. Use professional integrated editorial typography, clean readable letterforms, safe margins, no meme/sticker lettering and no oversized heavy outline by default. Design the text into a calm intentional text zone so it feels part of the scene. NO OTHER READABLE TEXT. `
      : 'FLOW TEXT HARD LOCK: ZERO READABLE TEXT. Do not copy text from the master image. ';
    const coverInstruction = isCover
      ? 'COVER HARD LOCK: Diese erste Szene ist zugleich COVER/THUMBNAIL und STYLE-/ANATOMY-MASTER. Sie muss den ersten gesprochenen Beat korrekt zeigen und bewusst stärker als eine normale Szene funktionieren: dominantes Hauptmotiv, klare emotionale Spannung/Konflikt oder Handlung, starke Silhouette, schnelle Thumbnail-Lesbarkeit, klare Typografiezone, wenig visuelles Rauschen, keine spätere Information vorwegnehmen. '
      : '';

    return {
      scene: sceneNumber,
      isCover,
      ...(isCover ? {coverRole: 'SCENE_01_COVER_MASTER'} : {}),
      startPhrase: firstWords(beat, 8),
      endWord: lastWord(beat),
      speechSection: beat,
      textPolicy: textMoment ? (isCover ? 'FLOW_EXACT_COVER_TEXT' : 'FLOW_EXACT_KEYWORD_TEXT') : 'NONE',
      ...(textMoment ? {flowText: textMoment.text, flowTextKind: textMoment.kind} : {}),
      ...plan,
      visualTask:
        `${coverInstruction}${textInstruction}` +
        `VISUAL BEAT: Zeige ausschließlich die Information, die in diesem gesprochenen Beat vorkommt. ` +
        `Bevorzuge eine konkrete Stickman-Handlung in einer glaubwürdigen Umgebung vor abstrakten Diagrammen. ` +
        `Mehrere Teilbilder sind erlaubt, wenn sie denselben Beat besser erklären; niemals mehrere unabhängige Beats zusammenpressen. ` +
        `Keine spätere Information vorwegnehmen. Neue Orte, Personen, Objekte, Zahlen, Handlungen oder Ursache-Folge-Schritte müssen sichtbar werden, wenn sie in diesem Beat wichtig sind. ` +
        `${plan.subject} ${plan.environment} ${plan.action} ${plan.composition} ${plan.socialPlan} ${plan.camera} ` +
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

  return {
    ...plan,
    visualPlanningPolicy: 'VARIED_COMPOSITION_V1',
    compositionTargets: {standard: 0.7, comparison: 0.2, montage: 0.1},
    socialScenePolicy: 'SOCIAL_VARIETY_V1',
    ...(modernTextPlan
      ? {
          visibleTextLanguage: 'de',
          visibleTextRenderer: 'GOOGLE_FLOW',
          flowSourceImageTextPolicy: 'PLANNED_EXACT_GERMAN_TEXT_ONLY',
          flowTextStylePolicy: 'EDITORIAL_INTEGRATED_V1',
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
    }),
    resolvedFromScript: auto.scriptPath,
  };
};
