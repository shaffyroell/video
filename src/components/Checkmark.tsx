import React from 'react';
import { colors } from '../tokens';

interface CheckmarkProps {
  size?: number;
}

export const Checkmark: React.FC<CheckmarkProps> = ({ size = 16 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colors.green,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: size * 0.6,
        fontWeight: 700,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      ✓
    </div>
  );
};
