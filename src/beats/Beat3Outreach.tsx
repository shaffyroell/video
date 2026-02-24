import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { OutreachStep } from '../components/OutreachStep';
import { outreachSteps } from '../data/signals';

interface Beat3OutreachProps {
  frame: number;
}

const ENTER_FRAME = 218;
const STEPS_START = 220;
const STEP_STAGGER = 20;
const ALL_DONE_FRAME = STEPS_START + outreachSteps.length * STEP_STAGGER + 20;

export const Beat3Outreach: React.FC<Beat3OutreachProps> = ({ frame }) => {
  const cardTranslateY = spring({
    frame: frame - ENTER_FRAME,
    fps: 30,
    config: motion.springConfig,
    from: 12,
    to: 0,
  });

  const cardOpacity = interpolate(frame, [ENTER_FRAME, ENTER_FRAME + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const counterOpacity = interpolate(frame, [ALL_DONE_FRAME, ALL_DONE_FRAME + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        padding: 28,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        opacity: cardOpacity,
        transform: `translateY(${cardTranslateY}px)`,
      }}
    >
      <div
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 24,
          width: '100%',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: font.sizes.label,
              fontWeight: font.weights.semibold,
              color: colors.textSecondary,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Outreach Sequence
          </div>
          <div style={{ fontSize: font.sizes.body, color: colors.textPrimary }}>
            Executing 4-step sequence for{' '}
            <strong>James Vance</strong>
          </div>
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 20 }} />

        {/* Outreach Steps */}
        {outreachSteps.map((step, i) => (
          <OutreachStep
            key={i}
            frame={frame}
            startFrame={STEPS_START + i * STEP_STAGGER}
            label={step.label}
            result={step.result}
            preview={step.preview}
          />
        ))}

        {/* Counter */}
        {frame >= ALL_DONE_FRAME && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 8,
              opacity: counterOpacity,
            }}
          >
            <div style={{ fontSize: font.sizes.label, color: colors.textSecondary }}>
              4 touchpoints · 0 replies · sequence active
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
