import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { ResearchStep } from '../components/ResearchStep';
import { researchSteps, aiSummary } from '../data/signals';

interface Beat2ResearchProps {
  frame: number;
  beatStartFrame: number;
}

export const Beat2Research: React.FC<Beat2ResearchProps> = ({ frame, beatStartFrame }) => {
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

  const scoreValue = Math.round(
    interpolate(localFrame, [15, 40], [0, 96], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const summaryStart = 80;
  const summaryChars = Math.floor(
    interpolate(localFrame, [summaryStart, summaryStart + aiSummary.length * 1.5], [0, aiSummary.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Desk Research
            </div>
            <div style={{ fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
              James Vance
            </div>
            <div
              style={{
                fontSize: font.sizes.small,
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                padding: '3px 10px',
                display: 'inline-block',
                color: colors.textSecondary,
                marginTop: 6,
              }}
            >
              ex-Founder · Stealth Mode
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: font.weights.bold,
                color: colors.orange,
                lineHeight: 1,
              }}
            >
              {scoreValue}
            </div>
            <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginTop: 4 }}>
              FIT SCORE
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, marginBottom: 24 }} />

        {/* Research Steps */}
        <div style={{ marginBottom: 20 }}>
          {researchSteps.map((step, i) => (
            <ResearchStep
              key={i}
              frame={frame}
              startFrame={beatStartFrame + 30 + i * 14}
              label={step.label}
              result={step.result}
            />
          ))}
        </div>

        {/* AI Summary */}
        {localFrame >= summaryStart && (
          <div
            style={{
              fontSize: font.sizes.body,
              fontStyle: 'italic',
              color: colors.textSecondary,
              lineHeight: 1.6,
              borderTop: `1px solid ${colors.border}`,
              paddingTop: 16,
              marginTop: 8,
            }}
          >
            {aiSummary.slice(0, summaryChars)}
            <span style={{ opacity: 0.5 }}>|</span>
          </div>
        )}
      </div>
    </div>
  );
};
