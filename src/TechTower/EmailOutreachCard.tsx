import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EmailOutreachCardProps {
  delay: number;
}

const emailSubject = "Quick intro - saw your recent post";
const emailBody = `Hi Sarah,

I noticed your insights on engineering leadership - really resonated with our team's approach.

Would love to connect and share how we're solving similar challenges at scale.

Free for a 15-min call this week?`;

export const EmailOutreachCard: React.FC<EmailOutreachCardProps> = ({
  delay,
}) => {
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

  // Typing animation for email body
  const typingProgress = interpolate(frame - delay - 30, [0, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visibleChars = Math.floor(typingProgress * emailBody.length);
  const visibleText = emailBody.slice(0, visibleChars);

  // Send animation
  const sendProgress = interpolate(frame - delay, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Paper plane fly animation
  const planeFly = interpolate(frame - delay, [160, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planeOpacity = interpolate(frame - delay, [160, 175, 180], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final checkmark
  const checkOpacity = interpolate(frame - delay, [175, 185], [0, 1], {
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
        <span>3</span>
        <span style={{ opacity: 0.8 }}>|</span>
        <span>Email Outreach</span>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 8px 32px rgba(0, 119, 181, 0.15)",
          width: 360,
          border: "2px solid #e8f4f8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Flying paper plane animation */}
        {sendProgress > 0 && planeOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20 + planeFly,
              opacity: planeOpacity,
              transform: `rotate(-15deg)`,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="#0077b5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#e0f2fe"
              />
            </svg>
          </div>
        )}

        {/* Email header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M2 7l10 6 10-6" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
              New Email
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              To: sarah.m@techcorp.com
            </div>
          </div>
          {checkOpacity > 0 && (
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
          )}
        </div>

        {/* Subject line */}
        <div
          style={{
            marginBottom: 12,
            padding: "10px 14px",
            backgroundColor: "#f8fafc",
            borderRadius: 8,
          }}
        >
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Subject: </span>
          <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 500 }}>
            {emailSubject}
          </span>
        </div>

        {/* Email body with typing effect */}
        <div
          style={{
            fontSize: 14,
            color: "#475569",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            minHeight: 160,
            padding: "8px 0",
          }}
        >
          {visibleText}
          {typingProgress < 1 && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 16,
                backgroundColor: "#3b82f6",
                marginLeft: 2,
                verticalAlign: "text-bottom",
              }}
            />
          )}
        </div>

        {/* Send button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <button
            style={{
              backgroundColor: sendProgress >= 1 ? "#10b981" : "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {sendProgress >= 1 ? (
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
                Sent!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
