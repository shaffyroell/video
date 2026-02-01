import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface OutreachEmailProps {
  delay: number;
}

export const OutreachEmail: React.FC<OutreachEmailProps> = ({ delay }) => {
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

  const sendingProgress = interpolate(frame - delay, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
      {/* Email Compose Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          width: 520,
          overflow: "hidden",
        }}
      >
        {/* Email Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#e0e7ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="#4f46e5"
                strokeWidth="2"
              />
              <path d="M2 7L12 13L22 7" stroke="#4f46e5" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>
            New Email
          </div>
        </div>

        {/* Email Fields */}
        <div style={{ padding: 24 }}>
          {/* To Field */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              paddingBottom: 16,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                width: 60,
                fontSize: 14,
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              To:
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 14,
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  SC
                </div>
                sarah@techstartup.com
              </div>
            </div>
          </div>

          {/* Subject Field */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                width: 60,
                fontSize: 14,
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              Subject:
            </div>
            <div style={{ fontSize: 15, color: "#1e293b", fontWeight: 500 }}>
              TechTower Capital - Series A Interest
            </div>
          </div>

          {/* Email Body */}
          <div
            style={{
              fontSize: 15,
              color: "#475569",
              lineHeight: 1.7,
            }}
          >
            <p style={{ margin: 0, marginBottom: 16 }}>Hi Sarah,</p>
            <p style={{ margin: 0, marginBottom: 16 }}>
              I hope this email finds you well. I'm reaching out from TechTower
              Capital regarding your upcoming Series A round.
            </p>
            <p style={{ margin: 0, marginBottom: 16 }}>
              We've been following TechStartup's impressive growth and would
              love to schedule a call to discuss...
            </p>
            <p style={{ margin: 0, color: "#94a3b8" }}>Best regards,</p>
          </div>
        </div>

        {/* Send Button Area */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              backgroundColor: sendingProgress >= 1 ? "#22c55e" : "#4f46e5",
              color: "white",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {sendingProgress >= 1 ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sent
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Send
              </>
            )}
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
        Sending Outreach Email
      </div>
    </div>
  );
};
