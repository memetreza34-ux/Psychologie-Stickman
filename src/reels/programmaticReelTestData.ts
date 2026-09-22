import type {ProgrammaticReelProps, ProgrammaticReelScene, ProgrammaticSceneKind, ReelTimedWord} from './ProgrammaticReel';

type TestScene = {
  kind: ProgrammaticSceneKind;
  text: string;
  actionToken: string;
};

const sourceScenes: TestScene[] = [
  {
    kind: 'coffee-spill',
    text: 'Du verschüttest Kaffee auf deinen Pullover.',
    actionToken: 'verschüttest',
  },
  {
    kind: 'crowd-gaze',
    text: 'Im Zug bist du plötzlich sicher: Jeder sieht den Fleck.',
    actionToken: 'Jeder',
  },
  {
    kind: 'reality',
    text: 'Wahrscheinlich deutlich weniger Menschen, als du denkst.',
    actionToken: 'weniger',
  },
  {
    kind: 'spotlight',
    text: 'In der Psychologie nennt man das den Spotlight-Effekt.',
    actionToken: 'Spotlight-Effekt.',
  },
];

const normalize = (value: string) => value.toLocaleLowerCase('de-DE').replace(/[.,!?;:]/g, '');

const buildTestProps = (): ProgrammaticReelProps => {
  const wordTimings: ReelTimedWord[] = [];
  const scenes: ProgrammaticReelScene[] = [];
  let cursorMs = 0;
  let absoluteWord = 1;

  for (const scene of sourceScenes) {
    const tokens = scene.text.split(/\s+/).filter(Boolean);
    const startWord = absoluteWord;
    let actionWord = startWord;

    tokens.forEach((token, tokenIndex) => {
      const startMs = cursorMs;
      const durationMs = token.length >= 10 ? 390 : token.length <= 3 ? 260 : 330;
      const endMs = startMs + durationMs;
      wordTimings.push({text: token, startMs, endMs});
      if (normalize(token) === normalize(scene.actionToken)) actionWord = absoluteWord + tokenIndex;
      cursorMs = endMs + 70;
    });

    const endWord = absoluteWord + tokens.length - 1;
    scenes.push({
      kind: scene.kind,
      startWord,
      endWord,
      actionWord,
    });

    absoluteWord = endWord + 1;
    cursorMs += 210;
  }

  return {
    audio: '',
    wordTimings,
    scenes,
    captionWordsPerPage: 4,
    showCaptions: true,
    activeCaptionColor: '#FFD84D',
    endHoldMs: 700,
  };
};

export const programmaticReelTestProps = buildTestProps();
