import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface DraftEmailProps {
  delay: number;
}

const emailContent = `Hey Warren,

Exciting to see you're building a fintech compliance solution in stealth mode. Given your product background at Stripe, I'd be curious to hear more about what you're working on.

I'm partner at XYZ Capital - we invest in (pre) seed founders. Often first check from $250k-1M.

Open for a quick chat next Tuesday at 10am?

Kind regards,`;

export const DraftEmail: React.FC<DraftEmailProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame - delay, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing animation - reveal characters progressively
  const typingProgress = interpolate(frame - delay - 20, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visibleChars = Math.floor(typingProgress * emailContent.length);
  const visibleText = emailContent.slice(0, visibleChars);

  // Highlight the dollar amount
  const highlightAmount = (text: string) => {
    const parts = text.split(/(\$250k-1M)/);
    return parts.map((part, index) => {
      if (part === "$250k-1M") {
        return (
          <span key={index} style={{ color: "#10b981", fontWeight: 500 }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        opacity,
        transform: `translateY(${slideUp}px)`,
        width: 520,
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: "#94a3b8",
          marginBottom: 12,
        }}
      >
        Draft email
      </div>
      <div
        style={{
          fontSize: 15,
          color: "#374151",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
        }}
      >
        {highlightAmount(visibleText)}
        {typingProgress < 1 && (
          <span
            style={{
              borderRight: "2px solid #3b82f6",
              marginLeft: 1,
              animation: "blink 1s infinite",
            }}
          />
        )}
      </div>
    </div>
  );
};
