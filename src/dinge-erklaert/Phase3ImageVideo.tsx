import {Phase3ImageReel, type Phase3ImageReelProps} from './Phase3ImageReel';

export const getStaticPhase3VideoProps = (props: Phase3ImageReelProps): Phase3ImageReelProps => ({
  ...props,
  sceneEffects: [],
  wordScenes: props.wordScenes?.map((scene) => ({...scene, effect: 'static' as const})),
  scenes: props.scenes?.map((scene) => ({...scene, effect: 'static' as const})),
});

export const Phase3ImageVideo = (props: Phase3ImageReelProps) => (
  <Phase3ImageReel {...getStaticPhase3VideoProps(props)} />
);
