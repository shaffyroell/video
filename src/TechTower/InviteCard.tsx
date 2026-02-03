import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface InviteCardProps {
  delay: number;
}

export const InviteCard: React.FC<InviteCardProps> = ({ delay }) => {
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

  // Connection animation
  const connectionProgress = interpolate(frame - delay, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Plus icon rotation
  const plusRotation = interpolate(frame - delay, [35, 50], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button pulse
  const buttonScale = interpolate(
    frame - delay,
    [25, 35, 45],
    [1, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Checkmark animation
  const checkOpacity = interpolate(frame - delay, [70, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sent text animation
  const sentOpacity = interpolate(frame - delay, [75, 85], [0, 1], {
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
        <span>2</span>
        <span style={{ opacity: 0.8 }}>|</span>
        <span>Send Invite</span>
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
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>
            Connection Request
          </div>
          <div
            style={{
              backgroundColor: "#0077b5",
              width: 32,
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
              in
            </span>
          </div>
        </div>

        {/* Connection visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 16,
            padding: "12px 0",
          }}
        >
          {/* Your avatar */}
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
              fontWeight: 600,
              fontSize: 13,
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            You
          </div>

          {/* Connection line */}
          <div style={{ position: "relative", width: 60, height: 4 }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#e2e8f0",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${connectionProgress * 100}%`,
                height: "100%",
                backgroundColor: "#0077b5",
                borderRadius: 2,
                transition: "width 0.1s ease-out",
              }}
            />
            {/* Plus icon in the middle */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${plusRotation}deg)`,
                width: 24,
                height: 24,
                backgroundColor: connectionProgress >= 1 ? "#10b981" : "#0077b5",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {connectionProgress >= 1 ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Their avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 13,
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            SM
          </div>
        </div>

        {/* Invite message preview */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 14,
            borderLeft: "3px solid #0077b5",
          }}
        >
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>
            Connection note:
          </div>
          <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.4 }}>
            "Hi Sarah, would love to connect..."
          </div>
        </div>

        {/* Send button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              backgroundColor: connectionProgress >= 1 ? "#10b981" : "#0077b5",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: `scale(${buttonScale})`,
            }}
          >
            {connectionProgress >= 1 ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ opacity: sentOpacity }}>Invite Sent!</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle cx="8.5" cy="7" r="4" stroke="white" strokeWidth="2" />
                  <path d="M20 8v6M17 11h6" stroke="white" strokeWidth="2" />
                </svg>
                Connect
              </>
            )}
          </button>
          <div style={{ opacity: checkOpacity }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
