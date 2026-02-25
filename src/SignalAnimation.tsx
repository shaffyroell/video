import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { z } from 'zod';
import { colors, font } from './tokens';
import { signals } from './data/signals';
import { LiveDot } from './components/LiveDot';
import { Beat2Research } from './beats/Beat2Research';
import { Beat3Outreach } from './beats/Beat3Outreach';
import { Beat4CRM } from './beats/Beat4CRM';
import { Beat5Memo } from './beats/Beat5Memo';

export const signalAnimationSchema = z.object({
  backgroundColor: z.string().default('#F5F5F5'),
});

// ── Frame boundaries ──────────────────────────────────────────────────────────
const INTRO_END   = 75;   // Intro title (2.5s)

// Beat 1 callout text (shown briefly before highlighting kicks in)
const TEXT_IN_START  = INTRO_END + 8;   // 83  — slides in from right
const TEXT_OUT_START = INTRO_END + 78;  // 153 — starts sliding out (+1s hold)
const TEXT_OUT_END   = INTRO_END + 98;  // 173 — fully gone

// Beat 1 highlight cycle: 45 frames (1.5s) per card, all 9 shown exactly once
const HIGHLIGHT_START    = INTRO_END + 103; // 178
const HIGHLIGHT_INTERVAL = 45;              // frames per card
const HIGHLIGHT_FADE     = 10;              // smooth fade-in/out frames

// Beat end-frames derived from highlight timing so all 9 cards are always shown
const BEAT_1_END = HIGHLIGHT_START + signals.length * HIGHLIGHT_INTERVAL; // 553
const BEAT_2_END = BEAT_1_END + 180;   // Desk Research ~6s  → 733
const BEAT_3_END = BEAT_2_END + 160;   // Outreach ~5.3s     → 893
const BEAT_4_END = BEAT_3_END + 120;   // CRM ~4s            → 1013
// Beat 5: 1013–1133  Memo ~4s

// ── Header typing animation ───────────────────────────────────────────────────
const STEPS = ['Signals', 'Desk Research', 'Outreach', 'Update CRM', 'Memo Sent'];

const WORDS          = ['clients', 'angels/LPs', 'new investments', 'candidates'];
const FRAMES_PER_CYCLE = 90;
const TYPE_SPEED     = 2;
const DELETE_SPEED   = 1;
const HOLD_FRAMES    = 45;

function getTypedWord(frame: number): string {
  const totalCycles = FRAMES_PER_CYCLE * WORDS.length;
  const cycleFrame  = frame % totalCycles;
  const wordIndex   = Math.floor(cycleFrame / FRAMES_PER_CYCLE);
  const wordFrame   = cycleFrame % FRAMES_PER_CYCLE;
  const word        = WORDS[wordIndex];
  const typeFrames  = word.length * TYPE_SPEED;
  const deleteFrames = word.length * DELETE_SPEED;

  if (wordFrame < typeFrames) return word.slice(0, Math.floor(wordFrame / TYPE_SPEED));
  if (wordFrame < typeFrames + HOLD_FRAMES) return word;
  if (wordFrame < typeFrames + HOLD_FRAMES + deleteFrames) {
    const del = wordFrame - typeFrames - HOLD_FRAMES;
    return word.slice(0, Math.max(0, word.length - Math.floor(del / DELETE_SPEED)));
  }
  return '';
}

function getCurrentStep(frame: number): number {
  if (frame < BEAT_1_END) return 0;
  if (frame < BEAT_2_END) return 1;
  if (frame < BEAT_3_END) return 2;
  if (frame < BEAT_4_END) return 3;
  return 4;
}

/** Returns 0–1 smooth highlight level for a given card at the current frame */
function getCardHighlight(cardIndex: number, frame: number): number {
  if (frame < HIGHLIGHT_START) return 0;
  const hFrame      = frame - HIGHLIGHT_START;
  const cycleLength = HIGHLIGHT_INTERVAL * signals.length;
  const cycleFrame  = hFrame % cycleLength;
  const cardStart   = cardIndex * HIGHLIGHT_INTERVAL;
  const within      = cycleFrame - cardStart;
  if (within < 0 || within >= HIGHLIGHT_INTERVAL) return 0;
  if (within < HIGHLIGHT_FADE) return within / HIGHLIGHT_FADE;
  if (within > HIGHLIGHT_INTERVAL - HIGHLIGHT_FADE)
    return (HIGHLIGHT_INTERVAL - within) / HIGHLIGHT_FADE;
  return 1;
}

export const SignalAnimation: React.FC<z.infer<typeof signalAnimationSchema>> = ({ backgroundColor }) => {
  const frame       = useCurrentFrame();
  const typedWord   = getTypedWord(frame);
  const currentStep = getCurrentStep(frame);

  const beat = frame < INTRO_END
    ? 0
    : frame < BEAT_1_END
    ? 1
    : frame < BEAT_2_END
    ? 2
    : frame < BEAT_3_END
    ? 3
    : frame < BEAT_4_END
    ? 4
    : 5;

  const HEADER_HEIGHT = 62;

  // Intro overlay: fades in → holds → fades out
  const introOpacity = interpolate(frame, [0, 10, 55, INTRO_END], [0, 1, 1, 0], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 1 cards start fading in before the overlay fully disappears so there
  // is never a blank frame — no pop, no jump.
  const beat1Opacity = interpolate(frame, [INTRO_END - 15, INTRO_END + 12], [0, 1], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
  });

  // "Find your targets" callout text slide
  const textSlideIn  = interpolate(frame, [TEXT_IN_START, TEXT_IN_START + 18], [280, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const textSlideOut = interpolate(frame, [TEXT_OUT_START, TEXT_OUT_END], [0, 320], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const textX          = frame < TEXT_OUT_START ? textSlideIn : textSlideOut;
  const showCalloutText = frame >= TEXT_IN_START && frame < TEXT_OUT_END;

  return (
    <AbsoluteFill style={{ background: backgroundColor || colors.background, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header (always visible) ─────────────────────────────────────────── */}
      <div
        style={{
          height: HEADER_HEIGHT,
          background: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Typing text — left-anchored, never collides with tabs */}
        <div style={{ position: 'absolute', left: 24, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
            Systems to find
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: font.weights.bold,
              color: colors.blue,
              width: 200,
              display: 'inline-block',
              marginLeft: 7,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {typedWord}
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 20,
                background: colors.blue,
                marginLeft: 2,
                verticalAlign: 'middle',
                opacity: Math.round(frame / 15) % 2 === 0 ? 1 : 0,
              }}
            />
          </span>
        </div>

        {/* Step tabs — right-anchored */}
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isPast   = i < currentStep;
            return (
              <React.Fragment key={step}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: isActive ? font.weights.semibold : font.weights.regular,
                    color: isActive ? colors.blue : isPast ? colors.green : colors.textSecondary,
                    padding: '4px 11px',
                    borderRadius: 10,
                    background: isActive ? '#EBF5FF' : isPast ? '#ECFDF5' : 'transparent',
                    border: isActive
                      ? `1px solid ${colors.blue}`
                      : isPast
                      ? `1px solid ${colors.green}`
                      : `1px solid ${colors.border}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isPast ? '✓ ' : ''}{step}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 10, height: 1, background: colors.border, flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Main content area ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

        {/* Beat 1: Signals */}
        {(beat === 0 || beat === 1) && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              opacity: beat1Opacity,
            }}
          >
            {/* Left: signal cards */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 24px 14px 40px',
                overflowY: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                  alignSelf: 'flex-start',
                  paddingLeft: 4,
                }}
              >
                <span style={{
                  fontSize: font.sizes.label,
                  fontWeight: font.weights.semibold,
                  color: colors.textSecondary,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Live Signals
                </span>
                <LiveDot frame={frame} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', maxWidth: 560 }}>
                {signals.map((signal, i) => {
                  const hl       = getCardHighlight(i, frame);
                  const isActive = hl > 0.05;

                  // Smoothly interpolate card bg: white → very-light-blue
                  const bgR = Math.round(255 + (240 - 255) * hl);
                  const bgG = Math.round(255 + (244 - 255) * hl);
                  const bgB = 255;
                  const cardBg = `rgb(${bgR},${bgG},${bgB})`;

                  // Card opacity: 0.8 before cycling, dims to 0.45 when another is active
                  const cardOpacity = frame < HIGHLIGHT_START
                    ? 0.8
                    : interpolate(hl, [0, 1], [0.45, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                  // Left accent border: 1px grey → 3px blue
                  const accentW  = interpolate(hl, [0, 1], [1, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                  const accentR2 = Math.round(232 + (37  - 232) * hl);
                  const accentG2 = Math.round(232 + (99  - 232) * hl);
                  const accentB2 = Math.round(232 + (235 - 232) * hl);
                  const accentColor = `rgb(${accentR2},${accentG2},${accentB2})`;

                  // "So what" colour: grey → blue as hl increases
                  const swR = Math.round(153 + (37  - 153) * hl);
                  const swG = Math.round(153 + (99  - 153) * hl);
                  const swB = Math.round(153 + (235 - 153) * hl);
                  const soWhatColor  = `rgb(${swR},${swG},${swB})`;
                  const soWhatWeight = isActive ? font.weights.semibold : font.weights.regular;

                  return (
                    <div
                      key={i}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        borderLeft: `${accentW}px solid ${accentColor}`,
                        background: cardBg,
                        opacity: cardOpacity,
                        position: 'relative',
                      }}
                    >
                      {/* Signal fact */}
                      <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.4 }}>
                        {signal.emoji} <strong>{signal.company}</strong>
                        {signal.text ? ` — ${signal.text}` : ''}
                      </div>

                      {/* "So what" — body size, turns blue+bold when highlighted */}
                      {signal.sub && (
                        <div style={{
                          fontSize: font.sizes.body,
                          color: soWhatColor,
                          fontWeight: soWhatWeight,
                          marginTop: 3,
                          lineHeight: 1.3,
                        }}>
                          → {signal.sub}
                        </div>
                      )}

                      {/* Fit score on James Vance card */}
                      {isActive && i === 7 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            fontSize: font.sizes.label,
                            fontWeight: font.weights.bold,
                            color: colors.orange,
                            background: '#FFF7ED',
                            border: `1px solid ${colors.orange}`,
                            borderRadius: 4,
                            padding: '2px 6px',
                            opacity: hl,
                          }}
                        >
                          96
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: "Find your targets faster" callout */}
            {showCalloutText && (
              <div
                style={{
                  width: 300,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 40,
                  transform: `translateX(${textX}px)`,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: font.weights.bold,
                    color: colors.textPrimary,
                    lineHeight: 1.4,
                    textAlign: 'center',
                  }}
                >
                  Find your targets faster by acting on signals
                </div>
              </div>
            )}
          </div>
        )}

        {beat === 2 && <Beat2Research frame={frame} beatStartFrame={BEAT_1_END} />}
        {beat === 3 && <Beat3Outreach frame={frame} beatStartFrame={BEAT_2_END} />}
        {beat === 4 && <Beat4CRM     frame={frame} beatStartFrame={BEAT_3_END} />}
        {beat === 5 && <Beat5Memo    frame={frame} beatStartFrame={BEAT_4_END} />}
      </div>

      {/* ── Intro overlay ────────────────────────────────────────────────────── */}
      {frame < INTRO_END + 5 && (
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: '#0D1117',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: introOpacity,
            zIndex: 20,
          }}
        >
          <div style={{ textAlign: 'center', padding: '0 60px' }}>
            <div style={{
              fontSize: 42,
              fontWeight: font.weights.bold,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: 6,
            }}>
              Drive Results With
            </div>
            <div style={{
              fontSize: 42,
              fontWeight: font.weights.bold,
              color: colors.blue,
              lineHeight: 1.25,
            }}>
              TechTower's AI Engine
            </div>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
