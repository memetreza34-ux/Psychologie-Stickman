import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// Code-gerenderte Text-/Schema-Karten. KI-Bilder bleiben textfrei; jeder deutsche Text kommt von hier und ist daher immer korrekt geschrieben.
export type Phase3InfoCardPosition = 'top' | 'center' | 'bottom';
type CardBase = {scene: number; delayMs?: number; position?: Phase3InfoCardPosition};
export type Phase3InfoCard =
  | (CardBase & {type: 'keyword'; text: string; sub?: string})
  | (CardBase & {type: 'compare'; left: string; right: string; leftSub?: string; rightSub?: string; title?: string})
  | (CardBase & {type: 'steps'; steps: string[]})
  | (CardBase & {type: 'stat'; value: string; label: string});

export const PHASE3_INFO_CARD_TYPES = ['keyword', 'compare', 'steps', 'stat'] as const;

const INK = '#1f2328';
const PAPER = '#fffaf0';
const ACCENT = '#e8553d';
const FONT = '"Arial Rounded MT Bold", "Nunito", "Helvetica Neue", Arial, sans-serif';

const usePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 160, mass: 0.7}});
};

const Paper = ({children, tilt = -1.2, scale = 1, isVertical}: {children: React.ReactNode; tilt?: number; scale?: number; isVertical: boolean}) => {
  const pop = usePop();
  return (
    <div
      style={{
        background: PAPER,
        color: INK,
        border: `${isVertical ? 7 : 6}px solid ${INK}`,
        borderRadius: 28,
        boxShadow: `10px 12px 0 ${INK}`,
        padding: isVertical ? '34px 40px' : '28px 44px',
        fontFamily: FONT,
        transform: `rotate(${tilt}deg) scale(${pop * scale})`,
        opacity: Math.min(1, pop * 1.4),
        maxWidth: isVertical ? '88%' : '70%',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

const KeywordCard = ({card, isVertical}: {card: Extract<Phase3InfoCard, {type: 'keyword'}>; isVertical: boolean}) => (
  <Paper isVertical={isVertical}>
    <div style={{fontSize: isVertical ? 92 : 96, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.01em'}}>{card.text}</div>
    {card.sub ? <div style={{fontSize: isVertical ? 46 : 42, marginTop: 14, opacity: 0.8}}>{card.sub}</div> : null}
  </Paper>
);

const StatCard = ({card, isVertical}: {card: Extract<Phase3InfoCard, {type: 'stat'}>; isVertical: boolean}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Zahl zählt hoch, Prefix/Suffix (z.B. "%", "x") bleiben stehen.
  const match = card.value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  let shown = card.value;
  if (match) {
    const target = Number(match[2].replace(',', '.'));
    const decimals = (match[2].split(/[.,]/)[1] ?? '').length;
    const progress = interpolate(frame, [4, fps * 1.1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - (1 - t) ** 3});
    shown = `${match[1]}${(target * progress).toFixed(decimals).replace('.', match[2].includes(',') ? ',' : '.')}${match[3]}`;
  }
  return (
    <Paper isVertical={isVertical} tilt={1}>
      <div style={{fontSize: isVertical ? 170 : 180, fontWeight: 900, lineHeight: 1, color: ACCENT}}>{shown}</div>
      <div style={{fontSize: isVertical ? 48 : 44, marginTop: 10}}>{card.label}</div>
    </Paper>
  );
};

const CompareCard = ({card, isVertical}: {card: Extract<Phase3InfoCard, {type: 'compare'}>; isVertical: boolean}) => {
  const {fps} = useVideoConfig();
  const right = usePop(Math.round(fps * 0.45));
  const column = (title: string, sub: string | undefined, color: string, extra?: React.CSSProperties) => (
    <div style={{flex: 1, padding: '18px 22px', borderRadius: 20, border: `5px solid ${INK}`, background: color, ...extra}}>
      <div style={{fontSize: isVertical ? 60 : 58, fontWeight: 900, lineHeight: 1.05}}>{title}</div>
      {sub ? <div style={{fontSize: isVertical ? 38 : 34, marginTop: 8}}>{sub}</div> : null}
    </div>
  );
  return (
    <Paper isVertical={isVertical} tilt={-0.6}>
      {card.title ? <div style={{fontSize: isVertical ? 50 : 46, fontWeight: 900, marginBottom: 18}}>{card.title}</div> : null}
      <div style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row', gap: 24, alignItems: 'stretch', minWidth: isVertical ? 0 : 900}}>
        {column(card.left, card.leftSub, '#dfeef7')}
        <div style={{alignSelf: 'center', fontSize: 54, fontWeight: 900}}>vs.</div>
        {column(card.right, card.rightSub, '#fde3d8', {opacity: right, transform: `translateY(${(1 - right) * 30}px)`})}
      </div>
    </Paper>
  );
};

const StepsCard = ({card, isVertical}: {card: Extract<Phase3InfoCard, {type: 'steps'}>; isVertical: boolean}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const steps = card.steps.slice(0, 4);
  const gap = Math.round(fps * 0.5);
  return (
    <Paper isVertical={isVertical} tilt={0.6}>
      <div style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row', alignItems: 'center', gap: 18}}>
        {steps.map((step, index) => {
          const appear = spring({frame: frame - index * gap, fps, config: {damping: 16, stiffness: 170}});
          return (
            <div key={`${step}-${index}`} style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row', alignItems: 'center', gap: 18, opacity: appear}}>
              {index > 0 ? <div style={{fontSize: 60, fontWeight: 900, color: ACCENT}}>{isVertical ? '↓' : '→'}</div> : null}
              <div style={{border: `5px solid ${INK}`, borderRadius: 18, padding: '14px 22px', background: index === steps.length - 1 ? '#fff1c9' : '#fff', fontSize: isVertical ? 54 : 52, fontWeight: 900, transform: `scale(${0.85 + 0.15 * appear})`}}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

const CardBody = ({card, isVertical}: {card: Phase3InfoCard; isVertical: boolean}) => {
  if (card.type === 'keyword') return <KeywordCard card={card} isVertical={isVertical} />;
  if (card.type === 'stat') return <StatCard card={card} isVertical={isVertical} />;
  if (card.type === 'compare') return <CompareCard card={card} isVertical={isVertical} />;
  return <StepsCard card={card} isVertical={isVertical} />;
};

// Mittige Karten sind bewusste Erklär-Momente: Bild dahinter leicht abdunkeln, damit die Karte klar führt.
const Dim = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 0.35], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: '#000', opacity}} />;
};

const FadeOut = ({children, durationInFrames}: {children: React.ReactNode; durationInFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const InfoCardOverlay = ({card, from, durationInFrames, isVertical}: {card: Phase3InfoCard; from: number; durationInFrames: number; isVertical: boolean}) => {
  const {fps} = useVideoConfig();
  const delay = Math.max(0, Math.round(((card.delayMs ?? 0) / 1000) * fps));
  const length = durationInFrames - delay;
  if (length < 8) return null;
  const position = card.position ?? (card.type === 'keyword' ? 'top' : 'center');
  const justifyContent = position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center';
  return (
    <Sequence from={from + delay} durationInFrames={length}>
      <FadeOut durationInFrames={length}>
        {position === 'center' ? <Dim /> : null}
        <AbsoluteFill style={{justifyContent, alignItems: 'center', padding: isVertical ? '180px 48px' : '70px 80px', pointerEvents: 'none'}}>
          <CardBody card={card} isVertical={isVertical} />
        </AbsoluteFill>
      </FadeOut>
    </Sequence>
  );
};
