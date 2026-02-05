import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface FindIndividualsProps {
  delay: number;
}

const individuals = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    company: "NeuralPath AI",
    score: 9.2,
    initials: "SC",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    email: "sarah@neuralpath.ai",
    linkedin: "linkedin.com/in/sarachen",
    phone: "+1 (415) 555-0142",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-Founder",
    company: "FinLedger",
    score: 8.7,
    initials: "MR",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    email: "marcus@finledger.io",
    linkedin: "linkedin.com/in/mrivera",
    phone: "+1 (628) 555-0198",
  },
  {
    name: "Aisha Patel",
    role: "CEO",
    company: "CloudMesh",
    score: 7.4,
    initials: "AP",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    email: "aisha@cloudmesh.dev",
    linkedin: "linkedin.com/in/aishap",
    phone: "+1 (510) 555-0273",
  },
];

export const FindIndividuals: React.FC<FindIndividualsProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {individuals.map((person, index) => {
        const cardDelay = delay + 10 + index * 30;
        const opacity = interpolate(frame - cardDelay, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slideUp = interpolate(frame - cardDelay, [0, 20], [40, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - cardDelay, [0, 20], [0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Contact info reveal
        const emailReveal = interpolate(
          frame - cardDelay - 25,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const linkedinReveal = interpolate(
          frame - cardDelay - 35,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const phoneReveal = interpolate(
          frame - cardDelay - 45,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Checkmark when all info found
        const checkOpacity = interpolate(
          frame - cardDelay - 55,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={person.name}
            style={{
              opacity,
              transform: `translateY(${slideUp}px) scale(${scale})`,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                width: 280,
                border: "2px solid #f1f5f9",
                position: "relative",
              }}
            >
              {/* Match checkmark */}
              {checkOpacity > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    opacity: checkOpacity,
                    transform: `scale(${checkOpacity})`,
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path
                      d="M7 12l3 3 7-7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Person header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: person.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {person.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1e293b",
                    }}
                  >
                    {person.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {person.role}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {person.company}
                  </div>
                </div>
              </div>

              {/* Score badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#ecfdf5",
                  padding: "4px 12px",
                  borderRadius: 12,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#10b981" }}
                >
                  Score: {person.score}
                </span>
              </div>

              {/* Contact info - revealed progressively */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 4,
                  }}
                >
                  Contact Info Found
                </div>

                {/* Email */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: emailReveal,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    <path
                      d="M2 7l10 6 10-6"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                  </svg>
                  <span style={{ fontSize: 13, color: "#475569" }}>
                    {person.email}
                  </span>
                </div>

                {/* LinkedIn */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: linkedinReveal,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#0077b5",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 10,
                      }}
                    >
                      in
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#475569" }}>
                    {person.linkedin}
                  </span>
                </div>

                {/* Phone */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: phoneReveal,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                  </svg>
                  <span style={{ fontSize: 13, color: "#475569" }}>
                    {person.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
