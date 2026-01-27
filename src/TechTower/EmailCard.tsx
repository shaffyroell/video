import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EmailCardProps {
  icon: "email" | "lightning" | "attachment";
  title: string;
  description: string;
  to: string;
  attachment?: string;
  delay: number;
  fadeOut?: boolean;
  fadeOutStart?: number;
}

export const EmailCard: React.FC<EmailCardProps> = ({
  icon,
  title,
  description,
  to,
  attachment,
  delay,
  fadeOut = false,
  fadeOutStart = 180,
}) => {
  const frame = useCurrentFrame();

  const slideIn = interpolate(frame - delay, [0, 20], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = fadeOut
    ? interpolate(frame, [fadeOutStart, fadeOutStart + 30], [1, 0.3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const renderIcon = () => {
    if (icon === "email") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" />
          <path d="M2 7L12 13L22 7" stroke="#94a3b8" strokeWidth="2" />
        </svg>
      );
    }
    if (icon === "lightning") {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" />
        <path d="M2 7L12 13L22 7" stroke="#94a3b8" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        marginBottom: 16,
        transform: `translateX(${slideIn}px)`,
        opacity: opacity * fadeOutOpacity,
        width: 380,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ marginTop: 2 }}>{renderIcon()}</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#3b82f6",
              marginBottom: 6,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.5,
              marginBottom: 8,
            }}
          >
            {description}
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>To: {to}</div>
          {attachment && (
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#f8fafc",
                padding: "8px 12px",
                borderRadius: 6,
                width: "fit-content",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  fill="#f1f5f9"
                />
              </svg>
              <span style={{ fontSize: 13, color: "#64748b" }}>{attachment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
