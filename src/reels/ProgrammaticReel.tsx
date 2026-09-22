import {Audio} from '@remotion/media';
import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type ReelTimedWord = {
  text: string;
  startMs: number;
  endMs: number;
};

export type ProgrammaticSceneKind =
  | 'coffee-spill'
  | 'crowd-gaze'
  | 'reality'
  | 'spotlight'
  | 'phone'
  | 'comparison'
  | 'generic';

export type ProgrammaticReelScene = {
  kind: ProgrammaticSceneKind;
  startWord: number;
  endWord: number;
  actionWord?: number;
  label?: string;
  accent?: string;
};

export type ProgrammaticReelProps = {
  audio?: string;
  wordTimings: ReelTimedWord[];
  scenes: ProgrammaticReelScene[];
  captionWordsPerPage?: number;
  showCaptions?: boolean;
  activeCaptionColor?: string;
  endHoldMs?: number;
};

type ResolvedScene = {
  scene: ProgrammaticReelScene;
  from: number;
  durationInFrames: number;
  cueFrame: number;
};

const DEFAULT_ACCENT = '#FFD84D';
const DEFAULT_END_HOLD_MS = 700;
const TRANSITION_FRAMES = 8;

const clampWordIndex = (value: number, wordCount: number) =>
  Math.max(1, Math.min(wordCount, Math.round(value)));

const msToFrame = (ms: number, fps: number) => Math.max(0, Math.round((ms / 1000) * fps));

export const resolveProgrammaticReelScenes = (
  props: ProgrammaticReelProps,
  fps: number,
): ResolvedScene[] => {
  const words = props.wordTimings ?? [];
  const scenes = props.scenes ?? [];
  if (!words.length || !scenes.length) return [];

  return scenes.map((scene, index) => {
    const startWord = clampWordIndex(scene.startWord, words.length);
    const endWord = clampWordIndex(scene.endWord, words.length);
    if (endWord < startWord) throw new Error(`Programmatic scene ${index + 1}: endWord is before startWord.`);

    const from = index === 0 ? 0 : msToFrame(words[startWord - 1].startMs, fps);
    const nextScene = scenes[index + 1];
    const nextStart = nextScene
      ? msToFrame(words[clampWordIndex(nextScene.startWord, words.length) - 1].startMs, fps)
      : null;
    const lastWordEnd = words[endWord - 1].endMs + (props.endHoldMs ?? DEFAULT_END_HOLD_MS);
    const naturalEnd = msToFrame(lastWordEnd, fps);
    const baseEnd = nextStart ?? naturalEnd;
    const overlap = nextStart === null ? 0 : TRANSITION_FRAMES;
    const actionWord = clampWordIndex(scene.actionWord ?? startWord, words.length);
    const cueFrame = Math.max(0, msToFrame(words[actionWord - 1].startMs, fps) - from);

    return {
      scene: {...scene, startWord, endWord, actionWord},
      from,
      durationInFrames: Math.max(1, baseEnd - from + overlap),
      cueFrame,
    };
  });
};

export const getProgrammaticReelDurationInFrames = (
  props: ProgrammaticReelProps,
  fps: number,
) => {
  const resolved = resolveProgrammaticReelScenes(props, fps);
  if (!resolved.length) return 1;
  return Math.max(...resolved.map((item) => item.from + item.durationInFrames));
};

const SceneBackdrop = ({dim = false}: {dim?: boolean}) => (
  <AbsoluteFill
    style={{
      background: dim
        ? 'linear-gradient(180deg, #111820 0%, #202b36 100%)'
        : 'linear-gradient(180deg, #eaf2f6 0%, #d8e4eb 58%, #c6d3db 100%)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 110,
        left: 70,
        right: 70,
        height: 78,
        borderRadius: 28,
        backgroundColor: dim ? '#202b35' : '#f8fbfd',
        border: `6px solid ${dim ? '#344452' : '#9db1bf'}`,
      }}
    />
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        style={{
          position: 'absolute',
          top: 245,
          left: 90 + index * 310,
          width: 250,
          height: 390,
          borderRadius: 32,
          background: dim
            ? 'linear-gradient(180deg, #17212b, #263746)'
            : 'linear-gradient(180deg, #b9dceb, #eef7fb)',
          border: `7px solid ${dim ? '#344452' : '#7e98a9'}`,
        }}
      />
    ))}
    {[0, 1, 2, 3].map((index) => (
      <div
        key={`pole-${index}`}
        style={{
          position: 'absolute',
          top: 205,
          left: 70 + index * 305,
          width: 12,
          height: 1210,
          borderRadius: 8,
          backgroundColor: dim ? '#52616d' : '#6d8798',
          opacity: 0.72,
        }}
      />
    ))}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 410,
        backgroundColor: dim ? '#18212a' : '#b8c5cd',
      }}
    />
  </AbsoluteFill>
);

type StickmanPose = 'neutral' | 'surprised' | 'phone' | 'look';

const Stickman = ({
  x,
  y,
  scale = 1,
  pose = 'neutral',
  sweater = '#315f7d',
  opacity = 1,
  translateY = 0,
  rotate = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  pose?: StickmanPose;
  sweater?: string;
  opacity?: number;
  translateY?: number;
  rotate?: number;
}) => {
  const leftArm = pose === 'surprised' ? [58, 118, 22, 145] : pose === 'phone' ? [58, 120, 72, 164] : [58, 120, 35, 178];
  const rightArm = pose === 'surprised' ? [122, 118, 158, 145] : pose === 'phone' ? [122, 120, 106, 164] : pose === 'look' ? [122, 120, 153, 104] : [122, 120, 145, 178];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 180,
        height: 320,
        opacity,
        transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: '50% 100%',
      }}
    >
      <svg viewBox="0 0 180 320" width="180" height="320">
        <circle cx="90" cy="45" r="34" fill="#f7f4ec" stroke="#202a33" strokeWidth="8" />
        <circle cx="79" cy="42" r="3.8" fill="#202a33" />
        <circle cx="101" cy="42" r="3.8" fill="#202a33" />
        <path
          d={pose === 'surprised' ? 'M79 60 Q90 52 101 60' : 'M80 58 Q90 65 100 58'}
          fill="none"
          stroke="#202a33"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="57" y="83" width="66" height="104" rx="24" fill={sweater} stroke="#202a33" strokeWidth="8" />
        <line x1={leftArm[0]} y1={leftArm[1]} x2={leftArm[2]} y2={leftArm[3]} stroke="#202a33" strokeWidth="9" strokeLinecap="round" />
        <line x1={rightArm[0]} y1={rightArm[1]} x2={rightArm[2]} y2={rightArm[3]} stroke="#202a33" strokeWidth="9" strokeLinecap="round" />
        <line x1="77" y1="185" x2="61" y2="284" stroke="#202a33" strokeWidth="10" strokeLinecap="round" />
        <line x1="103" y1="185" x2="119" y2="284" stroke="#202a33" strokeWidth="10" strokeLinecap="round" />
        {pose === 'phone' ? (
          <rect x="77" y="145" width="29" height="46" rx="6" fill="#161c22" stroke="#f5f5f5" strokeWidth="3" />
        ) : null}
      </svg>
    </div>
  );
};

const CoffeeCup = ({x, y, tilt, fall}: {x: number; y: number; tilt: number; fall: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 108,
      height: 142,
      transform: `translateY(${fall * 30}px) rotate(${tilt}deg)`,
      transformOrigin: '70% 82%',
    }}
  >
    <div style={{position: 'absolute', left: 14, top: 18, width: 80, height: 104, borderRadius: '12px 12px 25px 25px', backgroundColor: '#f5eee1', border: '7px solid #29333c'}} />
    <div style={{position: 'absolute', left: 7, top: 5, width: 95, height: 24, borderRadius: 14, backgroundColor: '#38434d'}} />
  </div>
);

const CoffeeSpillScene = ({progress, cue}: {progress: number; cue: number}) => {
  const drop = interpolate(cue, [0, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <SceneBackdrop />
      <Stickman x={452} y={610} pose={cue > 0.25 ? 'surprised' : 'neutral'} translateY={-14 * cue} />
      <CoffeeCup x={268 + progress * 8} y={650} tilt={68 * cue} fall={cue} />
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: 370 + index * 28,
            top: 760 + index * 6 + drop * (110 + index * 34),
            width: 22,
            height: 34,
            borderRadius: '50% 50% 60% 60%',
            backgroundColor: '#754729',
            opacity: cue,
            rotate: `${20 + index * 18}deg`,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 505,
          top: 782,
          width: 80,
          height: 55,
          borderRadius: '48% 58% 52% 62%',
          backgroundColor: '#694329',
          opacity: cue,
          transform: `scale(${0.15 + cue * 0.85}) rotate(-13deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

const CrowdGazeScene = ({cue}: {cue: number}) => (
  <AbsoluteFill>
    <SceneBackdrop />
    <Stickman x={450} y={620} pose="surprised" />
    <Stickman x={88} y={700} scale={0.78} pose="look" sweater="#705b86" />
    <Stickman x={770} y={705} scale={0.75} pose="look" sweater="#607b5d" />
    <Stickman x={155} y={1030} scale={0.66} pose="phone" sweater="#91624f" />
    <Stickman x={735} y={1040} scale={0.64} pose="phone" sweater="#536e84" />
    <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
      {[
        [205, 785],
        [870, 785],
        [270, 1125],
        [820, 1125],
      ].map(([x, y], index) => (
        <line
          key={index}
          x1={x}
          y1={y}
          x2="540"
          y2="815"
          stroke="#e6b83c"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="24 24"
          strokeDashoffset={80 * (1 - cue)}
          opacity={0.15 + cue * 0.7}
        />
      ))}
    </svg>
    <div
      style={{
        position: 'absolute',
        left: 444,
        top: 770,
        width: 190,
        height: 115,
        borderRadius: '50%',
        border: '8px solid #FFD84D',
        opacity: cue * 0.85,
        transform: `scale(${0.65 + cue * 0.35})`,
      }}
    />
  </AbsoluteFill>
);

const RealityScene = ({progress, cue}: {progress: number; cue: number}) => (
  <AbsoluteFill>
    <SceneBackdrop />
    <Stickman x={448} y={690} scale={0.92} pose="neutral" opacity={0.88} />
    <Stickman x={100} y={620} scale={0.86} pose="phone" sweater="#716287" />
    <Stickman x={785} y={635} scale={0.8} pose="phone" sweater="#5c7a62" />
    <Stickman x={90} y={1050} scale={0.66} pose="neutral" sweater="#8c654e" />
    <Stickman x={805} y={1030} scale={0.67} pose="look" sweater="#536f88" />
    <div
      style={{
        position: 'absolute',
        left: 449,
        top: 718,
        width: 180,
        height: 180,
        borderRadius: '50%',
        border: '7px solid rgba(255,216,77,0.75)',
        opacity: 0.55 * (1 - cue),
        transform: `scale(${1.4 - cue * 0.65})`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 150,
        top: 815,
        width: 118,
        height: 205,
        borderRadius: 26,
        backgroundColor: '#19232c',
        border: '7px solid #f6f7f8',
        opacity: 0.8,
        transform: `translateY(${Math.sin(progress * Math.PI * 2) * 5}px)`,
      }}
    />
  </AbsoluteFill>
);

const SpotlightScene = ({cue}: {cue: number}) => (
  <AbsoluteFill>
    <SceneBackdrop dim />
    <div
      style={{
        position: 'absolute',
        left: 270,
        top: 120,
        width: 540,
        height: 1260,
        clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
        background: 'linear-gradient(180deg, rgba(255,231,138,0.02), rgba(255,216,77,0.48))',
        opacity: 0.2 + cue * 0.8,
        transform: `scaleX(${0.6 + cue * 0.4})`,
        transformOrigin: '50% 0%',
      }}
    />
    <Stickman x={452} y={710} pose="neutral" sweater="#315f7d" translateY={-8 * cue} />
    <Stickman x={72} y={840} scale={0.7} pose="phone" sweater="#665a78" opacity={0.76} />
    <Stickman x={825} y={865} scale={0.68} pose="phone" sweater="#5d735c" opacity={0.76} />
    <div
      style={{
        position: 'absolute',
        left: 345,
        top: 1170,
        width: 390,
        height: 95,
        borderRadius: '50%',
        backgroundColor: 'rgba(255,216,77,0.32)',
        filter: 'blur(18px)',
        opacity: cue,
      }}
    />
  </AbsoluteFill>
);

const PhoneScene = ({cue}: {cue: number}) => (
  <AbsoluteFill>
    <SceneBackdrop />
    <Stickman x={450} y={650} pose="phone" />
    <div
      style={{
        position: 'absolute',
        left: 445,
        top: 770,
        width: 190,
        height: 330,
        borderRadius: 38,
        border: '9px solid #202a33',
        backgroundColor: '#eef5f8',
        transform: `scale(${0.82 + cue * 0.18}) rotate(${Math.sin(cue * Math.PI * 5) * 2}deg)`,
      }}
    />
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: 675 + index * 28,
          top: 815 - index * 34,
          width: 12,
          height: 76 + index * 24,
          borderRadius: 8,
          backgroundColor: '#FFD84D',
          rotate: `${18 + index * 10}deg`,
          opacity: cue,
        }}
      />
    ))}
  </AbsoluteFill>
);

const ComparisonScene = ({cue}: {cue: number}) => (
  <AbsoluteFill style={{backgroundColor: '#e8eff3'}}>
    <div style={{position: 'absolute', inset: '120px 50% 260px 0', borderRight: '5px solid #96a8b4'}} />
    <div style={{position: 'absolute', left: 0, right: '50%', top: 210, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 54, fontWeight: 800, color: '#26323b'}}>IM KOPF</div>
    <div style={{position: 'absolute', left: '50%', right: 0, top: 210, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 54, fontWeight: 800, color: '#26323b'}}>IN ECHT</div>
    <div style={{position: 'absolute', left: 30, top: 400, width: 480, height: 900, borderRadius: 60, backgroundColor: `rgba(255,216,77,${0.2 + cue * 0.35})`}} />
    <div style={{position: 'absolute', right: 70, top: 650, width: 390, height: 560, borderRadius: 60, backgroundColor: 'rgba(111,142,158,0.18)'}} />
    <Stickman x={160} y={650} scale={1.15} pose="surprised" />
    <Stickman x={665} y={760} scale={0.86} pose="neutral" />
  </AbsoluteFill>
);

const GenericScene = ({cue, label}: {cue: number; label?: string}) => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #edf3f5, #d6e2e8)', alignItems: 'center', justifyContent: 'center'}}>
    <div
      style={{
        width: 720,
        minHeight: 520,
        borderRadius: 64,
        backgroundColor: '#f9fbfc',
        border: '8px solid #26323b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        transform: `scale(${0.88 + cue * 0.12})`,
      }}
    >
      <div style={{fontFamily: 'Arial, sans-serif', fontSize: 64, fontWeight: 900, lineHeight: 1.08, textAlign: 'center', color: '#26323b'}}>
        {label || 'VISUAL BEAT'}
      </div>
    </div>
  </AbsoluteFill>
);

const renderScene = (scene: ProgrammaticReelScene, progress: number, cue: number) => {
  switch (scene.kind) {
    case 'coffee-spill':
      return <CoffeeSpillScene progress={progress} cue={cue} />;
    case 'crowd-gaze':
      return <CrowdGazeScene cue={cue} />;
    case 'reality':
      return <RealityScene progress={progress} cue={cue} />;
    case 'spotlight':
      return <SpotlightScene cue={cue} />;
    case 'phone':
      return <PhoneScene cue={cue} />;
    case 'comparison':
      return <ComparisonScene cue={cue} />;
    default:
      return <GenericScene cue={cue} label={scene.label} />;
  }
};

const SceneLayer = ({resolved}: {resolved: ResolvedScene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = resolved.durationInFrames;
  const fadeIn = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [Math.max(0, duration - TRANSITION_FRAMES), duration - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const progress = interpolate(frame, [0, Math.max(1, duration - 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cue = spring({
    frame: Math.max(0, frame - resolved.cueFrame),
    fps,
    config: {damping: 18, stiffness: 180, mass: 0.72},
    durationInFrames: 18,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(fadeIn, fadeOut),
        transform: `translateY(${(1 - fadeIn) * 28}px) scale(${1.025 - fadeIn * 0.025})`,
        overflow: 'hidden',
      }}
    >
      {renderScene(resolved.scene, progress, cue)}
    </AbsoluteFill>
  );
};

type CaptionPage = {
  words: ReelTimedWord[];
  startFrame: number;
  endFrame: number;
};

const buildCaptionPages = (words: ReelTimedWord[], fps: number, wordsPerPage: number): CaptionPage[] => {
  const pageSize = Math.max(2, Math.min(6, Math.round(wordsPerPage)));
  const pages: CaptionPage[] = [];
  for (let index = 0; index < words.length; index += pageSize) {
    const pageWords = words.slice(index, index + pageSize);
    if (!pageWords.length) continue;
    pages.push({
      words: pageWords,
      startFrame: msToFrame(pageWords[0].startMs, fps),
      endFrame: Math.max(msToFrame(pageWords.at(-1)!.endMs, fps), msToFrame(pageWords[0].startMs, fps) + 1),
    });
  }
  return pages;
};

const KaraokeCaption = ({page, activeColor}: {page: CaptionPage; activeColor: string}) => {
  const localFrame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const globalFrame = page.startFrame + localFrame;
  const currentMs = (globalFrame / fps) * 1000;

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 265, pointerEvents: 'none'}}>
      <div
        style={{
          maxWidth: 930,
          padding: '18px 26px 20px',
          borderRadius: 26,
          backgroundColor: 'rgba(10,16,21,0.76)',
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 14px 40px rgba(0,0,0,0.20)',
          textAlign: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 66,
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: -1.2,
        }}
      >
        {page.words.map((word, index) => {
          const active = currentMs >= word.startMs && currentMs < word.endMs;
          return (
            <span
              key={`${word.startMs}-${index}`}
              style={{
                display: 'inline-block',
                marginRight: index === page.words.length - 1 ? 0 : 15,
                color: active ? activeColor : '#ffffff',
                transform: `scale(${active ? 1.08 : 1}) translateY(${active ? -2 : 0}px)`,
                textShadow: active ? `0 0 20px ${activeColor}55` : '0 2px 8px rgba(0,0,0,0.35)',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const EmptyReel = () => (
  <AbsoluteFill style={{backgroundColor: '#111820', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{fontFamily: 'Arial, sans-serif', fontSize: 52, fontWeight: 800, color: '#ffffff', textAlign: 'center', padding: 80}}>
      Phase3Reel benötigt Worttimings und programmaticScenes.
    </div>
  </AbsoluteFill>
);

export const ProgrammaticReel = ({
  audio = '',
  wordTimings,
  scenes,
  captionWordsPerPage = 4,
  showCaptions = true,
  activeCaptionColor = DEFAULT_ACCENT,
  endHoldMs = DEFAULT_END_HOLD_MS,
}: ProgrammaticReelProps) => {
  const {fps} = useVideoConfig();
  const props: ProgrammaticReelProps = {
    audio,
    wordTimings: wordTimings ?? [],
    scenes: scenes ?? [],
    captionWordsPerPage,
    showCaptions,
    activeCaptionColor,
    endHoldMs,
  };
  const resolved = resolveProgrammaticReelScenes(props, fps);
  const pages = buildCaptionPages(props.wordTimings, fps, captionWordsPerPage);

  if (!resolved.length) return <EmptyReel />;

  const audioSrc = audio
    ? /^https?:\/\//i.test(audio)
      ? audio
      : staticFile(audio.replace(/^\/+/, ''))
    : '';

  return (
    <AbsoluteFill style={{backgroundColor: '#111820', overflow: 'hidden'}}>
      {audioSrc ? <Audio src={audioSrc} /> : null}
      {resolved.map((item, index) => (
        <Sequence
          key={`${item.scene.kind}-${item.scene.startWord}-${index}`}
          from={item.from}
          durationInFrames={item.durationInFrames}
        >
          <SceneLayer resolved={item} />
        </Sequence>
      ))}
      {showCaptions
        ? pages.map((page, index) => (
            <Sequence
              key={`${page.startFrame}-${index}`}
              from={page.startFrame}
              durationInFrames={Math.max(1, page.endFrame - page.startFrame + 1)}
            >
              <KaraokeCaption page={page} activeColor={activeCaptionColor} />
            </Sequence>
          ))
        : null}
    </AbsoluteFill>
  );
};
