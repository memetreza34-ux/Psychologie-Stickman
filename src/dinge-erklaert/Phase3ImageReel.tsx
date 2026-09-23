import {Audio} from '@remotion/media';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type Phase3ImageEffect = 'static' | 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
export type Phase3ImageScene = {image: string; from: number; durationInFrames: number; effect?: Phase3ImageEffect};
export type Phase3TimedWord = {text: string; startMs: number; endMs: number; timestampMs?: number; confidence?: number};
export type Phase3WordScene = {scene: number; image: string; startWord: number; endWord: number; startWordText: string; endWordText: string; effect?: Phase3ImageEffect};
export type Phase3Caption = {startFrame: number; endFrame: number; text: string};
export type Phase3ImageReelProps = {
  audio: string;
  targetFormat?: 'youtube' | 'reel';
  wordTimings?: Phase3TimedWord[];
  imageBasePath?: string;
  sceneStartWords?: number[];
  imageExtension?: string;
  imageDigits?: number;
  sceneEffects?: Phase3ImageEffect[];
  wordScenes?: Phase3WordScene[];
  scenes?: Phase3ImageScene[];
  captions?: Phase3Caption[];
  autoCaptions?: boolean;
  captionWordsPerPage?: number;
  endHoldMs?: number;
};

export const PHASE3_END_HOLD_MS = 1000;

const compactImagePath = (basePath: string, index: number, count: number, extension = 'png', digits?: number) => {
  const width = digits ?? Math.max(2, String(count).length);
  const base = basePath.replace(/^\/+|\/+$/g, '');
  return `${base}/${String(index + 1).padStart(width, '0')}.${extension.replace(/^\./, '')}`;
};

export const resolvePhase3Scenes = (props: Phase3ImageReelProps, fps: number): Phase3ImageScene[] => {
  const words = props.wordTimings ?? [];
  const starts = props.sceneStartWords ?? [];
  const endHoldMs = props.endHoldMs ?? PHASE3_END_HOLD_MS;
  if (starts.length > 0) {
    if (!props.imageBasePath || words.length === 0 || starts[0] !== 1) throw new Error('Invalid compact Phase 3 plan.');
    const startFrames = starts.map((word, index) => index === 0 ? 0 : Math.max(0, Math.round((words[word - 1].startMs / 1000) * fps)));
    return starts.map((_, index) => {
      const from = startFrames[index];
      const next = startFrames[index + 1];
      const finalWord = words.at(-1)!;
      const finalEnd = Math.max(from + 1, Math.ceil(((finalWord.endMs + endHoldMs) / 1000) * fps));
      return {
        image: compactImagePath(props.imageBasePath!, index, starts.length, props.imageExtension, props.imageDigits),
        from,
        durationInFrames: Math.max(1, (next ?? finalEnd) - from),
        effect: props.sceneEffects?.[index] ?? 'static',
      };
    });
  }
  if ((props.wordScenes ?? []).length > 0) {
    const scenes = props.wordScenes!;
    const startFrames = scenes.map((scene, index) => index === 0 ? 0 : Math.max(0, Math.round((words[scene.startWord - 1].startMs / 1000) * fps)));
    return scenes.map((scene, index) => {
      const from = startFrames[index];
      const next = startFrames[index + 1];
      const endWord = words[scene.endWord - 1];
      const finalEnd = Math.max(from + 1, Math.ceil(((endWord.endMs + endHoldMs) / 1000) * fps));
      return {image: scene.image, from, durationInFrames: Math.max(1, (next ?? finalEnd) - from), effect: scene.effect ?? props.sceneEffects?.[index] ?? 'static'};
    });
  }
  return props.scenes ?? [];
};

export const getPhase3DurationInFrames = (scenes: Phase3ImageScene[]) => Math.max(1, ...scenes.map((scene) => scene.from + scene.durationInFrames));

const buildAutoCaptions = (words: Phase3TimedWord[], fps: number, wordsPerPage: number): Phase3Caption[] => {
  const result: Phase3Caption[] = [];
  const pageSize = Math.max(2, Math.min(7, Math.round(wordsPerPage)));
  for (let index = 0; index < words.length; index += pageSize) {
    const page = words.slice(index, index + pageSize);
    if (!page.length) continue;
    result.push({
      startFrame: Math.max(0, Math.floor((page[0].startMs / 1000) * fps)),
      endFrame: Math.max(0, Math.ceil((page.at(-1)!.endMs / 1000) * fps)),
      text: page.map((word) => word.text).join(' '),
    });
  }
  return result;
};

const AnimatedSceneImage = ({scene}: {scene: Phase3ImageScene}) => {
  const frame = useCurrentFrame();
  const lastFrame = Math.max(1, scene.durationInFrames - 1);
  const effect = scene.effect ?? 'static';
  let scale = 1;
  let translate = '0% 0%';

  if (effect === 'zoom-in') {
    scale = interpolate(frame, [0, lastFrame], [1, 1.07], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  } else if (effect === 'zoom-out') {
    scale = interpolate(frame, [0, lastFrame], [1.07, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  } else if (effect === 'pan-left') {
    scale = 1.08;
    translate = interpolate(frame, [0, lastFrame], ['3% 0%', '-3% 0%'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  } else if (effect === 'pan-right') {
    scale = 1.08;
    translate = interpolate(frame, [0, lastFrame], ['-3% 0%', '3% 0%'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  }

  return (
    <Img
      src={staticFile(scene.image)}
      style={{width: '100%', height: '100%', objectFit: 'cover', scale, translate}}
    />
  );
};

const CaptionOverlay = ({caption, isVertical}: {caption: Phase3Caption; isVertical: boolean}) => (
  <Sequence from={caption.startFrame} durationInFrames={Math.max(1, caption.endFrame - caption.startFrame + 1)}>
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: isVertical ? 300 : 90,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: isVertical ? '88%' : '78%',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.72)',
          borderRadius: isVertical ? 22 : 14,
          padding: isVertical ? '16px 22px' : '10px 16px',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: isVertical ? 64 : 44,
          fontWeight: 800,
          lineHeight: 1.08,
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(0,0,0,0.45)',
        }}
      >
        {caption.text}
      </div>
    </AbsoluteFill>
  </Sequence>
);

export const Phase3ImageReel = ({
  audio,
  targetFormat,
  wordTimings = [],
  imageBasePath,
  sceneStartWords = [],
  imageExtension = 'png',
  imageDigits,
  sceneEffects = [],
  wordScenes = [],
  scenes = [],
  captions = [],
  autoCaptions,
  captionWordsPerPage = 4,
  endHoldMs = PHASE3_END_HOLD_MS,
}: Phase3ImageReelProps) => {
  const {fps, width, height} = useVideoConfig();
  const isVertical = targetFormat === 'reel' || (targetFormat !== 'youtube' && height > width);
  const resolved = resolvePhase3Scenes({audio, targetFormat, wordTimings, imageBasePath, sceneStartWords, imageExtension, imageDigits, sceneEffects, wordScenes, scenes, captions, autoCaptions, captionWordsPerPage, endHoldMs}, fps);
  const shouldAutoCaption = autoCaptions ?? isVertical;
  const effectiveCaptions = captions.length > 0 ? captions : shouldAutoCaption ? buildAutoCaptions(wordTimings, fps, captionWordsPerPage) : [];

  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      {resolved.map((scene, index) => (
        <Sequence key={`${scene.image}-${index}`} from={scene.from} durationInFrames={scene.durationInFrames}>
          <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
            <AnimatedSceneImage scene={scene} />
          </AbsoluteFill>
        </Sequence>
      ))}
      {effectiveCaptions.map((caption, index) => (
        <CaptionOverlay key={`${caption.startFrame}-${caption.endFrame}-${index}`} caption={caption} isVertical={isVertical} />
      ))}
    </AbsoluteFill>
  );
};
