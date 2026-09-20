import {Audio} from '@remotion/media';
import {AbsoluteFill, Img, Sequence, staticFile} from 'remotion';

export type Phase3ImageEffect = 'static' | 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
export type Phase3ImageScene = {image: string; from: number; durationInFrames: number; effect?: Phase3ImageEffect};
export type Phase3TimedWord = {text: string; startMs: number; endMs: number; timestampMs?: number; confidence?: number};
export type Phase3WordScene = {scene: number; image: string; startWord: number; endWord: number; startWordText: string; endWordText: string; effect?: Phase3ImageEffect};
export type Phase3Caption = {startFrame: number; endFrame: number; text: string};
export type Phase3ImageReelProps = {
  audio: string;
  wordTimings?: Phase3TimedWord[];
  imageBasePath?: string;
  sceneStartWords?: number[];
  imageExtension?: string;
  imageDigits?: number;
  sceneEffects?: Phase3ImageEffect[];
  wordScenes?: Phase3WordScene[];
  scenes?: Phase3ImageScene[];
  captions?: Phase3Caption[];
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
        effect: 'static',
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
      return {image: scene.image, from, durationInFrames: Math.max(1, (next ?? finalEnd) - from), effect: 'static'};
    });
  }
  return props.scenes ?? [];
};

export const getPhase3DurationInFrames = (scenes: Phase3ImageScene[]) => Math.max(1, ...scenes.map((scene) => scene.from + scene.durationInFrames));

export const Phase3ImageReel = ({audio, wordTimings = [], imageBasePath, sceneStartWords = [], imageExtension = 'png', imageDigits, wordScenes = [], scenes = [], captions = [], endHoldMs = PHASE3_END_HOLD_MS}: Phase3ImageReelProps) => {
  const resolved = resolvePhase3Scenes({audio, wordTimings, imageBasePath, sceneStartWords, imageExtension, imageDigits, wordScenes, scenes, captions, endHoldMs}, 30);
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      {resolved.map((scene, index) => (
        <Sequence key={`${scene.image}-${index}`} from={scene.from} durationInFrames={scene.durationInFrames}>
          <AbsoluteFill style={{backgroundColor: '#000'}}>
            <Img src={staticFile(scene.image)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
