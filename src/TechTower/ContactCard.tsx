import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface ContactCardProps {
  delay: number;
}

export const ContactCard: React.FC<ContactCardProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideDown = interpolate(frame - delay, [0, 20], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideDown}px)`,
      }}
    >
      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            backgroundColor: "#e0e7ff",
            color: "#4f46e5",
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Draft
        </div>
        <div
          style={{
            backgroundColor: "#0077b5",
            width: 36,
            height: 36,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>in</span>
        </div>
        <div
          style={{
            backgroundColor: "#e0e7ff",
            width: 36,
            height: 36,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4f46e5" strokeWidth="2" />
            <path d="M2 7L12 13L22 7" stroke="#4f46e5" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Contact card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          width: 260,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Avatar placeholder */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            WM
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              Warren Michaels
            </div>
            <div style={{ fontSize: 14, color: "#64748b" }}>Acme</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>Acme</div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" />
              <path d="M2 7L12 13L22 7" stroke="#94a3b8" strokeWidth="2" />
            </svg>
            <span style={{ fontSize: 14, color: "#64748b" }}>warren@acme.com</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="2" y="9" width="4" height="12" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="4" cy="4" r="2" stroke="#94a3b8" strokeWidth="2" />
            </svg>
            <span style={{ fontSize: 14, color: "#64748b" }}>linkedin.com/in/warrenmichaells</span>
          </div>
        </div>
      </div>
    </div>
  );
};
