import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EmailCardProps {
  icon: "email" | "lightning" | "attachment" | "linkedin" | "whatsapp";
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" />
          <path d="M2 7L12 13L22 7" stroke="#94a3b8" strokeWidth="2" />
        </svg>
      );
    }
    if (icon === "lightning") {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </svg>
      );
    }
    if (icon === "linkedin") {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#0077B5" />
          <path
            d="M7 10V17M7 7V7.01M11 17V13C11 12 12 11 13.5 11C15 11 16 12 16 13V17M11 10V17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (icon === "whatsapp") {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="10" fill="#25D366" />
          <path
            d="M17 14.5C17 14.5 15.5 15.5 15 15.5C14.5 15.5 14 15 13.5 14.5C13 14 12.5 13.5 12 13.5C11.5 13.5 10.5 14 10 14.5C9.5 15 9 15.5 8.5 15.5C8 15.5 7 14.5 7 14.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 8.5C8.5 8 9.5 7.5 10 8C10.5 8.5 10 9.5 10 10C10 10.5 10.5 11 11 11.5C11.5 12 12 12.5 12.5 12.5C13 12.5 14 12 14.5 11.5C15 11 15.5 10.5 16 10.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 17L6 20L9 19"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" />
        <path d="M2 7L12 13L22 7" stroke="#94a3b8" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        marginBottom: 20,
        transform: `translateX(${slideIn}px)`,
        opacity: opacity * fadeOutOpacity,
        width: 480,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ marginTop: 4 }}>{renderIcon()}</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1e293b",
              marginBottom: 8,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {description}
          </div>
          <div style={{ fontSize: 14, color: "#94a3b8" }}>To: {to}</div>
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
