import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface RankingScoreProps {
  delay: number;
}

const leads = [
  { name: "Sarah Chen", company: "NeuralPath AI", role: "CEO & Founder", score: 9.2, initials: "SC", gradient: "linear-gradient(135deg, #667eea, #764ba2)" },
  { name: "Marcus Rivera", company: "FinLedger", role: "CTO & Co-Founder", score: 8.7, initials: "MR", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
  { name: "Aisha Patel", company: "CloudMesh", role: "CEO", score: 7.4, initials: "AP", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)" },
  { name: "James Liu", company: "DataVault", role: "Founder", score: 6.1, initials: "JL", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)" },
  { name: "Emma Wilson", company: "HealthSync", role: "CEO & Founder", score: 4.3, initials: "EW", gradient: "linear-gradient(135deg, #fa709a, #fee140)" },
];

const getScoreColor = (score: number) => {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#f59e0b";
  return "#ef4444";
};

export const RankingScore: React.FC<RankingScoreProps> = ({ delay }) => {
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
        gap: 30,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Ranking list */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          width: 520,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>
            Ranked Leads
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              backgroundColor: "#f1f5f9",
              padding: "4px 12px",
              borderRadius: 12,
            }}
          >
            Fit Score 1-10
          </div>
        </div>

        {leads.map((lead, index) => {
          const rowDelay = delay + 15 + index * 15;
          const rowOpacity = interpolate(frame - rowDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const slideIn = interpolate(frame - rowDelay, [0, 15], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Score bar fill animation
          const barProgress = interpolate(
            frame - rowDelay - 10,
            [0, 25],
            [0, lead.score / 10],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Score number animation
          const scoreProgress = interpolate(
            frame - rowDelay - 10,
            [0, 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const displayScore = (scoreProgress * lead.score).toFixed(1);

          const scoreColor = getScoreColor(lead.score);

          return (
            <div
              key={lead.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 0",
                borderBottom:
                  index < leads.length - 1 ? "1px solid #f8fafc" : "none",
                opacity: rowOpacity,
                transform: `translateX(${slideIn}px)`,
              }}
            >
              {/* Rank number */}
              <div
                style={{
                  width: 28,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#94a3b8",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </div>

              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: lead.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {lead.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
                  {lead.name}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {lead.role} · {lead.company}
                </div>
              </div>

              {/* Score bar */}
              <div style={{ width: 100 }}>
                <div
                  style={{
                    height: 8,
                    backgroundColor: "#f1f5f9",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${barProgress * 100}%`,
                      backgroundColor: scoreColor,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>

              {/* Score */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: scoreColor,
                  width: 40,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayScore}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Enrichment Engine card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 340,
          opacity: interpolate(frame - delay - 20, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {/* Enrichment header card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>
                AI Enrichment Engine
              </div>
              <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 500 }}>
                Deep analysis per lead
              </div>
            </div>
          </div>

          {/* Enrichment steps */}
          {[
            { label: "Website analyzed", detail: "Product, team, pricing", icon: "globe" },
            { label: "LinkedIn profile scraped", detail: "Experience, skills, posts", icon: "linkedin" },
            { label: "Desk research completed", detail: "News, press, funding", icon: "search" },
            { label: "Podcast appearances found", detail: "Interviews & talks", icon: "mic" },
            { label: "Social signals tracked", detail: "X, Reddit, HN activity", icon: "signal" },
            { label: "Tech stack identified", detail: "BuiltWith, Wappalyzer", icon: "code" },
          ].map((step, i) => {
            const stepDelay = delay + 35 + i * 12;
            const stepOpacity = interpolate(
              frame - stepDelay,
              [0, 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const checkProgress = interpolate(
              frame - stepDelay - 8,
              [0, 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: i < 5 ? "1px solid #f8fafc" : "none",
                  opacity: stepOpacity,
                }}
              >
                {/* Checkmark circle */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: checkProgress >= 1 ? "#10b981" : "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {checkProgress >= 1 ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#cbd5e1",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: checkProgress >= 1 ? "#1e293b" : "#94a3b8" }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scoring weights mini card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            opacity: interpolate(frame - delay - 100, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Scoring Weights
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { label: "Industry", w: "30%" },
              { label: "Funding", w: "25%" },
              { label: "Team", w: "20%" },
              { label: "Signals", w: "15%" },
              { label: "Timing", w: "10%" },
            ].map((w) => (
              <div
                key={w.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  backgroundColor: "#f8fafc",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                <span style={{ color: "#475569" }}>{w.label}</span>
                <span style={{ fontWeight: 700, color: "#3b82f6" }}>{w.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
