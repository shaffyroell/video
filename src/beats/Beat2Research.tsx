import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { ResearchStep } from '../components/ResearchStep';
import { researchSteps, aiSummary } from '../data/signals';

interface Beat2ResearchProps {
  frame: number;
}

const ENTER_FRAME = 98;

export const Beat2Research: React.FC<Beat2ResearchProps> = ({ frame }) => {
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

  const scoreValue = Math.round(
    interpolate(frame, [110, 130], [0, 96], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const summaryEnd = 202 + aiSummary.length * 2;
  const summaryChars = Math.floor(
    interpolate(frame, [202, summaryEnd], [0, aiSummary.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: font.sizes.name, fontWeight: font.weights.bold, color: colors.textPrimary }}>
              James Vance
            </div>
            <div
              style={{
                fontSize: font.sizes.label,
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                padding: '2px 8px',
                display: 'inline-block',
                color: colors.textSecondary,
                marginTop: 4,
              }}
            >
              ex-Founder · Stealth Mode
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: font.weights.bold,
                color: colors.orange,
                lineHeight: 1,
              }}
            >
              {scoreValue}
            </div>
            <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginTop: 2 }}>
              FIT SCORE
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, marginBottom: 18 }} />

        {/* Research Steps */}
        <div style={{ marginBottom: 16 }}>
          {researchSteps.map((step, i) => (
            <ResearchStep
              key={i}
              frame={frame}
              startFrame={130 + i * 18}
              label={step.label}
              result={step.result}
            />
          ))}
        </div>

        {/* AI Summary */}
        {frame >= 202 && (
          <div
            style={{
              fontSize: font.sizes.small,
              fontStyle: 'italic',
              color: colors.textSecondary,
              lineHeight: 1.5,
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 12,
              marginTop: 4,
            }}
          >
            {aiSummary.slice(0, summaryChars)}
            <span style={{ opacity: 0.4 }}>|</span>
          </div>
        )}
      </div>
    </div>
  );
};
