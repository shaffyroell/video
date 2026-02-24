import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { colors, font } from './tokens';
import { signals } from './data/signals';
import { LiveDot } from './components/LiveDot';
import { SignalRow } from './components/SignalRow';
import { Beat1Signals } from './beats/Beat1Signals';
import { Beat2Research } from './beats/Beat2Research';
import { Beat3Outreach } from './beats/Beat3Outreach';
import { Beat4CRM } from './beats/Beat4CRM';
import { Beat5Memo } from './beats/Beat5Memo';

export const signalAnimationSchema = z.object({
  backgroundColor: z.string().default('#F5F5F5'),
});

// Beat frame boundaries
const BEAT_1_END = 90;
const BEAT_2_END = 210;
const BEAT_3_END = 360;
const BEAT_4_END = 420;
// Beat 5: 420 - 540

// Typing animation config
const WORDS = ['clients', 'investments', 'angels/LPs', 'candidates'];
const FRAMES_PER_CYCLE = 135;
const TYPE_SPEED = 3;
const DELETE_SPEED = 2;
const HOLD_FRAMES = 65;

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

export const SignalAnimation: React.FC<z.infer<typeof signalAnimationSchema>> = ({ backgroundColor }) => {
  const frame = useCurrentFrame();

  const typedWord = getTypedWord(frame);

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
  const LEFT_WIDTH = 380;

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
          paddingLeft: 24,
          paddingRight: 24,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
          Systems to find new{' '}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: font.weights.bold,
            color: colors.blue,
            minWidth: 160,
            display: 'inline-block',
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

      {/* Main content row */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          overflow: 'hidden',
        }}
      >
        {/* Left Panel — persistent signal feed */}
        <div
          style={{
            width: LEFT_WIDTH,
            flexShrink: 0,
            borderRight: `1px solid ${colors.border}`,
            background: colors.background,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Left header */}
          <div
            style={{
              padding: '14px 16px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              borderBottom: `1px solid ${colors.border}`,
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
              Signals
            </span>
            <LiveDot frame={frame} />
          </div>

          {/* Signal rows */}
          <div
            style={{
              padding: '10px 12px',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {signals.map((signal, i) => (
              <SignalRow
                key={i}
                frame={frame}
                emoji={signal.emoji}
                company={signal.company}
                text={signal.text}
                sub={signal.sub}
                index={i}
                isHighlighted={i === 7 && frame >= 85}
              />
            ))}
          </div>
        </div>

        {/* Right Panel — beat content */}
        <div
          style={{
            flex: 1,
            background: colors.background,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {beat === 1 && <Beat1Signals frame={frame} />}
          {beat === 2 && <Beat2Research frame={frame} />}
          {beat === 3 && <Beat3Outreach frame={frame} />}
          {beat === 4 && <Beat4CRM frame={frame} />}
          {beat === 5 && <Beat5Memo frame={frame} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};
