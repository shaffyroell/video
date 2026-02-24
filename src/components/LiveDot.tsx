import React from 'react';
import { colors } from '../tokens';

interface LiveDotProps {
  frame: number;
}

export const LiveDot: React.FC<LiveDotProps> = ({ frame }) => {
  const opacity = 0.4 + 0.6 * Math.abs(Math.sin(frame / 15));
  return (
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: colors.green,
        opacity,
        flexShrink: 0,
      }}
    />
  );
};
