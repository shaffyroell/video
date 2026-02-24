import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { Spinner } from '../components/Spinner';
import { Checkmark } from '../components/Checkmark';

interface Beat2ResearchProps {
  frame: number;
  beatStartFrame: number;
}

// Research sources with icons
const researchSources = [
  { icon: '🔗', label: 'LINKEDIN', result: '14 yrs experience · 2 exits' },
  { icon: '🌐', label: 'WEBSITE', result: 'New domain registered 6 weeks ago' },
  { icon: '⭐', label: 'TRUSTPILOT', result: 'Previous company rated 4.8/5' },
  { icon: '📰', label: 'NEWS', result: 'Last press mention 4 months ago' },
];

const aiSummary = 'Ex-founder, 2 exits. LinkedIn went dark 3 weeks ago — consistent with early venture formation. New domain registered. High signal-to-noise ratio.';

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

        {/* Research Sources with Icons */}
        <div style={{ marginBottom: 20 }}>
          {researchSources.map((source, i) => {
            const stepStartFrame = beatStartFrame + 30 + i * 14;
            const isStarted = frame >= stepStartFrame;
            const isComplete = frame >= stepStartFrame + 14;

            if (!isStarted) return null;

            const rowOpacity = interpolate(frame, [stepStartFrame, stepStartFrame + 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const checkOpacity = interpolate(frame, [stepStartFrame + 14, stepStartFrame + 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                  opacity: rowOpacity,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {source.icon}
                </div>

                {/* Status indicator */}
                <div style={{ opacity: isComplete ? checkOpacity : 1, flexShrink: 0 }}>
                  {isComplete ? <Checkmark size={16} /> : <Spinner frame={frame} size={16} />}
                </div>

                {/* Label and result */}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: font.sizes.label,
                      fontWeight: font.weights.semibold,
                      color: colors.textSecondary,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {source.label}
                  </span>
                  {isComplete && (
                    <span
                      style={{
                        fontSize: font.sizes.small,
                        color: colors.textPrimary,
                        marginLeft: 10,
                        opacity: checkOpacity,
                      }}
                    >
                      — {source.result}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
