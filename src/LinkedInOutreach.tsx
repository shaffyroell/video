import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { VisitCard } from "./LinkedInOutreach/VisitCard";
import { InviteCard } from "./LinkedInOutreach/InviteCard";
import { EmailOutreachCard } from "./LinkedInOutreach/EmailOutreachCard";

export const linkedInOutreachSchema = z.object({
  backgroundColor: z.string().default("#f0f9ff"),
});

export const LinkedInOutreach: React.FC<
  z.infer<typeof linkedInOutreachSchema>
> = ({ backgroundColor = "#f0f9ff" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Header fade in
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerSlide = interpolate(frame, [0, 25], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connecting line animation between cards
  const line1Progress = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line2Progress = interpolate(frame, [170, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Success message at the end
  const successOpacity = interpolate(frame, [350, 370], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const successScale = interpolate(frame, [350, 370], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        opacity: fadeOut,
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 119, 181, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerSlide}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              backgroundColor: "#0077b5",
              padding: "8px 14px",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
              in
            </span>
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: -0.5,
            }}
          >
            LinkedIn Outreach Sequence
          </span>
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#64748b",
            fontWeight: 400,
          }}
        >
          Automated multi-step outreach workflow
        </div>
      </div>

      {/* Cards container */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 40,
        }}
      >
        {/* Card 1: Profile Visit */}
        <VisitCard delay={20} />

        {/* Connecting arrow 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 180,
          }}
        >
          <div style={{ position: "relative", width: 80, height: 4 }}>
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
                width: `${line1Progress * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #0077b5, #00a0dc)",
                borderRadius: 2,
              }}
            />
            {/* Arrow head */}
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: line1Progress,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#0077b5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Send Invite */}
        <InviteCard delay={90} />

        {/* Connecting arrow 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 180,
          }}
        >
          <div style={{ position: "relative", width: 80, height: 4 }}>
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
                width: `${line2Progress * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00a0dc, #3b82f6)",
                borderRadius: 2,
              }}
            />
            {/* Arrow head */}
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: line2Progress,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Email Outreach */}
        <EmailOutreachCard delay={180} />
      </div>

      {/* Success message at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: successOpacity,
          transform: `scale(${successScale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#10b981",
            padding: "14px 28px",
            borderRadius: 30,
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" />
            <path
              d="M8 12l3 3 5-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
            Outreach Sequence Complete!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
