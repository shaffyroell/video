import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { memoSections } from '../data/signals';

interface Beat5MemoProps {
  frame: number;
  beatStartFrame: number;
}

const TALKING_POINTS_TEXT = memoSections[3].text;

export const Beat5Memo: React.FC<Beat5MemoProps> = ({ frame, beatStartFrame }) => {
  const localFrame = frame - beatStartFrame;

  const cardOpacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardTranslateY = spring({
    frame: localFrame,
    fps: 30,
    config: motion.springConfig,
    from: 20,
    to: 0,
  });

  const confirmOpacity = interpolate(localFrame, [45, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        opacity: cardOpacity,
        transform: `translateY(${cardTranslateY}px)`,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: `1px solid #E5E5E5`,
          borderRadius: 12,
          padding: 32,
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            Briefing Note Generated
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
              James Vance
            </div>
            <div style={{ fontSize: font.sizes.small, color: colors.textSecondary }}>
              {today}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 20 }} />

        {/* Sections */}
        {memoSections.slice(0, 3).map((section, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: font.sizes.label, fontWeight: font.weights.semibold, color: colors.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {section.label}
            </div>
            <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
              {section.text}
            </div>
          </div>
        ))}

        {/* Talking Points */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: font.sizes.label, fontWeight: font.weights.semibold, color: colors.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            {memoSections[3].label}
          </div>
          <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
            {TALKING_POINTS_TEXT}
          </div>
        </div>

        {/* Confirmation */}
        {localFrame >= 30 && (
          <div
            style={{
              marginTop: 20,
              padding: '12px 16px',
              background: '#F0FDF4',
              borderRadius: 8,
              border: `1px solid ${colors.green}`,
              opacity: confirmOpacity,
            }}
          >
            <span style={{ color: colors.green, fontWeight: font.weights.medium, fontSize: font.sizes.body }}>
              ✓ Memo sent to shaffy@techtower.ai
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
