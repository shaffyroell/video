import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface DealCreatedProps {
  delay: number;
}

export const DealCreated: React.FC<DealCreatedProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 20], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        opacity,
        transform: `scale(${scale})`,
        width: 280,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Blue checkmark circle */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12L10 17L19 8"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#3b82f6",
            }}
          >
            Deal created
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#94a3b8",
              marginTop: 4,
            }}
          >
            Fit score: 9 / 10
          </div>
        </div>
      </div>
    </div>
  );
};
