import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';

interface Beat4CRMProps {
  frame: number;
}

const ENTER_FRAME = 368;
const ANIMATE_FRAME = 370;

const crmRows = [
  { contact: 'Elena Marsh', status: 'REPLIED', signalSource: 'Website visit · 2x', timestamp: 'Yesterday, 14:22', isJames: false },
  { contact: 'James Vance', status: 'NEW', signalSource: '', timestamp: 'Today, 09:41', isJames: true },
  { contact: 'Tom Aldridge', status: 'IN SEQUENCE', signalSource: 'LinkedIn follow', timestamp: 'Nov 21, 11:05', isJames: false },
];

export const Beat4CRM: React.FC<Beat4CRMProps> = ({ frame }) => {
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

  // James row animation
  const jamesStatusProgress = interpolate(frame, [ANIMATE_FRAME, ANIMATE_FRAME + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const jamesPillBg = `rgb(${Math.round(229 - 10 * jamesStatusProgress)}, ${Math.round(229 + 5 * jamesStatusProgress)}, ${Math.round(229 + 25 * jamesStatusProgress)})`;

  const jamesSignalChars = Math.floor(
    interpolate(frame, [ANIMATE_FRAME + 2, ANIMATE_FRAME + 22], [0, 22], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const jamesTimestampOpacity = interpolate(frame, [ANIMATE_FRAME + 10, ANIMATE_FRAME + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'flex',
            padding: '10px 16px',
            borderBottom: `1px solid ${colors.border}`,
            background: '#FAFAFA',
          }}
        >
          {['CONTACT', 'STATUS', 'SIGNAL SOURCE', 'TIME'].map((col, i) => (
            <div
              key={col}
              style={{
                flex: i === 0 || i === 2 ? 2 : 1,
                fontSize: font.sizes.label,
                fontWeight: font.weights.semibold,
                color: colors.textSecondary,
                letterSpacing: '0.08em',
                textAlign: i === 3 ? 'right' : 'left',
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {crmRows.map((row, idx) => {
          const isJames = row.isJames;
          const rowOpacity = isJames ? 1 : 0.4;
          const statusText = isJames && frame >= ANIMATE_FRAME + 5 ? 'IN SEQUENCE' : row.status;
          const statusBg = isJames ? jamesPillBg : '#E5E5E5';
          const statusColor = isJames && frame >= ANIMATE_FRAME + 5 ? colors.blue : colors.textSecondary;
          const signalSource = isJames
            ? 'Stealth Mode detected'.slice(0, jamesSignalChars)
            : row.signalSource;
          const timestampOpacity = isJames ? jamesTimestampOpacity : 1;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: idx < crmRows.length - 1 ? `1px solid ${colors.border}` : 'none',
                opacity: rowOpacity,
                background: isJames ? '#FAFEFF' : 'transparent',
              }}
            >
              <div
                style={{
                  flex: 2,
                  fontSize: font.sizes.body,
                  fontWeight: isJames ? font.weights.semibold : font.weights.regular,
                  color: colors.textPrimary,
                }}
              >
                {row.contact}
              </div>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: font.sizes.small,
                    fontWeight: font.weights.medium,
                    color: statusColor,
                    background: statusBg,
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}
                >
                  {statusText}
                </span>
              </div>
              <div
                style={{
                  flex: 2,
                  fontSize: font.sizes.small,
                  color: colors.textSecondary,
                }}
              >
                {signalSource}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: font.sizes.small,
                  color: colors.textSecondary,
                  textAlign: 'right',
                  opacity: timestampOpacity,
                }}
              >
                {row.timestamp}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
