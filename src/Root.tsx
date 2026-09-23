import {Composition} from 'remotion';
import {Phase3ImageVideo, getStaticPhase3VideoProps} from './dinge-erklaert/Phase3ImageVideo';
import {getPhase3DurationInFrames, resolvePhase3Scenes, type Phase3ImageReelProps} from './dinge-erklaert/Phase3ImageReel';

const defaultProps: Phase3ImageReelProps = {
  audio: '',
  wordTimings: [],
  wordScenes: [],
  scenes: [],
  captions: [],
  endHoldMs: 1000,
};

const metadata = ({props}: {props: Phase3ImageReelProps}) => ({
  durationInFrames: getPhase3DurationInFrames(resolvePhase3Scenes(getStaticPhase3VideoProps(props), 30)),
});

export const RemotionRoot = () => (
  <Composition
    id="Phase3ImageVideo"
    component={Phase3ImageVideo}
    durationInFrames={18000}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={defaultProps}
    calculateMetadata={metadata}
  />
);
