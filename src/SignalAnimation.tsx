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

// Beat frame boundaries - SLOWER pacing
const BEAT_1_END = 240;   // Signals highlight sequence (8s)
const BEAT_2_END = 420;   // Desk Research (6s)
const BEAT_3_END = 580;   // Outreach (5.3s)
const BEAT_4_END = 700;   // Update CRM (4s)
// Beat 5: 700 - 820      // Memo sent (4s)

// Steps for indicator
const STEPS = ['Signals', 'Desk Research', 'Outreach', 'Update CRM', 'Memo Sent'];

// Typing animation config
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

  if (wordFrame < typeFrames) {
    const chars = Math.floor(wordFrame / TYPE_SPEED);
    return word.slice(0, chars);
  } else if (wordFrame < typeFrames + HOLD_FRAMES) {
    return word;
  } else if (wordFrame < typeFrames + HOLD_FRAMES + deleteFrames) {
    const deleteProgress = wordFrame - typeFrames - HOLD_FRAMES;
    const chars = word.length - Math.floor(deleteProgress / DELETE_SPEED);
    return word.slice(0, Math.max(0, chars));
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

export const SignalAnimation: React.FC<z.infer<typeof signalAnimationSchema>> = ({ backgroundColor }) => {
  const frame = useCurrentFrame();
  const typedWord = getTypedWord(frame);
  const currentStep = getCurrentStep(frame);

  const beat = frame < BEAT_1_END
    ? 1
    : frame < BEAT_2_END
    ? 2
    : frame < BEAT_3_END
    ? 3
    : frame < BEAT_4_END
    ? 4
    : 5;

  const HEADER_HEIGHT = 62;

  // Highlight timing - SLOWER, one card every 24 frames (0.8s per card)
  const HIGHLIGHT_INTERVAL = 24;
  const highlightIndex = Math.floor(frame / HIGHLIGHT_INTERVAL) % signals.length;
  // After cycling through once, stick on James Vance (index 7)
  const finalHighlightIndex = frame >= HIGHLIGHT_INTERVAL * signals.length ? 7 : highlightIndex;

  return (
    <AbsoluteFill style={{ background: backgroundColor || colors.background, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div
        style={{
          height: HEADER_HEIGHT,
          background: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Centered title text */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
            Systems to find
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: font.weights.bold,
              color: colors.blue,
              minWidth: 180,
              display: 'inline-block',
              marginLeft: 8,
            }}
          >
            {typedWord}
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 22,
                background: colors.blue,
                marginLeft: 2,
                verticalAlign: 'middle',
                opacity: Math.round(frame / 15) % 2 === 0 ? 1 : 0,
              }}
            />
          </span>
        </div>

        {/* Step indicator - top right */}
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isPast = i < currentStep;
            return (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? font.weights.semibold : font.weights.regular,
                    color: isActive ? colors.blue : isPast ? colors.green : colors.textSecondary,
                    padding: '3px 8px',
                    borderRadius: 10,
                    background: isActive ? '#EBF5FF' : isPast ? '#ECFDF5' : 'transparent',
                    border: isActive ? `1px solid ${colors.blue}` : isPast ? `1px solid ${colors.green}` : `1px solid ${colors.border}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isPast ? '✓ ' : ''}{step}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 8, height: 1, background: colors.border }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content - full width, one thing at a time */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Beat 1: Signals - ALL visible from start, highlight one by one */}
        {beat === 1 && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 40px',
              overflowY: 'auto',
            }}
          >
            {/* Signals header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: font.sizes.label,
                  fontWeight: font.weights.semibold,
                  color: colors.textSecondary,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Live Signals
              </span>
              <LiveDot frame={frame} />
            </div>

            {/* Signal cards - ALL visible from start */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                maxWidth: 600,
                alignItems: 'center',
              }}
            >
              {signals.map((signal, i) => {
                const isHighlighted = finalHighlightIndex === i;

                return (
                  <div
                    key={i}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: `1px solid ${isHighlighted ? colors.blue : colors.border}`,
                      borderLeft: isHighlighted ? `3px solid ${colors.blue}` : `1px solid ${colors.border}`,
                      background: isHighlighted ? '#F0F4FF' : colors.card,
                      opacity: isHighlighted ? 1 : 0.6,
                      transform: `scale(${isHighlighted ? 1.02 : 1})`,
                      position: 'relative',
                      transition: 'all 0.2s ease',
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
                    {isHighlighted && i === 7 && (
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
        )}

        {/* Beat 2: Desk Research */}
        {beat === 2 && <Beat2Research frame={frame} beatStartFrame={BEAT_1_END} />}

        {/* Beat 3: Outreach */}
        {beat === 3 && <Beat3Outreach frame={frame} beatStartFrame={BEAT_2_END} />}

        {/* Beat 4: Update CRM */}
        {beat === 4 && <Beat4CRM frame={frame} beatStartFrame={BEAT_3_END} />}

        {/* Beat 5: Memo Sent */}
        {beat === 5 && <Beat5Memo frame={frame} beatStartFrame={BEAT_4_END} />}
      </div>
    </AbsoluteFill>
  );
};
