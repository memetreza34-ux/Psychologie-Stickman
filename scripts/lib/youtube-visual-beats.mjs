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
    if (merged.length > 0 && countWords(rawPart) < minWords) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${rawPart}`.trim();
    } else {
      merged.push(rawPart);
    }
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

  const shouldTrySemanticSplit =
    wordCount > targetWords ||
    (wordCount >= 10 && commaCount >= 1 && hasListChoice) ||
    (wordCount >= 12 && hasContrastOrCause);

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
      } else {
        current = candidate;
      }
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

  const paragraphs = String(script)
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  const beats = [];

  for (const paragraph of paragraphs) {
    const sentences = [...segmenter.segment(paragraph)]
      .map((item) => item.segment.trim())
      .filter(Boolean);

    for (const sentence of sentences) {
      beats.push(...splitLongSentence(sentence, targetWords, maxWords, semanticSplit));
    }
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
  subject:
    'CAST: Wähle 1–4 beat-passende Stickmen. Standard ist neue passende Figur/Rolle; exakte Figurenwiederholung nur bei echter LOCAL CONTINUITY. Kleidung/Farben/Rollen dürfen variieren, Stickman-DNA bleibt gleich.',
  action:
    'HANDLUNG: Übersetze den Beat in eine konkrete sichtbare Handlung oder Interaktion. Keine bloß stehende neutrale Figur, wenn eine Handlung möglich ist.',
  environment:
    'ORT: Wähle einen glaubwürdigen inhaltlich passenden Ort. Nicht automatisch Schreibtisch/Homeoffice; Ort soll die Aussage erklären und sich ohne Grund nicht ständig wiederholen.',
  camera: `KAMERA: ${cameraPresets[index % cameraPresets.length]}`,
  continuityPolicy: 'NEW_CHARACTER_DEFAULT_UNLESS_LOCAL_CONTINUITY',
});

export const buildVisualBeatScenes = (beats) =>
  beats.map((beat, index) => {
    const plan = buildPlanningFields(beat, index);
    return {
      scene: index + 1,
      startPhrase: firstWords(beat, 8),
      endWord: lastWord(beat),
      speechSection: beat,
      textPolicy: 'NONE',
      ...plan,
      visualTask:
        `VISUAL BEAT: Zeige ausschließlich die Information, die in diesem gesprochenen Beat vorkommt. ` +
        `Bevorzuge eine konkrete Stickman-Handlung in einer glaubwürdigen Umgebung vor abstrakten Diagrammen. ` +
        `Keine spätere Information vorwegnehmen. Neue Orte, Personen, Objekte, Zahlen, Handlungen oder Ursache-Folge-Schritte müssen sichtbar werden, wenn sie in diesem Beat wichtig sind. ` +
        `${plan.subject} ${plan.environment} ${plan.action} ${plan.camera} ` +
        `Google-Flow-Quellbild ohne lesbaren Text erzeugen; deutsche Labels werden bei Bedarf später in Remotion ergänzt. ` +
        `Gesprochener Beat: ${beat}`,
    };
  });

export const resolvePhase1Plan = (plan, planPath = '') => {
  if (Array.isArray(plan.scenes) && plan.scenes.length > 0) return plan;
  const auto = plan.autoFromScript;
  if (!auto || typeof auto !== 'object') return plan;
  if (typeof auto.scriptPath !== 'string' || auto.scriptPath.trim() === '') {
    throw new Error(`autoFromScript.scriptPath is required in ${planPath || 'phase1 plan'}.`);
  }

  const scriptPath = path.resolve(auto.scriptPath);
  if (!fs.existsSync(scriptPath)) throw new Error(`Script not found for visual-beat generation: ${scriptPath}`);

  const script = fs.readFileSync(scriptPath, 'utf8');
  const beats = splitScriptIntoVisualBeats(script, auto);
  if (beats.length === 0) throw new Error(`No visual beats derived from ${scriptPath}.`);

  return {
    ...plan,
    scenes: buildVisualBeatScenes(beats),
    resolvedFromScript: auto.scriptPath,
  };
};
