import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {InfoCardOverlay, type Phase3InfoCard} from './InfoCards';

export type {Phase3InfoCard} from './InfoCards';

export type Phase3ImageEffect = 'static' | 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
export type Phase3ImageScene = {image: string; from: number; durationInFrames: number; effect?: Phase3ImageEffect};
export type Phase3TimedWord = {text: string; startMs: number; endMs: number; timestampMs?: number; confidence?: number};
export type Phase3WordScene = {scene: number; image: string; startWord: number; endWord: number; startWordText: string; endWordText: string; effect?: Phase3ImageEffect};
export type Phase3Caption = {startFrame: number; endFrame: number; text: string};
export type Phase3SceneLabelPosition = 'top-left' | 'top-center' | 'center' | 'bottom-center';
export type Phase3SceneLabelVariant = 'keyword' | 'cover';
export type Phase3SceneLabel = {scene: number; text: string; position?: Phase3SceneLabelPosition; variant?: Phase3SceneLabelVariant};
// 'linear' = bisheriges Verhalten. 'smooth' = weiche Kamerafahrt mit Easing und etwas mehr Bewegung.
export type Phase3MotionStyle = 'linear' | 'smooth';
export type Phase3Transition = 'cut' | 'fade';
export type Phase3Music = {src: string; volume?: number; duckedVolume?: number; fadeMs?: number};
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
  sceneLabels?: Phase3SceneLabel[];
  autoCaptions?: boolean;
  captionWordsPerPage?: number;
  endHoldMs?: number;
  motionStyle?: Phase3MotionStyle;
  transition?: Phase3Transition;
  transitionMs?: number;
  infoCards?: Phase3InfoCard[];
  music?: Phase3Music;
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

const AnimatedSceneImage = ({scene, motionStyle = 'linear', leadInFrames = 0}: {scene: Phase3ImageScene; motionStyle?: Phase3MotionStyle; leadInFrames?: number}) => {
  const frame = useCurrentFrame();
  const lastFrame = Math.max(1, scene.durationInFrames + leadInFrames - 1);
  const effect = scene.effect ?? 'static';
  const smooth = motionStyle === 'smooth';
  const options = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', ...(smooth ? {easing: Easing.inOut(Easing.sin)} : {})} as const;
  const zoom = smooth ? 1.1 : 1.07;
  const panScale = smooth ? 1.1 : 1.08;
  const pan = smooth ? 4 : 3;
  let scale = 1;
  let translate = '0% 0%';

  if (effect === 'zoom-in') {
    scale = interpolate(frame, [0, lastFrame], [1, zoom], options);
  } else if (effect === 'zoom-out') {
    scale = interpolate(frame, [0, lastFrame], [zoom, 1], options);
  } else if (effect === 'pan-left') {
    scale = panScale;
    translate = interpolate(frame, [0, lastFrame], [`${pan}% 0%`, `-${pan}% 0%`], options);
  } else if (effect === 'pan-right') {
    scale = panScale;
    translate = interpolate(frame, [0, lastFrame], [`-${pan}% 0%`, `${pan}% 0%`], options);
  }

  return (
    <Img
      src={staticFile(scene.image)}
      style={{width: '100%', height: '100%', objectFit: 'cover', scale, translate}}
    />
  );
};

const SceneFrame = ({children, leadInFrames}: {children: React.ReactNode; leadInFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = leadInFrames > 0 ? interpolate(frame, [0, leadInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return <AbsoluteFill style={{backgroundColor: leadInFrames > 0 ? 'transparent' : '#000', overflow: 'hidden', opacity}}>{children}</AbsoluteFill>;
};

// Musik leiser, solange gesprochen wird (Ducking über die Wort-Timings), sanft ein- und ausgeblendet.
const MusicBed = ({music, wordTimings, totalFrames}: {music: Phase3Music; wordTimings: Phase3TimedWord[]; totalFrames: number}) => {
  const {fps} = useVideoConfig();
  const base = music.volume ?? 0.18;
  const ducked = music.duckedVolume ?? 0.07;
  const fade = Math.max(1, Math.round(((music.fadeMs ?? 1200) / 1000) * fps));
  const ranges = wordTimings.map((word) => [Math.floor((word.startMs / 1000) * fps) - 6, Math.ceil((word.endMs / 1000) * fps) + 10] as const);
  const ramp = Math.round(fps * 0.4);
  // 0 = gerade wird gesprochen, 1 = Sprechpause lang genug für volle Musiklautstärke.
  const pauseAmount = (frame: number) => {
    let low = 0;
    let high = ranges.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (ranges[mid][1] < frame) low = mid + 1;
      else if (ranges[mid][0] > frame) high = mid - 1;
      else return 0;
    }
    const sinceEnd = high >= 0 ? frame - ranges[high][1] : Infinity;
    const untilStart = low < ranges.length ? ranges[low][0] - frame : Infinity;
    return Math.min(1, Math.min(sinceEnd, untilStart) / ramp);
  };
  return (
    <Audio
      src={staticFile(music.src)}
      loop
      volume={(frame) => {
        const edge = Math.min(interpolate(frame, [0, fade], [0, 1], {extrapolateRight: 'clamp'}), interpolate(frame, [totalFrames - fade, totalFrames], [1, 0], {extrapolateLeft: 'clamp'}));
        return (ducked + (base - ducked) * pauseAmount(frame)) * edge;
      }}
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

const SceneLabelOverlay = ({label, scene, isVertical}: {label: Phase3SceneLabel; scene: Phase3ImageScene; isVertical: boolean}) => {
  const position = label.position ?? 'top-left';
  const variant = label.variant ?? 'keyword';
  const isCover = variant === 'cover';
  const justifyContent = position === 'center' ? 'center' : position === 'bottom-center' ? 'flex-end' : 'flex-start';
  const alignItems = position === 'top-left' ? 'flex-start' : 'center';

  return (
    <Sequence from={scene.from} durationInFrames={scene.durationInFrames}>
      <AbsoluteFill
        style={{
          justifyContent,
          alignItems,
          padding: isCover ? (isVertical ? 72 : 92) : (isVertical ? 72 : 64),
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: isCover ? (isVertical ? '88%' : '56%') : (isVertical ? '82%' : '62%'),
            color: '#fff',
            backgroundColor: isCover ? 'rgba(0,0,0,0.58)' : 'rgba(0,0,0,0.70)',
            borderRadius: isCover ? (isVertical ? 26 : 20) : (isVertical ? 20 : 14),
            padding: isCover ? (isVertical ? '22px 28px' : '22px 30px') : (isVertical ? '16px 22px' : '12px 18px'),
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: isCover ? (isVertical ? 78 : 86) : (isVertical ? 58 : 42),
            fontWeight: 900,
            lineHeight: isCover ? 1.02 : 1.08,
            letterSpacing: isCover ? '-0.02em' : '0em',
            textAlign: position === 'top-left' ? 'left' : 'center',
            textShadow: isCover ? '0 4px 16px rgba(0,0,0,0.65)' : '0 2px 8px rgba(0,0,0,0.45)',
          }}
        >
          {label.text}
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

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
  sceneLabels = [],
  autoCaptions,
  captionWordsPerPage = 4,
  endHoldMs = PHASE3_END_HOLD_MS,
  motionStyle = 'linear',
  transition = 'cut',
  transitionMs = 400,
  infoCards = [],
  music,
}: Phase3ImageReelProps) => {
  const {fps, width, height} = useVideoConfig();
  const isVertical = targetFormat === 'reel' || (targetFormat !== 'youtube' && height > width);
  const resolved = resolvePhase3Scenes({audio, targetFormat, wordTimings, imageBasePath, sceneStartWords, imageExtension, imageDigits, sceneEffects, wordScenes, scenes, captions, sceneLabels, autoCaptions, captionWordsPerPage, endHoldMs}, fps);
  const shouldAutoCaption = autoCaptions ?? isVertical;
  const effectiveCaptions = captions.length > 0 ? captions : shouldAutoCaption ? buildAutoCaptions(wordTimings, fps, captionWordsPerPage) : [];
  const effectiveLabels = sceneLabels.filter((label) => Number.isInteger(label.scene) && label.scene >= 1 && label.scene <= resolved.length && label.text.trim().length > 0);
  const effectiveCards = infoCards.filter((card) => Number.isInteger(card.scene) && card.scene >= 1 && card.scene <= resolved.length);
  const fadeFrames = transition === 'fade' ? Math.max(1, Math.round((transitionMs / 1000) * fps)) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#000', overflow: 'hidden'}}>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      {music ? <MusicBed music={music} wordTimings={wordTimings} totalFrames={getPhase3DurationInFrames(resolved)} /> : null}
      {resolved.map((scene, index) => {
        // Bei 'fade' startet jede Folgeszene etwas früher und blendet über die vorherige ein.
        const leadIn = index === 0 ? 0 : Math.min(fadeFrames, scene.from);
        return (
          <Sequence key={`${scene.image}-${index}`} from={scene.from - leadIn} durationInFrames={scene.durationInFrames + leadIn}>
            <SceneFrame leadInFrames={leadIn}>
              <AnimatedSceneImage scene={scene} motionStyle={motionStyle} leadInFrames={leadIn} />
            </SceneFrame>
          </Sequence>
        );
      })}
      {effectiveCards.map((card, index) => (
        <InfoCardOverlay key={`card-${card.scene}-${card.type}-${index}`} card={card} from={resolved[card.scene - 1].from} durationInFrames={resolved[card.scene - 1].durationInFrames} isVertical={isVertical} />
      ))}
      {effectiveLabels.map((label, index) => (
        <SceneLabelOverlay key={`${label.scene}-${label.text}-${label.variant ?? 'keyword'}-${index}`} label={label} scene={resolved[label.scene - 1]} isVertical={isVertical} />
      ))}
      {effectiveCaptions.map((caption, index) => (
        <CaptionOverlay key={`${caption.startFrame}-${caption.endFrame}-${index}`} caption={caption} isVertical={isVertical} />
      ))}
    </AbsoluteFill>
  );
};
