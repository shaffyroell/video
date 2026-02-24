import React from 'react';
import { interpolate, spring } from 'remotion';
import { colors, font, motion } from '../tokens';

interface Beat5MemoProps {
  frame: number;
  beatStartFrame: number;
}

const memoSections = [
  { label: 'BACKGROUND', text: '2 exits · last company acquired by Prosus 2021' },
  { label: 'RECENT ACTIVITY', text: 'LinkedIn dark 3 weeks ago · new domain registered' },
  { label: 'SIGNAL SUMMARY', text: 'High probability new venture in early formation' },
];

export const Beat5Memo: React.FC<Beat5MemoProps> = ({ frame, beatStartFrame }) => {
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

  const sentOpacity = interpolate(localFrame, [35, 45], [0, 1], {
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
          background: '#FFFFFF',
          border: `1px solid #E5E5E5`,
          borderRadius: 12,
          padding: 32,
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header with document icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: colors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Briefing Note
            </div>
            <div style={{ fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
              James Vance
            </div>
            <div style={{ fontSize: font.sizes.small, color: colors.textSecondary, marginTop: 4 }}>
              {today}
            </div>
          </div>

          {/* Document format badges */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 6,
                background: '#FEF3C7',
                border: '1px solid #F59E0B',
              }}
            >
              <span style={{ fontSize: 14 }}>📊</span>
              <span style={{ fontSize: 10, fontWeight: font.weights.semibold, color: '#B45309' }}>PPT</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 6,
                background: '#DBEAFE',
                border: '1px solid #3B82F6',
              }}
            >
              <span style={{ fontSize: 14 }}>📄</span>
              <span style={{ fontSize: 10, fontWeight: font.weights.semibold, color: '#1D4ED8' }}>DOC</span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 20 }} />

        {/* Sections */}
        {memoSections.map((section, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: font.sizes.label, fontWeight: font.weights.semibold, color: colors.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {section.label}
            </div>
            <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
              {section.text}
            </div>
          </div>
        ))}

        {/* Sent to email confirmation */}
        {localFrame >= 30 && (
          <div
            style={{
              marginTop: 20,
              padding: '14px 16px',
              background: '#F0FDF4',
              borderRadius: 8,
              border: `1px solid ${colors.green}`,
              opacity: sentOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>📧</span>
            <div>
              <div style={{ color: colors.green, fontWeight: font.weights.semibold, fontSize: font.sizes.body }}>
                ✓ Memo sent to shaffy@techtower.ai
              </div>
              <div style={{ color: colors.textSecondary, fontSize: font.sizes.small, marginTop: 2 }}>
                PPT and DOC attachments included
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
