import React from 'react';
import { interpolate } from 'remotion';
import { colors, font } from '../tokens';
import { Spinner } from './Spinner';
import { Checkmark } from './Checkmark';

interface ResearchStepProps {
  frame: number;
  startFrame: number;
  label: string;
  result: string;
}

export const ResearchStep: React.FC<ResearchStepProps> = ({ frame, startFrame, label, result }) => {
  if (frame < startFrame) return null;

  const isComplete = frame >= startFrame + 14;

  const rowOpacity = interpolate(frame, [startFrame, startFrame + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkmarkOpacity = interpolate(frame, [startFrame + 14, startFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
        opacity: rowOpacity,
      }}
    >
      <div style={{ opacity: isComplete ? checkmarkOpacity : 1 }}>
        {isComplete ? <Checkmark size={16} /> : <Spinner frame={frame} size={16} />}
      </div>
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontSize: font.sizes.label,
            fontWeight: font.weights.semibold,
            color: colors.textSecondary,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
        {isComplete && (
          <span
            style={{
              fontSize: font.sizes.small,
              color: colors.textPrimary,
              marginLeft: 8,
              opacity: checkmarkOpacity,
            }}
          >
            — {result}
          </span>
        )}
      </div>
    </div>
  );
};
