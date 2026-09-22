import {Phase3ImageReel, type Phase3ImageReelProps} from './Phase3ImageReel';

export const getPhase3VideoProps = (props: Phase3ImageReelProps): Phase3ImageReelProps => ({...props});

// Backward-compatible export for older callers. Effects are no longer stripped.
export const getStaticPhase3VideoProps = getPhase3VideoProps;

export const Phase3ImageVideo = (props: Phase3ImageReelProps) => (
  <Phase3ImageReel {...getPhase3VideoProps(props)} />
);
