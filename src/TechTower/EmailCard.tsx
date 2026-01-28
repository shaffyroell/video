import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface EmailCardProps {
  icon: "email" | "lightning" | "attachment" | "linkedin" | "message";
  title: string;
  description: string;
  to: string;
  attachment?: string;
  delay: number;
  fadeOut?: boolean;
  fadeOutStart?: number;
  slideOut?: boolean;
  slideOutStart?: number;
  slideOutIndex?: number;
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
  slideOut = false,
  slideOutStart = 260,
  slideOutIndex = 0,
}) => {
  const frame = useCurrentFrame();

  // Stagger the slide out - each card slides 15 frames after the previous
  const cardSlideOutStart = slideOutStart + slideOutIndex * 15;

  const slideIn = interpolate(frame - delay, [0, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slide out to the right (into the sourcing system)
  const slideOutX = slideOut
    ? interpolate(frame, [cardSlideOutStart, cardSlideOutStart + 25], [0, 600], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out as card slides away
  const slideOutOpacity = slideOut
    ? interpolate(frame, [cardSlideOutStart, cardSlideOutStart + 25], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

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
    if (icon === "message") {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 11.5C21 16.19 16.97 20 12 20C10.82 20 9.69 19.82 8.65 19.48L3 21L4.52 15.35C4.18 14.31 4 13.18 4 12C4 7.03 7.81 3 12.5 3C17.19 3 21 6.81 21 11.5Z"
            fill="#22C55E"
            stroke="#16A34A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10H16M8 14H13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
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
        transform: `translateX(${slideIn + slideOutX}px)`,
        opacity: opacity * fadeOutOpacity * slideOutOpacity,
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
