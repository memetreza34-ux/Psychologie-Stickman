import path from 'node:path';

export const tokenizeCanonicalScript = (script) =>
  String(script ?? '')
    .trim()
    .split(/\s+/u)
    .filter(Boolean);

export const normalizeWord = (value) =>
  String(value ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase('de-DE')
    .replace(/ß/gu, 'ss')
    .replace(/[„“”"‚‘’'`´….,!?;:()\[\]{}<>/\\|+*=~_^%$#@&–—-]/gu, '')
    .replace(/\s+/gu, '')
    .trim();

const levenshteinDistance = (a, b) => {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  const previous = Array.from({length: b.length + 1}, (_, index) => index);
  const current = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    for (let j = 0; j <= b.length; j += 1) previous[j] = current[j];
  }
  return previous[b.length];
};

export const tokenSimilarity = (a, b) => {
  const left = normalizeWord(a);
  const right = normalizeWord(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  const distance = levenshteinDistance(left, right);
  return Math.max(0, 1 - distance / Math.max(left.length, right.length));
};

export const captionsToObservedWords = (captions) => {
  const words = [];
  for (const caption of Array.isArray(captions) ? captions : []) {
    const tokens = String(caption?.text ?? '').trim().split(/\s+/u).filter(Boolean);
    if (!tokens.length) continue;
    const startMs = Number(caption.startMs);
    const endMs = Number(caption.endMs);
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) continue;
    const weights = tokens.map((token) => Math.max(1, normalizeWord(token).length));
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    const duration = Math.max(tokens.length, endMs - startMs);
    let cursor = startMs;
    tokens.forEach((token, index) => {
      const isLast = index === tokens.length - 1;
      const tokenDuration = isLast ? endMs - cursor : duration * (weights[index] / totalWeight);
      const tokenEnd = isLast ? endMs : Math.min(endMs, cursor + tokenDuration);
      words.push({text: token, startMs: cursor, endMs: Math.max(cursor + 1, tokenEnd)});
      cursor = tokenEnd;
    });
  }
  return words;
};

export const alignCanonicalWords = (canonicalWords, observedWords) => {
  const n = canonicalWords.length;
  const m = observedWords.length;
  const width = m + 1;
  const dp = new Float64Array((n + 1) * width);
  const op = new Uint8Array((n + 1) * width);
  const at = (i, j) => i * width + j;

  for (let i = 1; i <= n; i += 1) {
    dp[at(i, 0)] = i;
    op[at(i, 0)] = 2;
  }
  for (let j = 1; j <= m; j += 1) {
    dp[at(0, j)] = j;
    op[at(0, j)] = 3;
  }

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= m; j += 1) {
      const similarity = tokenSimilarity(canonicalWords[i - 1], observedWords[j - 1]?.text);
      const pairCost = dp[at(i - 1, j - 1)] + 2 * (1 - similarity);
      const deleteCost = dp[at(i - 1, j)] + 1;
      const insertCost = dp[at(i, j - 1)] + 1;
      if (pairCost <= deleteCost && pairCost <= insertCost) {
        dp[at(i, j)] = pairCost;
        op[at(i, j)] = 1;
      } else if (deleteCost <= insertCost) {
        dp[at(i, j)] = deleteCost;
        op[at(i, j)] = 2;
      } else {
        dp[at(i, j)] = insertCost;
        op[at(i, j)] = 3;
      }
    }
  }

  const mapping = new Array(n).fill(null);
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const action = op[at(i, j)];
    if (action === 1 && i > 0 && j > 0) {
      const similarity = tokenSimilarity(canonicalWords[i - 1], observedWords[j - 1]?.text);
      if (similarity >= 0.5) mapping[i - 1] = {observedIndex: j - 1, similarity};
      i -= 1;
      j -= 1;
    } else if (action === 2 && i > 0) {
      i -= 1;
    } else if (j > 0) {
      j -= 1;
    } else {
      i -= 1;
    }
  }

  const matched = mapping.filter(Boolean).length;
  const strongMatches = mapping.filter((item) => item && item.similarity >= 0.8).length;
  return {
    mapping,
    matched,
    strongMatches,
    coverage: n ? matched / n : 0,
    strongCoverage: n ? strongMatches / n : 0,
  };
};

const allocateRun = ({timings, canonicalWords, from, to, startMs, endMs}) => {
  const count = to - from + 1;
  if (count <= 0) return;
  const safeStart = Math.max(0, Number(startMs) || 0);
  const safeEnd = Math.max(safeStart + count, Number(endMs) || safeStart + count);
  const weights = canonicalWords.slice(from, to + 1).map((word) => Math.max(1, normalizeWord(word).length));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  let cursor = safeStart;
  for (let index = 0; index < count; index += 1) {
    const absoluteIndex = from + index;
    const isLast = index === count - 1;
    const duration = isLast ? safeEnd - cursor : (safeEnd - safeStart) * (weights[index] / totalWeight);
    const wordEnd = isLast ? safeEnd : Math.min(safeEnd, cursor + duration);
    timings[absoluteIndex] = {startMs: cursor, endMs: Math.max(cursor + 1, wordEnd)};
    cursor = wordEnd;
  }
};

export const materializeCanonicalTimings = ({canonicalWords, observedWords, alignment, audioDurationMs}) => {
  const timings = new Array(canonicalWords.length).fill(null);
  alignment.mapping.forEach((item, index) => {
    if (!item) return;
    const observed = observedWords[item.observedIndex];
    timings[index] = {
      startMs: Math.max(0, Number(observed.startMs) || 0),
      endMs: Math.max((Number(observed.startMs) || 0) + 1, Number(observed.endMs) || 0),
    };
  });

  let index = 0;
  while (index < timings.length) {
    if (timings[index]) {
      index += 1;
      continue;
    }
    const from = index;
    while (index < timings.length && !timings[index]) index += 1;
    const to = index - 1;
    const previous = from > 0 ? timings[from - 1] : null;
    const next = index < timings.length ? timings[index] : null;
    const observedDurations = observedWords
      .map((word) => Number(word.endMs) - Number(word.startMs))
      .filter((value) => Number.isFinite(value) && value > 0)
      .sort((a, b) => a - b);
    const medianDuration = observedDurations.length
      ? observedDurations[Math.floor(observedDurations.length / 2)]
      : 220;
    const runCount = to - from + 1;
    let startMs;
    let endMs;
    if (previous && next && next.startMs > previous.endMs + runCount) {
      startMs = previous.endMs;
      endMs = next.startMs;
    } else if (previous && next) {
      startMs = previous.endMs;
      endMs = Math.max(startMs + runCount, next.startMs);
    } else if (next) {
      endMs = Math.max(runCount, next.startMs);
      startMs = Math.max(0, endMs - medianDuration * runCount);
    } else if (previous) {
      startMs = previous.endMs;
      endMs = Math.max(startMs + runCount, Number(audioDurationMs) || startMs + medianDuration * runCount);
    } else {
      startMs = 0;
      endMs = Math.max(runCount, Number(audioDurationMs) || medianDuration * runCount);
    }
    allocateRun({timings, canonicalWords, from, to, startMs, endMs});
  }

  let previousStart = -1;
  return timings.map((timing, wordIndex) => {
    const startMs = Math.max(0, Math.round(Math.max(timing.startMs, previousStart + 1)));
    const endMs = Math.max(startMs + 1, Math.round(timing.endMs));
    previousStart = startMs;
    return {
      text: canonicalWords[wordIndex],
      startMs,
      endMs,
      timestampMs: startMs,
      confidence: alignment.mapping[wordIndex]?.similarity ?? null,
    };
  });
};

export const buildCanonicalWordTimings = ({script, captions, audioDurationMs, minimumCoverage = 0.85}) => {
  const canonicalWords = tokenizeCanonicalScript(script);
  if (!canonicalWords.length) throw new Error('Script contains no spoken words.');
  const observedWords = captionsToObservedWords(captions);
  if (!observedWords.length) throw new Error('Whisper returned no timed words.');
  const alignment = alignCanonicalWords(canonicalWords, observedWords);
  if (alignment.coverage < minimumCoverage) {
    throw new Error(
      `Word timing alignment coverage too low: ${(alignment.coverage * 100).toFixed(1)}% < ${(minimumCoverage * 100).toFixed(0)}%. ` +
        'Check that final-voice.mp3 was generated from the current script.',
    );
  }
  const words = materializeCanonicalTimings({canonicalWords, observedWords, alignment, audioDurationMs});
  return {words, alignment, observedWordCount: observedWords.length};
};

export const resolveProjectPath = (projectArg, repoRoot = path.resolve('.')) => {
  const projectDir = path.resolve(projectArg);
  const relative = path.relative(repoRoot, projectDir).replace(/\\/gu, '/');
  if (relative.startsWith('..') || path.isAbsolute(relative) || !relative.startsWith('youtube/')) {
    throw new Error('Project path must point to a folder inside youtube/.');
  }
  return {projectDir, relative};
};
