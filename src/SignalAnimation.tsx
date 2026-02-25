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

// Frame boundaries
const INTRO_END   = 75;    // Intro title (2.5s)
const BEAT_1_END  = 315;   // Signals (8s)
const BEAT_2_END  = 495;   // Desk Research (6s)
const BEAT_3_END  = 655;   // Outreach (5.3s)
const BEAT_4_END  = 775;   // CRM (4s)
// Beat 5: 775-895          // Memo (4s)

// Beat 1 sub-timings (local from INTRO_END)
const CARDS_APPEAR   = INTRO_END;          // All cards visible immediately
const TEXT_IN_START  = INTRO_END + 8;      // "Find your targets" slides in
const TEXT_OUT_START = INTRO_END + 90;     // Text starts sliding out
const TEXT_OUT_END   = INTRO_END + 115;    // Text fully gone
const HIGHLIGHT_START = INTRO_END + 120;   // Highlighting begins

const HIGHLIGHT_INTERVAL = 26; // frames per card (0.87s each)
const HIGHLIGHT_FADE = 7;      // smooth fade frames at each edge

const STEPS = ['Signals', 'Desk Research', 'Outreach', 'Update CRM', 'Memo Sent'];

const WORDS = ['clients', 'angels/LPs', 'new investments', 'candidates'];
const FRAMES_PER_CYCLE = 90;
const TYPE_SPEED = 2;
const DELETE_SPEED = 1;
const HOLD_FRAMES = 45;

function getTypedWord(frame: number): string {
  const totalCycles = FRAMES_PER_CYCLE * WORDS.length;
  const cycleFrame = frame % totalCycles;
  const wordIndex = Math.floor(cycleFrame / FRAMES_PER_CYCLE);
  const wordFrame = cycleFrame % FRAMES_PER_CYCLE;
  const word = WORDS[wordIndex];
  const typeFrames = word.length * TYPE_SPEED;
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

/** Returns 0-1 smooth highlight level for a given card index at the current frame */
function getCardHighlight(cardIndex: number, frame: number): number {
  if (frame < HIGHLIGHT_START) return 0;
  const hFrame = frame - HIGHLIGHT_START;
  const cycleLength = HIGHLIGHT_INTERVAL * signals.length;
  const cycleFrame = hFrame % cycleLength;
  const cardStart = cardIndex * HIGHLIGHT_INTERVAL;
  const within = cycleFrame - cardStart;
  if (within < 0 || within >= HIGHLIGHT_INTERVAL) return 0;
  // Fade in
  if (within < HIGHLIGHT_FADE) return within / HIGHLIGHT_FADE;
  // Fade out
  if (within > HIGHLIGHT_INTERVAL - HIGHLIGHT_FADE) return (HIGHLIGHT_INTERVAL - within) / HIGHLIGHT_FADE;
  return 1;
}

export const SignalAnimation: React.FC<z.infer<typeof signalAnimationSchema>> = ({ backgroundColor }) => {
  const frame = useCurrentFrame();
  const typedWord = getTypedWord(frame);
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

  // Intro overlay opacity
  const introOpacity = interpolate(frame, [0, 10, 55, INTRO_END], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Find your targets" text slide animation
  const textSlideIn = interpolate(frame, [TEXT_IN_START, TEXT_IN_START + 18], [280, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textSlideOut = interpolate(frame, [TEXT_OUT_START, TEXT_OUT_END], [0, 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textX = frame < TEXT_OUT_START ? textSlideIn : textSlideOut;
  const showCalloutText = frame >= TEXT_IN_START && frame < TEXT_OUT_END;

  return (
    <AbsoluteFill style={{ background: backgroundColor || colors.background, fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header (always visible) ── */}
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
        {/* Typing text — anchored left so it never overlaps tabs */}
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

        {/* Step tabs — anchored right, slightly bigger */}
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
            const isPast = i < currentStep;
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

      {/* ── Main content area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

        {/* Beat 1: Signals */}
        {(beat === 0 || beat === 1) && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              opacity: beat === 0 ? 0 : 1,
            }}
          >
            {/* Left: signal cards column */}
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
                <span style={{ fontSize: font.sizes.label, fontWeight: font.weights.semibold, color: colors.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Live Signals
                </span>
                <LiveDot frame={frame} />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                  width: '100%',
                  maxWidth: 560,
                }}
              >
                {signals.map((signal, i) => {
                  const hl = getCardHighlight(i, frame);
                  // Before highlighting starts, all cards dimly visible; when cycling, non-active are dimmer
                  const isActive = hl > 0.1;
                  const baseBg = isActive ? '#F0F4FF' : colors.card;
                  const baseBorder = isActive ? colors.blue : colors.border;
                  const baseOpacity = frame < HIGHLIGHT_START
                    ? 0.75
                    : interpolate(hl, [0, 1], [0.5, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                  return (
                    <div
                      key={i}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: `1px solid ${baseBorder}`,
                        borderLeft: isActive ? `3px solid ${colors.blue}` : `1px solid ${colors.border}`,
                        background: baseBg,
                        opacity: baseOpacity,
                        position: 'relative',
                      }}
                    >
                      <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.4 }}>
                        {signal.emoji} <strong>{signal.company}</strong>
                        {signal.text ? ` — ${signal.text}` : ''}
                      </div>
                      {signal.sub && (
                        <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginTop: 2 }}>
                          {signal.sub}
                        </div>
                      )}
                      {isActive && i === 7 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 7,
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

            {/* Right: "Find your targets" callout text */}
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
        {beat === 4 && <Beat4CRM frame={frame} beatStartFrame={BEAT_3_END} />}
        {beat === 5 && <Beat5Memo frame={frame} beatStartFrame={BEAT_4_END} />}
      </div>

      {/* ── Intro overlay (full screen, fades out) ── */}
      {frame < INTRO_END + 5 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0D1117',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: introOpacity,
            zIndex: 20,
          }}
        >
          <div style={{ textAlign: 'center', padding: '0 60px' }}>
            <div
              style={{
                fontSize: 42,
                fontWeight: font.weights.bold,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              Drive Results With
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: font.weights.bold,
                color: colors.blue,
                lineHeight: 1.25,
              }}
            >
              TechTower's AI Engine
            </div>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
