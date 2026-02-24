import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';
import { memoSections } from '../data/signals';

interface Beat5MemoProps {
  frame: number;
}

const ENTER_FRAME = 428;
const TALKING_POINTS_TEXT = memoSections[3].text;

export const Beat5Memo: React.FC<Beat5MemoProps> = ({ frame }) => {
  const cardOpacity = interpolate(frame, [ENTER_FRAME, ENTER_FRAME + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardTranslateY = spring({
    frame: frame - ENTER_FRAME,
    fps: 30,
    config: motion.springConfig,
    from: 12,
    to: 0,
  });

  function sectionOpacity(startFrame: number) {
    return interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const talkingPointsChars = Math.floor(
    interpolate(frame, [490, 490 + TALKING_POINTS_TEXT.length * 2], [0, TALKING_POINTS_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const confirmOpacity = interpolate(frame, [525, 535], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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
          background: '#FFFFFF',
          border: `1px solid #E5E5E5`,
          borderRadius: 8,
          padding: 28,
          maxWidth: 600,
          width: '100%',
        }}
      >
        {/* BRIEFING NOTE label */}
        <div
          style={{
            fontSize: font.sizes.label,
            fontWeight: font.weights.semibold,
            color: colors.textSecondary,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 6,
            opacity: sectionOpacity(430),
          }}
        >
          Briefing Note
        </div>

        {/* Name + Date */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 12,
            opacity: sectionOpacity(435),
          }}
        >
          <div
            style={{
              fontSize: font.sizes.memo,
              fontWeight: font.weights.bold,
              color: colors.textPrimary,
            }}
          >
            James Vance
          </div>
          <div style={{ fontSize: font.sizes.small, color: colors.textSecondary }}>
            {today}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: colors.border,
            marginBottom: 16,
            opacity: sectionOpacity(440),
          }}
        />

        {/* Sections */}
        {[
          { label: memoSections[0].label, text: memoSections[0].text, startFrame: 445 },
          { label: memoSections[1].label, text: memoSections[1].text, startFrame: 460 },
          { label: memoSections[2].label, text: memoSections[2].text, startFrame: 475 },
        ].map((section, i) => (
          <div
            key={i}
            style={{
              marginBottom: 14,
              opacity: sectionOpacity(section.startFrame),
            }}
          >
            <div
              style={{
                fontSize: font.sizes.label,
                fontWeight: font.weights.semibold,
                color: colors.textSecondary,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              {section.label}
            </div>
            <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
              {section.text}
            </div>
          </div>
        ))}

        {/* Talking Points — typewriter */}
        {frame >= 490 && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: font.sizes.label,
                fontWeight: font.weights.semibold,
                color: colors.textSecondary,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              {memoSections[3].label}
            </div>
            <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
              {TALKING_POINTS_TEXT.slice(0, talkingPointsChars)}
              <span style={{ opacity: 0.4 }}>|</span>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {frame >= 525 && (
          <div
            style={{
              color: colors.green,
              fontSize: font.sizes.small,
              marginTop: 16,
              opacity: confirmOpacity,
            }}
          >
            ✓ Memo sent to shaffy@techtower.ai
          </div>
        )}
      </div>
    </div>
  );
};
