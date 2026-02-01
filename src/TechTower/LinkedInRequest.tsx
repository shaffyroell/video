import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface LinkedInRequestProps {
  delay: number;
}

export const LinkedInRequest: React.FC<LinkedInRequestProps> = ({ delay }) => {
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

  const checkmarkScale = interpolate(frame - delay, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
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
      {/* LinkedIn Request Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          width: 420,
          padding: 32,
        }}
      >
        {/* LinkedIn Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              backgroundColor: "#0077B5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10V17M7 7V7.01M11 17V13C11 12 12 11 13.5 11C15 11 16 12 16 13V17M11 10V17"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 600,
            color: "#1e293b",
            marginBottom: 8,
          }}
        >
          Connection Request Sent
        </div>

        {/* Recipient */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            SC
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1e293b" }}>
              Sarah Chen
            </div>
            <div style={{ fontSize: 14, color: "#64748b" }}>
              CEO at TechStartup
            </div>
          </div>
        </div>

        {/* Message Preview */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>
            Your message:
          </div>
          <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
            "Hi Sarah, I came across TechStartup and was impressed by your
            traction. Would love to connect and learn more about your Series A
            plans."
          </div>
        </div>

        {/* Success indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${checkmarkScale})`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 15, color: "#22c55e", fontWeight: 500 }}>
            Request sent successfully
          </span>
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
        Sending LinkedIn Request
      </div>
    </div>
  );
};
