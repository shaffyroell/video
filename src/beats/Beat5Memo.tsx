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

const documentTypes = [
  { icon: '📋', name: 'Meeting Prep', color: '#3B82F6', bg: '#DBEAFE' },
  { icon: '📄', name: 'Quick-Scan Memo', color: '#059669', bg: '#D1FAE5' },
  { icon: '👤', name: 'Candidate Slide', color: '#7C3AED', bg: '#EDE9FE' },
];

export const Beat5Memo: React.FC<Beat5MemoProps> = ({ frame, beatStartFrame }) => {
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

  const sentOpacity = interpolate(localFrame, [70, 85], [0, 1], {
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
          maxWidth: 650,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header with template info */}
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

          {/* Company template badge */}
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: '#F0F9FF',
              border: '1px solid #0EA5E9',
            }}
          >
            <div style={{ fontSize: 10, color: '#0369A1', fontWeight: font.weights.semibold, letterSpacing: '0.05em' }}>
              YOUR TEMPLATE
            </div>
          </div>
        </div>

        {/* Document types available */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 20,
            padding: '12px 14px',
            background: '#FAFAFA',
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ fontSize: font.sizes.label, color: colors.textSecondary, marginRight: 4, alignSelf: 'center' }}>
            Formats:
          </div>
          {documentTypes.map((doc, i) => {
            const docOpacity = interpolate(localFrame, [15 + i * 12, 23 + i * 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: doc.bg,
                  border: `1px solid ${doc.color}`,
                  opacity: docOpacity,
                }}
              >
                <span style={{ fontSize: 12 }}>{doc.icon}</span>
                <span style={{ fontSize: 10, fontWeight: font.weights.semibold, color: doc.color }}>
                  {doc.name}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: colors.border, marginBottom: 20 }} />

        {/* Sections */}
        {memoSections.map((section, i) => {
          const sectionOpacity = interpolate(localFrame, [30 + i * 12, 38 + i * 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div key={i} style={{ marginBottom: 14, opacity: sectionOpacity }}>
              <div style={{ fontSize: font.sizes.label, fontWeight: font.weights.semibold, color: colors.textSecondary, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                {section.label}
              </div>
              <div style={{ fontSize: font.sizes.body, color: colors.textPrimary, lineHeight: 1.5 }}>
                {section.text}
              </div>
            </div>
          );
        })}

        {/* Sent to email confirmation */}
        {localFrame >= 65 && (
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
              gap: 12,
            }}
          >
            <span style={{ fontSize: 20 }}>📧</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.green, fontWeight: font.weights.semibold, fontSize: font.sizes.body }}>
                ✓ Memo sent to shaffy@techtower.ai
              </div>
              <div style={{ color: colors.textSecondary, fontSize: font.sizes.small, marginTop: 2 }}>
                Meeting Prep, Quick-Scan Memo, and Candidate Slide attached
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
