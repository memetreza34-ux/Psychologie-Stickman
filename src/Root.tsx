import {Composition} from 'remotion';
import {Phase3ImageVideo, getStaticPhase3VideoProps} from './dinge-erklaert/Phase3ImageVideo';
import {getPhase3DurationInFrames, resolvePhase3Scenes, type Phase3ImageReelProps} from './dinge-erklaert/Phase3ImageReel';
import {
  ProgrammaticReel,
  getProgrammaticReelDurationInFrames,
  type ProgrammaticReelProps,
} from './reels/ProgrammaticReel';
import {programmaticReelTestProps} from './reels/programmaticReelTestData';

const youtubeDefaultProps: Phase3ImageReelProps = {
  audio: '',
  wordTimings: [],
  wordScenes: [],
  scenes: [],
  captions: [],
  endHoldMs: 1000,
};

const reelDefaultProps: ProgrammaticReelProps = {
  audio: '',
  wordTimings: [],
  scenes: [],
  captionWordsPerPage: 4,
  showCaptions: true,
  activeCaptionColor: '#FFD84D',
  endHoldMs: 700,
};

const youtubeMetadata = ({props}: {props: Phase3ImageReelProps}) => ({
  durationInFrames: getPhase3DurationInFrames(resolvePhase3Scenes(getStaticPhase3VideoProps(props), 30)),
});

const reelMetadata = ({props}: {props: ProgrammaticReelProps}) => ({
  durationInFrames: getProgrammaticReelDurationInFrames(props, 30),
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
      defaultProps={youtubeDefaultProps}
      calculateMetadata={youtubeMetadata}
    />
    <Composition
      id="Phase3Reel"
      component={ProgrammaticReel}
      durationInFrames={5400}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={reelDefaultProps}
      calculateMetadata={reelMetadata}
    />
    <Composition
      id="ProgrammaticReelTest"
      component={ProgrammaticReel}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={programmaticReelTestProps}
      calculateMetadata={reelMetadata}
    />
  </>
);
