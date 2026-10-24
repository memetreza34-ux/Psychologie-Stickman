import {AbsoluteFill, Img, staticFile} from 'remotion';

// WORKFLOW_V2: Das gewählte Flow-Thumbnail ist textfrei; die Überschrift wird hier gestochen scharf gesetzt.
export type ThumbnailTextProps = {
  image: string;
  headline: string;
  position?: 'left' | 'right' | 'top';
  accentWord?: string;
};

const FONT = '"Arial Rounded MT Bold", "Nunito", "Helvetica Neue", Arial, sans-serif';

export const ThumbnailText = ({image, headline, position = 'left', accentWord}: ThumbnailTextProps) => {
  const words = headline.trim().split(/\s+/u);
  const isTop = position === 'top';
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {image ? <Img src={staticFile(image)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : null}
      <AbsoluteFill
        style={{
          justifyContent: isTop ? 'flex-start' : 'center',
          alignItems: position === 'right' ? 'flex-end' : position === 'left' ? 'flex-start' : 'center',
          padding: '70px 80px',
        }}
      >
        <div
          style={{
            maxWidth: isTop ? '90%' : '46%',
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: isTop ? 120 : 132,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            textAlign: position === 'right' ? 'right' : position === 'left' ? 'left' : 'center',
            color: '#fff',
            WebkitTextStroke: '14px #1f2328',
            paintOrder: 'stroke fill',
            textShadow: '0 10px 0 #1f2328',
          }}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} style={{color: accentWord && word.toLowerCase().startsWith(accentWord.toLowerCase()) ? '#ffd23f' : '#fff'}}>
              {word}{index < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
