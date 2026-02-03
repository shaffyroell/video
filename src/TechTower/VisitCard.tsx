import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface VisitCardProps {
  delay: number;
}

export const VisitCard: React.FC<VisitCardProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame - delay, [0, 25], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 25], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Eye icon animation - blink effect
  const eyeScale = interpolate(
    frame - delay,
    [30, 35, 40, 45],
    [1, 1.2, 1, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Checkmark animation
  const checkOpacity = interpolate(frame - delay, [50, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideUp}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          backgroundColor: "#0077b5",
          color: "white",
          padding: "6px 16px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>1</span>
        <span style={{ opacity: 0.8 }}>|</span>
        <span>Profile Visit</span>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 8px 32px rgba(0, 119, 181, 0.15)",
          width: 280,
          border: "2px solid #e8f4f8",
        }}
      >
        {/* Header with LinkedIn branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#0077b5",
              padding: "6px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
              in
            </span>
            <span style={{ color: "white", fontSize: 12 }}>LinkedIn</span>
          </div>
          <div
            style={{
              transform: `scale(${eyeScale})`,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                stroke="#0077b5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="#0077b5"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Profile preview */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 18,
              border: "2px solid white",
              boxShadow: "0 4px 12px rgba(0, 119, 181, 0.3)",
            }}
          >
            SM
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 2,
              }}
            >
              Sarah Martinez
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 2 }}>
              VP of Engineering
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>TechCorp Inc.</div>
          </div>
        </div>

        {/* Action indicator */}
        <div
          style={{
            marginTop: 16,
            padding: "10px 14px",
            backgroundColor: "#f0f9ff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#0077b5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>
            <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 500 }}>
              Viewing profile...
            </span>
          </div>
          <div style={{ opacity: checkOpacity }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#10b981" />
              <path
                d="M8 12l3 3 5-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
