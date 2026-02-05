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

      {/* Score criteria card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          width: 300,
          opacity: interpolate(frame - delay - 30, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          Scoring Criteria
        </div>
        {[
          { label: "Industry fit", weight: "30%" },
          { label: "Funding stage", weight: "25%" },
          { label: "Team background", weight: "20%" },
          { label: "Growth signals", weight: "15%" },
          { label: "Market timing", weight: "10%" },
        ].map((criteria, i) => {
          const critDelay = delay + 50 + i * 10;
          const critOpacity = interpolate(
            frame - critDelay,
            [0, 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={criteria.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 4 ? "1px solid #f8fafc" : "none",
                opacity: critOpacity,
              }}
            >
              <span style={{ fontSize: 14, color: "#475569" }}>
                {criteria.label}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3b82f6",
                }}
              >
                {criteria.weight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
