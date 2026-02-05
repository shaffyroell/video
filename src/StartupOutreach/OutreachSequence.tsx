import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface OutreachSequenceProps {
  delay: number;
}

export const OutreachSequence: React.FC<OutreachSequenceProps> = ({
  delay,
}) => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow animations
  const arrow1 = interpolate(frame - delay, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2 = interpolate(frame - delay, [120, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity: containerOpacity }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        {/* Card 1: Profile Visit */}
        <ProfileVisitCard delay={delay + 5} />

        {/* Arrow 1 */}
        <div style={{ display: "flex", alignItems: "center", paddingTop: 120 }}>
          <div style={{ position: "relative", width: 50, height: 4 }}>
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
                width: `${arrow1 * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #0077b5, #00a0dc)",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: arrow1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#0077b5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Connection Invite */}
        <ConnectionInviteCard delay={delay + 65} />

        {/* Arrow 2 */}
        <div style={{ display: "flex", alignItems: "center", paddingTop: 120 }}>
          <div style={{ position: "relative", width: 50, height: 4 }}>
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
                width: `${arrow2 * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00a0dc, #3b82f6)",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: arrow2,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Email */}
        <EmailCard delay={delay + 130} />
      </div>
    </div>
  );
};

/* ---- Profile Visit Card ---- */

const ProfileVisitCard: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame - delay, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const eyeBlink = interpolate(frame - delay - 20, [0, 8, 12, 20], [1, 0.2, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checkOpacity = interpolate(frame - delay, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideUp}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#0077b5",
          color: "white",
          padding: "4px 14px",
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span>1</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <span>Profile Visit</span>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0, 119, 181, 0.12)",
          width: 260,
          border: "2px solid #e8f4f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            SC
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Sarah Chen</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>CEO · NeuralPath AI</div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 14px",
            backgroundColor: "#f0f9ff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ transform: `scaleY(${eyeBlink})` }}
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#0077b5" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#0077b5" strokeWidth="2" fill="#dbeafe" />
            </svg>
            <span style={{ fontSize: 13, color: "#0077b5", fontWeight: 500 }}>Viewing profile</span>
          </div>
          {checkOpacity > 0 && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: checkOpacity }}>
              <circle cx="12" cy="12" r="10" fill="#10b981" />
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---- Connection Invite Card ---- */

const ConnectionInviteCard: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame - delay, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressBar = interpolate(frame - delay - 20, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checkOpacity = interpolate(frame - delay, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideUp}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#0077b5",
          color: "white",
          padding: "4px 14px",
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span>2</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <span>Connection Invite</span>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0, 119, 181, 0.12)",
          width: 260,
          border: "2px solid #e8f4f8",
        }}
      >
        {/* Two avatars connected */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            You
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 20, height: 2, backgroundColor: "#0077b5" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#0077b5" strokeWidth="2" />
              <circle cx="8.5" cy="7" r="4" stroke="#0077b5" strokeWidth="2" />
              <line x1="20" y1="8" x2="20" y2="14" stroke="#0077b5" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="11" x2="23" y2="11" stroke="#0077b5" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div style={{ width: 20, height: 2, backgroundColor: "#0077b5" }} />
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            SC
          </div>
        </div>

        {/* Note */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 14,
            borderLeft: "3px solid #0077b5",
          }}
        >
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Note:</div>
          <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.4 }}>
            "Hi Sarah, would love to connect..."
          </div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>
              {checkOpacity >= 1 ? "Invite Sent!" : "Sending..."}
            </span>
            {checkOpacity > 0 && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: checkOpacity }}>
                <circle cx="12" cy="12" r="10" fill="#10b981" />
                <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <div style={{ height: 6, backgroundColor: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progressBar * 100}%`,
                background: "linear-gradient(90deg, #0077b5, #00a0dc)",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Email Card ---- */

const emailBody = `Hi Sarah,

Loved your insights on AI leadership.

Free for a quick call this week?`;

const EmailCard: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(frame - delay, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typingProgress = interpolate(frame - delay - 20, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleChars = Math.floor(typingProgress * emailBody.length);
  const visibleText = emailBody.slice(0, visibleChars);

  const sendProgress = interpolate(frame - delay, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checkOpacity = interpolate(frame - delay, [95, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideUp}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#0077b5",
          color: "white",
          padding: "4px 14px",
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span>3</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <span>Email Outreach</span>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0, 119, 181, 0.12)",
          width: 260,
          border: "2px solid #e8f4f8",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f1f5f9" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="2" />
              <path d="M2 7l10 6 10-6" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>New Email</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>To: sarah@neuralpath.ai</div>
          </div>
          {checkOpacity > 0 && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ opacity: checkOpacity }}>
              <circle cx="12" cy="12" r="10" fill="#10b981" />
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Body */}
        <div
          style={{
            fontSize: 13,
            color: "#475569",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            minHeight: 80,
          }}
        >
          {visibleText}
          {typingProgress < 1 && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 14,
                backgroundColor: "#3b82f6",
                marginLeft: 1,
                verticalAlign: "text-bottom",
              }}
            />
          )}
        </div>

        {/* Send button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
          <div
            style={{
              backgroundColor: sendProgress >= 1 ? "#10b981" : "#3b82f6",
              color: "white",
              padding: "6px 14px",
              borderRadius: 14,
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {sendProgress >= 1 ? "Sent!" : "Send"}
          </div>
        </div>
      </div>
    </div>
  );
};
