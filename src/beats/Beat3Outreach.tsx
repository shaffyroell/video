import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { OutreachStep } from '../components/OutreachStep';
import { outreachSteps } from '../data/signals';

interface Beat3OutreachProps {
  frame: number;
  beatStartFrame: number;
}

export const Beat3Outreach: React.FC<Beat3OutreachProps> = ({ frame, beatStartFrame }) => {
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

  const allStepsDone = localFrame >= 80;
  const counterOpacity = interpolate(localFrame, [80, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 32,
          width: '100%',
          maxWidth: 700,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            Outreach Sequence
          </div>
          <div style={{ fontSize: 18, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
            Executing 4-step sequence for <strong>James Vance</strong>
          </div>
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 24 }} />

        {/* Outreach Steps */}
        {outreachSteps.map((step, i) => (
          <OutreachStep
            key={i}
            frame={frame}
            startFrame={beatStartFrame + 15 + i * 18}
            label={step.label}
            result={step.result}
            preview={step.preview}
          />
        ))}

        {/* Counter */}
        {allStepsDone && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 12,
              opacity: counterOpacity,
            }}
          >
            <div
              style={{
                fontSize: font.sizes.small,
                color: colors.textSecondary,
                background: '#F9FAFB',
                padding: '6px 12px',
                borderRadius: 6,
                border: `1px solid ${colors.border}`,
              }}
            >
              4 touchpoints · 0 replies · sequence active
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
