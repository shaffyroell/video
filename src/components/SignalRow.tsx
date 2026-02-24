import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';

interface SignalRowProps {
  frame: number;
  emoji: string;
  company: string;
  text: string;
  sub: string;
  index: number;
  isHighlighted?: boolean;
}

export const SignalRow: React.FC<SignalRowProps> = ({
  frame,
  emoji,
  company,
  text,
  sub,
  index,
  isHighlighted = false,
}) => {
  const startFrame = index * 10;

  const translateY = spring({
    frame: frame - startFrame,
    fps: 30,
    config: motion.springConfig,
    from: 6,
    to: 0,
  });

  const opacity = interpolate(frame, [startFrame, startFrame + motion.fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: 6,
        border: `1px solid ${colors.border}`,
        borderLeft: isHighlighted ? `2px solid ${colors.blue}` : `1px solid ${colors.border}`,
        background: isHighlighted ? '#F0F4FF' : colors.card,
        marginBottom: 8,
        opacity,
        transform: `translateY(${translateY}px)`,
        position: 'relative',
      }}
    >
      <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.4 }}>
        {emoji} <strong>{company}</strong>
        {text ? ` — ${text}` : ''}
      </div>
      {sub ? (
        <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginTop: 2 }}>
          {sub}
        </div>
      ) : null}
      {isHighlighted && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: font.sizes.label,
            fontWeight: font.weights.bold,
            color: colors.orange,
            background: '#FFF7ED',
            border: `1px solid ${colors.orange}`,
            borderRadius: 4,
            padding: '1px 5px',
          }}
        >
          96
        </div>
      )}
    </div>
  );
};
