import {Composition} from 'remotion';
import {Phase3ImageVideo, getStaticPhase3VideoProps} from './dinge-erklaert/Phase3ImageVideo';
import {getPhase3DurationInFrames, resolvePhase3Scenes, type Phase3ImageReelProps} from './dinge-erklaert/Phase3ImageReel';
import {ThumbnailText, type ThumbnailTextProps} from './dinge-erklaert/ThumbnailText';

const thumbnailDefaults: ThumbnailTextProps = {image: '', headline: 'Überschrift hier', position: 'left'};

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
  <>
    <Composition
      id="Phase3YouTube"
      component={Phase3ImageVideo}
      durationInFrames={18000}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={metadata}
    />
    <Composition
      id="Phase3Reel"
      component={Phase3ImageVideo}
      durationInFrames={5400}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={defaultProps}
      calculateMetadata={metadata}
    />
    <Composition
      id="ThumbnailText"
      component={ThumbnailText}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={thumbnailDefaults}
    />
  </>
);
