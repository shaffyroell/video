import React from 'react';
import { colors } from '../tokens';

interface SpinnerProps {
  frame: number;
  size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ frame, size = 16 }) => {
  const rotation = (frame * 8) % 360;
  const r = (size - 3) / 2;
  const circumference = 2 * Math.PI * r;
  const dashLength = circumference * 0.5;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)`, display: 'block', flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colors.blue}
        strokeWidth={3}
        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
        strokeLinecap="round"
      />
    </svg>
  );
};
