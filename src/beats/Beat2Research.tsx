import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { Spinner } from '../components/Spinner';
import { Checkmark } from '../components/Checkmark';

interface Beat2ResearchProps {
  frame: number;
  beatStartFrame: number;
}

// Research sources with icons - SLOWER timing
const researchSources = [
  { icon: '🔗', label: 'LINKEDIN', result: '14 yrs experience · 2 exits' },
  { icon: '🌐', label: 'WEBSITE', result: 'New domain registered 6 weeks ago' },
  { icon: '⭐', label: 'TRUSTPILOT', result: 'Previous company rated 4.8/5' },
  { icon: '📰', label: 'NEWS', result: 'Last press mention 4 months ago' },
];

const aiSummary = 'Ex-founder, 2 exits. LinkedIn went dark 3 weeks ago — consistent with early venture formation. New domain registered. High signal-to-noise ratio.';

export const Beat2Research: React.FC<Beat2ResearchProps> = ({ frame, beatStartFrame }) => {
  const localFrame = frame - beatStartFrame;

  const cardOpacity = interpolate(localFrame, [0, 15], [0, 1], {
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
    interpolate(localFrame, [20, 60], [0, 96], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // AI summary starts after all research steps complete
  const summaryStart = 130;
  const summaryChars = Math.floor(
    interpolate(localFrame, [summaryStart, summaryStart + aiSummary.length * 2], [0, aiSummary.length], {
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

        {/* Research Sources - SLOWER: 28 frames per step, 24 frames spinning */}
        <div style={{ marginBottom: 20 }}>
          {researchSources.map((source, i) => {
            const stepStartFrame = beatStartFrame + 25 + i * 28;
            const isStarted = frame >= stepStartFrame;
            const isComplete = frame >= stepStartFrame + 24; // Longer spin time

            if (!isStarted) return null;

            const rowOpacity = interpolate(frame, [stepStartFrame, stepStartFrame + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const checkOpacity = interpolate(frame, [stepStartFrame + 24, stepStartFrame + 32], [0, 1], {
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
                  marginBottom: 14,
                  opacity: rowOpacity,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: !isComplete ? '#FAFAFA' : 'transparent',
                  border: !isComplete ? `1px solid ${colors.border}` : '1px solid transparent',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: isComplete ? '#ECFDF5' : '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {source.icon}
                </div>

                {/* Status indicator - larger spinner */}
                <div style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isComplete ? (
                    <div style={{ opacity: checkOpacity }}>
                      <Checkmark size={18} />
                    </div>
                  ) : (
                    <Spinner frame={frame} size={18} />
                  )}
                </div>

                {/* Label and result */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: font.sizes.small,
                        fontWeight: font.weights.semibold,
                        color: isComplete ? colors.textPrimary : colors.textSecondary,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {source.label}
                    </span>
                    {!isComplete && (
                      <span style={{ fontSize: font.sizes.label, color: colors.textSecondary }}>
                        Analyzing...
                      </span>
                    )}
                  </div>
                  {isComplete && (
                    <div
                      style={{
                        fontSize: font.sizes.small,
                        color: colors.textSecondary,
                        marginTop: 2,
                        opacity: checkOpacity,
                      }}
                    >
                      {source.result}
                    </div>
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
