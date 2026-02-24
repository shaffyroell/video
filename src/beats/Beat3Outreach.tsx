import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { Spinner } from '../components/Spinner';
import { Checkmark } from '../components/Checkmark';

interface Beat3OutreachProps {
  frame: number;
  beatStartFrame: number;
}

const PERSONALIZED_EMAIL = "See you're working on remittance payment infrastructure in stealth, would love to connect and hear more about what you're building.";

const outreachSteps = [
  { icon: '👁️', label: 'LINKEDIN VIEW', result: 'Profile viewed' },
  { icon: '🤝', label: 'LINKEDIN CONNECT', result: 'Request sent with note' },
  { icon: '✉️', label: 'EMAIL SENT', result: 'Personalized outreach' },
];

export const Beat3Outreach: React.FC<Beat3OutreachProps> = ({ frame, beatStartFrame }) => {
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

  // Email typing - SLOWER, starts after steps, 2 frames per character
  const EMAIL_TYPE_START = 80;
  const emailChars = Math.floor(
    interpolate(localFrame, [EMAIL_TYPE_START, EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 2], [0, PERSONALIZED_EMAIL.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const emailDone = emailChars >= PERSONALIZED_EMAIL.length;
  const sentConfirmOpacity = interpolate(localFrame, [EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 2 + 10, EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 2 + 25], [0, 1], {
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
            Reaching out to <strong>James Vance</strong>
          </div>
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 24 }} />

        {/* Outreach Steps - SLOWER: 22 frames per step */}
        <div style={{ marginBottom: 20 }}>
          {outreachSteps.map((step, i) => {
            const stepStartFrame = beatStartFrame + 20 + i * 22;
            const isStarted = frame >= stepStartFrame;
            const isComplete = frame >= stepStartFrame + 18;

            if (!isStarted) return null;

            const rowOpacity = interpolate(frame, [stepStartFrame, stepStartFrame + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const checkOpacity = interpolate(frame, [stepStartFrame + 18, stepStartFrame + 24], [0, 1], {
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
                  {step.icon}
                </div>

                {/* Status */}
                <div style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isComplete ? (
                    <div style={{ opacity: checkOpacity }}>
                      <Checkmark size={18} />
                    </div>
                  ) : (
                    <Spinner frame={frame} size={18} />
                  )}
                </div>

                {/* Label */}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: font.sizes.small,
                      fontWeight: font.weights.semibold,
                      color: isComplete ? colors.textPrimary : colors.textSecondary,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {step.label}
                  </span>
                  {isComplete && (
                    <span
                      style={{
                        fontSize: font.sizes.small,
                        color: colors.textSecondary,
                        marginLeft: 10,
                        opacity: checkOpacity,
                      }}
                    >
                      — {step.result}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Email Preview - SLOWER Typewriter */}
        {localFrame >= EMAIL_TYPE_START && (
          <div
            style={{
              background: '#FAFAFA',
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: 16,
              marginTop: 8,
            }}
          >
            <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginBottom: 10 }}>
              📧 Email Preview
            </div>
            <div
              style={{
                fontSize: font.sizes.body,
                color: colors.textPrimary,
                lineHeight: 1.7,
              }}
            >
              <span style={{ fontStyle: 'italic' }}>
                "{PERSONALIZED_EMAIL.slice(0, emailChars)}
              </span>
              {!emailDone && <span style={{ opacity: 0.5, fontWeight: 'bold' }}>|</span>}
              {emailDone && <span style={{ fontStyle: 'italic' }}>"</span>}
            </div>

            {/* Sent confirmation */}
            {emailDone && (
              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: sentConfirmOpacity,
                  padding: '8px 12px',
                  background: '#F0FDF4',
                  borderRadius: 6,
                }}
              >
                <span style={{ color: colors.green, fontSize: font.sizes.body, fontWeight: font.weights.semibold }}>
                  ✓ Sent
                </span>
                <span style={{ color: colors.textSecondary, fontSize: font.sizes.small }}>
                  · Follow-up queued in 4 days
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
