import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';

interface Beat4CRMProps {
  frame: number;
  beatStartFrame: number;
}

const crmRows = [
  { contact: 'Elena Marsh', status: 'REPLIED', signalSource: 'Website visit · 2x', timestamp: 'Yesterday', isJames: false },
  { contact: 'James Vance', status: 'NEW', signalSource: '', timestamp: 'Today, 09:41', isJames: true },
  { contact: 'Tom Aldridge', status: 'IN SEQUENCE', signalSource: 'LinkedIn follow', timestamp: 'Nov 21', isJames: false },
];

// CRM integrations
const crmLogos = [
  { name: 'Affinity', color: '#4F46E5', bg: '#EEF2FF' },
  { name: 'Attio', color: '#0EA5E9', bg: '#F0F9FF' },
  { name: 'HubSpot', color: '#F97316', bg: '#FFF7ED' },
];

export const Beat4CRM: React.FC<Beat4CRMProps> = ({ frame, beatStartFrame }) => {
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

  // James row animations - SLOWER
  const jamesStatusProgress = interpolate(localFrame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const jamesPillBg = `rgb(${Math.round(229 - 10 * jamesStatusProgress)}, ${Math.round(229 + 5 * jamesStatusProgress)}, ${Math.round(229 + 25 * jamesStatusProgress)})`;

  const jamesSignalChars = Math.floor(
    interpolate(localFrame, [40, 70], [0, 22], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const confirmOpacity = interpolate(localFrame, [85, 100], [0, 1], {
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
          width: '100%',
          maxWidth: 800,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header with CRM logos */}
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                CRM Update
              </div>
              <div style={{ fontSize: 18, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                Adding James Vance to pipeline
              </div>
            </div>

            {/* CRM Logos */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginRight: 4 }}>Sync to:</span>
              {crmLogos.map((crm, i) => {
                const logoOpacity = interpolate(localFrame, [10 + i * 10, 18 + i * 10], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                return (
                  <div
                    key={crm.name}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: crm.bg,
                      border: `1px solid ${crm.color}`,
                      opacity: logoOpacity,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: font.weights.semibold, color: crm.color }}>
                      {crm.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div
          style={{
            display: 'flex',
            padding: '12px 24px',
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
          const rowOpacity = isJames ? 1 : 0.5;
          const statusText = isJames && localFrame >= 40 ? 'IN SEQUENCE' : row.status;
          const statusBg = isJames ? jamesPillBg : '#E5E5E5';
          const statusColor = isJames && localFrame >= 40 ? colors.blue : colors.textSecondary;
          const signalSource = isJames
            ? 'Stealth Mode detected'.slice(0, jamesSignalChars)
            : row.signalSource;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 24px',
                borderBottom: idx < crmRows.length - 1 ? `1px solid ${colors.border}` : 'none',
                opacity: rowOpacity,
                background: isJames ? '#FAFEFF' : 'transparent',
              }}
            >
              <div
                style={{
                  flex: 2,
                  fontSize: font.sizes.card,
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
                    padding: '3px 10px',
                  }}
                >
                  {statusText}
                </span>
              </div>
              <div style={{ flex: 2, fontSize: font.sizes.small, color: colors.textSecondary }}>
                {signalSource}
              </div>
              <div style={{ flex: 1, fontSize: font.sizes.small, color: colors.textSecondary, textAlign: 'right' }}>
                {row.timestamp}
              </div>
            </div>
          );
        })}

        {/* Confirmation */}
        {localFrame >= 80 && (
          <div
            style={{
              padding: '16px 24px',
              borderTop: `1px solid ${colors.border}`,
              background: '#F0FDF4',
              opacity: confirmOpacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ color: colors.green, fontWeight: font.weights.semibold, fontSize: font.sizes.body }}>
              ✓ Contact synced to Affinity, Attio, HubSpot
            </span>
            <span style={{ fontSize: font.sizes.small, color: colors.textSecondary }}>
              3 CRMs updated
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
