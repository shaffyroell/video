import React from 'react';
import { interpolate } from 'remotion';
import { colors, font } from '../tokens';

interface Beat1SignalsProps {
  frame: number;
}

export const Beat1Signals: React.FC<Beat1SignalsProps> = ({ frame }) => {
  const opacity = interpolate(frame, [15, 23], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        opacity,
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 28,
            marginBottom: 12,
          }}
        >
          📡
        </div>
        <div
          style={{
            fontSize: font.sizes.body,
            color: colors.textSecondary,
          }}
        >
          Monitoring 847 signals across 12 sources
        </div>
      </div>
    </div>
  );
};
