import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface LinkedInProfileProps {
  delay: number;
}

export const LinkedInProfile: React.FC<LinkedInProfileProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 25], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* LinkedIn Profile Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          width: 480,
          overflow: "hidden",
        }}
      >
        {/* LinkedIn Blue Header */}
        <div
          style={{
            height: 80,
            background: "linear-gradient(135deg, #0077B5 0%, #005885 100%)",
            position: "relative",
          }}
        />

        {/* Profile Content */}
        <div style={{ padding: 24, paddingTop: 60, position: "relative" }}>
          {/* Avatar */}
          <div
            style={{
              position: "absolute",
              top: -50,
              left: 24,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "4px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            SC
          </div>

          {/* Name and Title */}
          <div style={{ marginLeft: 0 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              Sarah Chen
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#64748b",
                marginBottom: 8,
              }}
            >
              CEO & Co-founder at TechStartup
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#94a3b8",
              }}
            >
              San Francisco Bay Area · 500+ connections
            </div>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#0077B5" }}>
                2nd
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Connection</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#1e293b" }}>
                Stanford
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Education</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#1e293b" }}>
                Series A
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Raising</div>
            </div>
          </div>
        </div>
      </div>

      {/* Label below */}
      <div
        style={{
          marginTop: 24,
          fontSize: 18,
          color: "#64748b",
          fontWeight: 500,
        }}
      >
        Viewing LinkedIn Profile
      </div>
    </div>
  );
};
