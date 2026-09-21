import fs from 'node:fs';
import path from 'node:path';

export const countWords = (value) => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

const hardSplit = (text, maxWords) => {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  const out = [];
  for (let i = 0; i < words.length; i += maxWords) out.push(words.slice(i, i + maxWords).join(' '));
  return out.filter(Boolean);
};

const splitLongSentence = (sentence, targetWords, maxWords) => {
  if (countWords(sentence) <= maxWords) return [sentence.trim()];
  const clauses = sentence.trim().split(/(?<=[,;:–—])\s+/u).filter(Boolean);
  if (clauses.length === 1) return hardSplit(sentence, maxWords);
  const beats = [];
  let current = '';
  for (const clause of clauses) {
    if (countWords(clause) > maxWords) {
      if (current) { beats.push(current); current = ''; }
      beats.push(...hardSplit(clause, maxWords));
      continue;
    }
    const candidate = current ? `${current} ${clause}` : clause;
    if (current && countWords(candidate) > targetWords) { beats.push(current); current = clause; }
    else current = candidate;
  }
  if (current) beats.push(current);
  return beats.flatMap((beat) => (countWords(beat) > maxWords ? hardSplit(beat, maxWords) : [beat]));
};

const mergeDateFragments = (sentences) => {
  const months = 'Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember';
  const out = [];
  for (let i = 0; i < sentences.length; i++) {
    let current = sentences[i];
    while (/\b\d{1,2}\.$/u.test(current) && i + 1 < sentences.length && new RegExp(`^(${months})\\b`, 'u').test(sentences[i + 1])) {
      current = `${current} ${sentences[++i]}`;
    }
    out.push(current);
  }
  return out;
};

export const splitScriptIntoVisualBeats = (script, options = {}) => {
  const targetWords = Number(options.targetWords ?? 16);
  const maxWords = Number(options.maxWords ?? 20);
  if (!Number.isFinite(targetWords) || targetWords < 6) throw new Error('targetWords must be >= 6.');
  if (!Number.isFinite(maxWords) || maxWords < targetWords) throw new Error('maxWords must be >= targetWords.');
  const paragraphs = String(script).replace(/\r\n/g, '\n').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const segmenter = new Intl.Segmenter('de', {granularity: 'sentence'});
  const beats = [];
  for (const paragraph of paragraphs) {
    const raw = [...segmenter.segment(paragraph)].map((item) => item.segment.trim()).filter(Boolean);
    for (const sentence of mergeDateFragments(raw)) beats.push(...splitLongSentence(sentence, targetWords, maxWords));
  }
  return beats.filter(Boolean);
};

const firstWords = (text, count = 8) => String(text).trim().split(/\s+/).filter(Boolean).slice(0, count).join(' ');
const lastWord = (text) => String(text).trim().split(/\s+/).filter(Boolean).at(-1) ?? '';

export const buildVisualBeatScenes = (beats) => beats.map((beat, index) => ({
  scene: index + 1,
  startPhrase: firstWords(beat, 8),
  endWord: lastWord(beat),
  speechSection: beat,
  visualTask: `VISUAL BEAT: Zeige ausschließlich die Information dieses gesprochenen Beats. Keine spätere Information vorwegnehmen. Gesprochener Beat: ${beat}`,
}));

const loadSceneBatches = (paths, planPath) => {
  const scenes = [];
  for (const batchPath of paths) {
    const absolute = path.resolve(batchPath);
    if (!fs.existsSync(absolute)) throw new Error(`Scene batch not found for ${planPath || 'phase1 plan'}: ${absolute}`);
    const parsed = JSON.parse(fs.readFileSync(absolute, 'utf8'));
    if (!Array.isArray(parsed.scenes)) throw new Error(`Scene batch has no scenes array: ${absolute}`);
    for (const raw of parsed.scenes) {
      const speechSection = String(raw.speechSection ?? '').trim();
      const visualTask = String(raw.visualTask ?? '').trim();
      if (!speechSection || !visualTask) throw new Error(`Scene batch entry missing speechSection/visualTask: ${absolute}`);
      scenes.push({
        scene: Number(raw.scene),
        startPhrase: firstWords(speechSection, 8),
        endWord: lastWord(speechSection),
        speechSection,
        ...(raw.visualMode ? {visualMode: raw.visualMode} : {}),
        visualTask,
        ...(raw.promptId ? {promptId: raw.promptId} : {}),
      });
    }
  }
  scenes.sort((a, b) => a.scene - b.scene);
  scenes.forEach((scene, index) => {
    if (scene.scene !== index + 1) throw new Error(`Scene batches must be continuous from 1. Expected ${index + 1}, got ${scene.scene}.`);
  });
  return scenes;
};

export const resolvePhase1Plan = (plan, planPath = '') => {
  if (Array.isArray(plan.scenes) && plan.scenes.length > 0) return plan;
  if (Array.isArray(plan.sceneBatchPaths) && plan.sceneBatchPaths.length > 0) {
    return {...plan, scenes: loadSceneBatches(plan.sceneBatchPaths, planPath), resolvedFromSceneBatches: true};
  }
  const auto = plan.autoFromScript;
  if (!auto || typeof auto !== 'object') return plan;
  if (typeof auto.scriptPath !== 'string' || auto.scriptPath.trim() === '') throw new Error(`autoFromScript.scriptPath is required in ${planPath || 'phase1 plan'}.`);
  const scriptPath = path.resolve(auto.scriptPath);
  if (!fs.existsSync(scriptPath)) throw new Error(`Script not found for visual-beat generation: ${scriptPath}`);
  const script = fs.readFileSync(scriptPath, 'utf8');
  const beats = splitScriptIntoVisualBeats(script, auto);
  if (beats.length === 0) throw new Error(`No visual beats derived from ${scriptPath}.`);
  return {...plan, scenes: buildVisualBeatScenes(beats), resolvedFromScript: auto.scriptPath};
};
