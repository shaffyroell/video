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

  // Email typing starts after outreach steps complete
  const EMAIL_TYPE_START = 70;
  const emailChars = Math.floor(
    interpolate(localFrame, [EMAIL_TYPE_START, EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 1.2], [0, PERSONALIZED_EMAIL.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const emailDone = emailChars >= PERSONALIZED_EMAIL.length;
  const sentConfirmOpacity = interpolate(localFrame, [EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 1.2 + 5, EMAIL_TYPE_START + PERSONALIZED_EMAIL.length * 1.2 + 15], [0, 1], {
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

        {/* Outreach Steps */}
        <div style={{ marginBottom: 20 }}>
          {outreachSteps.map((step, i) => {
            const stepStartFrame = beatStartFrame + 15 + i * 16;
            const isStarted = frame >= stepStartFrame;
            const isComplete = frame >= stepStartFrame + 12;

            if (!isStarted) return null;

            const rowOpacity = interpolate(frame, [stepStartFrame, stepStartFrame + 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const checkOpacity = interpolate(frame, [stepStartFrame + 12, stepStartFrame + 18], [0, 1], {
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
                  {step.icon}
                </div>

                {/* Status */}
                <div style={{ opacity: isComplete ? checkOpacity : 1, flexShrink: 0 }}>
                  {isComplete ? <Checkmark size={16} /> : <Spinner frame={frame} size={16} />}
                </div>

                {/* Label */}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: font.sizes.label,
                      fontWeight: font.weights.semibold,
                      color: colors.textSecondary,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {step.label}
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
                      — {step.result}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Email Preview - Typewriter */}
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
            <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginBottom: 8 }}>
              📧 Email Preview
            </div>
            <div
              style={{
                fontSize: font.sizes.body,
                color: colors.textPrimary,
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              "{PERSONALIZED_EMAIL.slice(0, emailChars)}
              {!emailDone && <span style={{ opacity: 0.5 }}>|</span>}
              {emailDone && '"'}
            </div>

            {/* Sent confirmation */}
            {emailDone && (
              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  opacity: sentConfirmOpacity,
                }}
              >
                <span style={{ color: colors.green, fontSize: font.sizes.small, fontWeight: font.weights.medium }}>
                  ✓ Sent
                </span>
                <span style={{ color: colors.textSecondary, fontSize: font.sizes.small }}>
                  · Queued follow-up in 4 days
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
