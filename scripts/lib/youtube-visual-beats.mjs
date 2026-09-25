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

const buildPlanningFields = (beat, index) => ({
  visualIdea: `Visualisiere ausschließlich diesen gesprochenen Gedanken: ${beat}`,
  subject: 'CAST: Wähle 1–4 beat-passende Stickmen. Standard ist neue passende Figur/Rolle; exakte Figurenwiederholung nur bei echter LOCAL CONTINUITY. Kleidung/Farben/Rollen dürfen variieren, Stickman-DNA bleibt gleich.',
  action: 'HANDLUNG: Übersetze den Beat in eine konkrete sichtbare Handlung oder Interaktion. Keine bloß stehende neutrale Figur, wenn eine Handlung möglich ist.',
  environment: 'ORT: Wähle einen glaubwürdigen inhaltlich passenden Ort. Nicht automatisch Schreibtisch/Homeoffice; Ort soll die Aussage erklären und sich ohne Grund nicht ständig wiederholen.',
  camera: `KAMERA: ${cameraPresets[index % cameraPresets.length]}`,
  continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
});

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
  const moments = normalizeFlowTextMoments({coverHeadline, flowTextMoments: options.flowTextMoments ?? [], sceneCount: beats.length});
  const byScene = new Map(moments.map((moment) => [moment.scene, moment]));

  return beats.map((beat, index) => {
    const plan = buildPlanningFields(beat, index);
    const sceneNumber = index + 1;
    const isCover = sceneNumber === 1;
    const textMoment = byScene.get(sceneNumber);
    const textInstruction = textMoment
      ? `FLOW TEXT HARD LOCK: Render EXACT GERMAN TEXT \"${textMoment.text}\" directly inside this image. Preserve spelling, umlauts and punctuation exactly. Keep all letters fully inside the safe frame. NO OTHER READABLE TEXT. `
      : 'FLOW TEXT HARD LOCK: ZERO READABLE TEXT. Do not copy text from the master image. ';
    const coverInstruction = isCover
      ? 'COVER HARD LOCK: Diese erste Szene ist zugleich COVER/THUMBNAIL und STYLE-/ANATOMY-MASTER. Sie muss den ersten gesprochenen Beat korrekt zeigen und gleichzeitig als starkes Cover funktionieren: klares großes Hauptmotiv, schnelle Lesbarkeit, starke Pose/Emotion oder Handlung, wenig visuelles Rauschen, keine spätere Information vorwegnehmen. '
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
        `Keine spätere Information vorwegnehmen. Neue Orte, Personen, Objekte, Zahlen, Handlungen oder Ursache-Folge-Schritte müssen sichtbar werden, wenn sie in diesem Beat wichtig sind. ` +
        `${plan.subject} ${plan.environment} ${plan.action} ${plan.camera} ` +
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
    ...(modernTextPlan
      ? {
          visibleTextLanguage: 'de',
          visibleTextRenderer: 'GOOGLE_FLOW',
          flowSourceImageTextPolicy: 'PLANNED_EXACT_GERMAN_TEXT_ONLY',
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
