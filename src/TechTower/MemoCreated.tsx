import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface MemoCreatedProps {
  delay: number;
}

const memoSections = [
  { title: "Executive Summary", lines: 3 },
  { title: "Market Opportunity", lines: 2 },
  { title: "Product & Technology", lines: 3 },
  { title: "Competitive Landscape", lines: 2 },
  { title: "Founder-Market Fit", lines: 2 },
  { title: "Financials & Ask", lines: 2 },
  { title: "Investment Thesis Alignment", lines: 2 },
];

export const MemoCreated: React.FC<MemoCreatedProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Memo document */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          width: 440,
          border: "2px solid #f1f5f9",
        }}
      >
        {/* Document header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: "2px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>
                Investment Memo
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>
                Acme AI — Quick Scan
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
            }}
          >
            <div
              style={{
                padding: "4px 10px",
                backgroundColor: "#fef3c7",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                color: "#d97706",
              }}
            >
              PPT
            </div>
            <div
              style={{
                padding: "4px 10px",
                backgroundColor: "#dbeafe",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                color: "#2563eb",
              }}
            >
              DOC
            </div>
          </div>
        </div>

        {/* Memo sections with progressive reveal */}
        {memoSections.map((section, i) => {
          const sectionDelay = delay + 15 + i * 12;
          const sectionOpacity = interpolate(
            frame - sectionDelay,
            [0, 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Simulate text lines filling in
          const lineProgress = interpolate(
            frame - sectionDelay - 8,
            [0, 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={section.title}
              style={{
                marginBottom: i < memoSections.length - 1 ? 14 : 0,
                opacity: sectionOpacity,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 6,
                }}
              >
                {section.title}
              </div>
              {Array.from({ length: section.lines }).map((_, lineIdx) => {
                const lineWidth = lineIdx === section.lines - 1 ? 60 + Math.random() * 20 : 85 + Math.random() * 15;
                const thisLineProgress = interpolate(
                  lineProgress,
                  [lineIdx / section.lines, (lineIdx + 1) / section.lines],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={lineIdx}
                    style={{
                      height: 8,
                      backgroundColor: "#f1f5f9",
                      borderRadius: 4,
                      marginBottom: 4,
                      width: `${lineWidth}%`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${thisLineProgress * 100}%`,
                        backgroundColor: "#cbd5e1",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Right side: Template info + status */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 280,
        }}
      >
        {/* VC Template badge */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            opacity: interpolate(frame - delay - 30, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Your Template
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Format", value: "Partner Meeting Deck" },
              { label: "Style", value: "2-page quick scan" },
              { label: "Sections", value: "7 auto-filled" },
              { label: "Data points", value: "42 enriched" },
            ].map((item, i) => {
              const iDelay = delay + 45 + i * 10;
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: interpolate(frame - iDelay, [0, 12], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <span style={{ fontSize: 13, color: "#64748b" }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generated status */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            opacity: interpolate(frame - delay - 80, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#10b981" />
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#10b981" }}>
                Memo Generated
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Ready for partner review
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
