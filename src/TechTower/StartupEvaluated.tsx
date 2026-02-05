import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface StartupEvaluatedProps {
  delay: number;
}

const researchSteps = [
  { label: "Website & product analyzed", detail: "Features, pricing, positioning", icon: "globe" },
  { label: "Full LinkedIn deep dive", detail: "Founders, team, growth trajectory", icon: "linkedin" },
  { label: "Desk research completed", detail: "News, press mentions, funding history", icon: "search" },
  { label: "Competitor landscape mapped", detail: "Market share, differentiation, moats", icon: "grid" },
  { label: "Product comparison scored", detail: "vs. 4 direct competitors", icon: "bar" },
  { label: "Founder-market fit assessed", detail: "Domain expertise, track record, network", icon: "user" },
  { label: "Tech stack identified", detail: "Infrastructure, tools, architecture", icon: "code" },
  { label: "Social presence tracked", detail: "X, Reddit, HN, podcasts", icon: "signal" },
];

const founderProfile = {
  name: "Warren Michaels",
  initials: "WM",
  role: "CEO & Founder",
  company: "Acme AI",
  gradient: "linear-gradient(135deg, #667eea, #764ba2)",
  fitScore: 9.2,
  highlights: [
    "Ex-Stripe PM (4 yrs)",
    "Stanford CS + MBA",
    "2nd-time founder",
    "Strong AI/ML network",
  ],
};

export const StartupEvaluated: React.FC<StartupEvaluatedProps> = ({
  delay,
}) => {
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
      {/* AI Research Engine card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 22,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          width: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            paddingBottom: 14,
            borderBottom: "1px solid #f1f5f9",
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
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
              AI Research Engine
            </div>
            <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 500 }}>
              Automated deep dive per startup
            </div>
          </div>
        </div>

        {researchSteps.map((step, i) => {
          const stepDelay = delay + 15 + i * 10;
          const stepOpacity = interpolate(
            frame - stepDelay,
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const checkProgress = interpolate(
            frame - stepDelay - 6,
            [0, 8],
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
                padding: "7px 0",
                borderBottom: i < researchSteps.length - 1 ? "1px solid #f8fafc" : "none",
                opacity: stepOpacity,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: checkProgress >= 1 ? "#10b981" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {checkProgress >= 1 ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#cbd5e1" }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
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

      {/* Founder profile + fit score card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 300,
        }}
      >
        {/* Founder card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            opacity: interpolate(frame - delay - 40, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: founderProfile.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {founderProfile.initials}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>
                {founderProfile.name}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{founderProfile.role}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{founderProfile.company}</div>
            </div>
          </div>

          {/* Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {founderProfile.highlights.map((h, i) => {
              const hDelay = delay + 60 + i * 8;
              const hOpacity = interpolate(frame - hDelay, [0, 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: hOpacity,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#8b5cf6" }} />
                  <span style={{ fontSize: 13, color: "#475569" }}>{h}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fit score card */}
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
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Thesis Fit Score
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "#10b981",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {(
                interpolate(frame - delay - 80, [0, 30], [0, founderProfile.fitScore], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              ).toFixed(1)}
            </div>
            <div>
              <div style={{ height: 10, width: 140, backgroundColor: "#f1f5f9", borderRadius: 5, overflow: "hidden", marginBottom: 4 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${interpolate(frame - delay - 80, [0, 30], [0, founderProfile.fitScore * 10], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}%`,
                    backgroundColor: "#10b981",
                    borderRadius: 5,
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Strong match with thesis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
