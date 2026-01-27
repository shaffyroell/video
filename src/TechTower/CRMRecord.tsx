import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CRMRecordProps {
  delay: number;
}

const checklistItems = [
  { text: "Fit score calculated", detail: "(9 / 10)" },
  { text: "Desk research completed", detail: "" },
  { text: "LinkedIn URL found", detail: "" },
  { text: "Founder–market fit analyzed", detail: "" },
  { text: "CRM updated", detail: "" },
  { text: "Draft outreach email sent to human", detail: "" },
  { text: "Ready for auto-outreach", detail: "(LinkedIn + email)" },
];

const integrations = [
  { name: "Arfinity", color: "#3b82f6" },
  { name: "attio", color: "#ef4444" },
  { name: "Airtable", color: "#f59e0b" },
];

export const CRMRecord: React.FC<CRMRecordProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const cardOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardSlide = interpolate(frame - delay, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 28,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        opacity: cardOpacity,
        transform: `translateX(${cardSlide}px)`,
        width: 380,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "#1e293b",
          marginBottom: 20,
        }}
      >
        CRM record created
      </div>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {checklistItems.map((item, index) => {
          const itemDelay = delay + 15 + index * 8;
          const itemOpacity = interpolate(frame - itemDelay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                opacity: itemOpacity,
              }}
            >
              {/* Green checkmark */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginTop: 2, flexShrink: 0 }}
              >
                <path
                  d="M5 12L10 17L19 8"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: 15, color: "#374151" }}>
                {item.text}
                {item.detail && (
                  <span style={{ color: "#9ca3af" }}> {item.detail}</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Integration logos */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #f1f5f9",
        }}
      >
        {integrations.map((integration, index) => {
          const logoDelay = delay + 80 + index * 10;
          const logoOpacity = interpolate(frame - logoDelay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={integration.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: logoOpacity,
              }}
            >
              {/* Simple logo placeholder */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: integration.color,
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                {integration.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Email sent note */}
      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: "#9ca3af",
        }}
      >
        Email sent to deal team
      </div>
    </div>
  );
};
