import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { EmailCard } from "./TechTower/EmailCard";
import { StageText } from "./TechTower/StageText";
import { DealCreated } from "./TechTower/DealCreated";
import { CRMRecord } from "./TechTower/CRMRecord";
import { VisitCard } from "./TechTower/VisitCard";
import { InviteCard } from "./TechTower/InviteCard";
import { EmailOutreachCard } from "./TechTower/EmailOutreachCard";

export const techTowerSchema = z.object({
  backgroundColor: z.string().default("#f8fafc"),
});

const stages = [
  "Sourcing system",
  "Analyzing signals",
  "Scoring fit with thesis",
  "Sharing result with team",
  "Finding contact info",
];

// Scene timing (in frames at 30fps)
const SCENE_1_END = 300; // First 5 stages with email cards
const SCENE_2_END = 450; // Deal created + CRM record

export const TechTower: React.FC<z.infer<typeof techTowerSchema>> = ({
  backgroundColor = "#f8fafc",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Calculate stage duration for first scene
  const stageDuration = Math.floor(SCENE_1_END / stages.length);

  // Header fade in
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Determine fade state for email cards
  const currentStage = Math.floor(frame / stageDuration);
  const shouldFadeCards = currentStage >= 2;

  // Scene 1 fade out
  const scene1Opacity = interpolate(
    frame,
    [SCENE_1_END - 30, SCENE_1_END],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 2 fade in/out
  const scene2Opacity = interpolate(
    frame,
    [SCENE_1_END, SCENE_1_END + 20, SCENE_2_END - 30, SCENE_2_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 3 fade in and final fade out
  const scene3Opacity = interpolate(
    frame,
    [SCENE_2_END, SCENE_2_END + 20, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header - always visible */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#64748b",
            fontWeight: 400,
            maxWidth: 700,
          }}
        >
          Forward emails or set up custom automated signals to track
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#1e293b",
            letterSpacing: -0.5,
          }}
        >
          TechTower
        </div>
      </div>

      {/* Scene 1: Email cards + Stage text */}
      {frame < SCENE_1_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 80,
            right: 80,
            bottom: 80,
            display: "flex",
            justifyContent: "space-between",
            opacity: scene1Opacity,
          }}
        >
          {/* Left side - Email cards */}
          <div style={{ flex: 1, maxWidth: 450 }}>
            <EmailCard
              icon="email"
              title="FWD: Founder Linkedin"
              description="Hey – have a look at this founder's Linkedin, think they're raising soon"
              to="deals@your-workflow.ai"
              delay={20}
              fadeOut={shouldFadeCards}
              fadeOutStart={stageDuration * 2}
            />
            <EmailCard
              icon="lightning"
              title="Raised pre-seed round 12m ago"
              description="Signal detected&#10;Pre-Seed round raised · 12 months ago&#10;· may raise soon"
              to="deals@your-workflow.ai"
              delay={35}
              fadeOut={shouldFadeCards}
              fadeOutStart={stageDuration * 2}
            />
            <EmailCard
              icon="email"
              title="FWD: Pitch Deck"
              description="Received this deck, let me know if I should get in touch with the founder."
              to="deals@your-workflow.ai"
              attachment="PitchDeck.pdf"
              delay={50}
              fadeOut={shouldFadeCards}
              fadeOutStart={stageDuration * 2}
            />
          </div>

          {/* Right side - Stage text */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StageText stages={stages} stageDuration={stageDuration} />
          </div>
        </div>
      )}

      {/* Scene 2: Deal Created + CRM Record */}
      {frame >= SCENE_1_END - 20 && frame < SCENE_2_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 80,
            right: 80,
            bottom: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 60,
            opacity: scene2Opacity,
          }}
        >
          <DealCreated delay={SCENE_1_END} />
          <CRMRecord delay={SCENE_1_END + 10} />
        </div>
      )}

      {/* Scene 3: LinkedIn Outreach Sequence (Visit → Invite → Email) */}
      {frame >= SCENE_2_END - 20 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            bottom: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: scene3Opacity,
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 30,
              opacity: interpolate(frame - SCENE_2_END, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                backgroundColor: "#0077b5",
                padding: "6px 12px",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
                in
              </span>
            </div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              LinkedIn Outreach Sequence
            </span>
          </div>

          {/* Cards container */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            {/* Card 1: Profile Visit */}
            <VisitCard delay={SCENE_2_END + 10} />

            {/* Connecting arrow 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: 160,
              }}
            >
              <div style={{ position: "relative", width: 60, height: 4 }}>
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
                    width: `${interpolate(frame - SCENE_2_END, [60, 90], [0, 100], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}%`,
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
                    opacity: interpolate(frame - SCENE_2_END, [85, 90], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
            <InviteCard delay={SCENE_2_END + 70} />

            {/* Connecting arrow 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: 160,
              }}
            >
              <div style={{ position: "relative", width: 60, height: 4 }}>
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
                    width: `${interpolate(frame - SCENE_2_END, [140, 170], [0, 100], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}%`,
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
                    opacity: interpolate(frame - SCENE_2_END, [165, 170], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
            <EmailOutreachCard delay={SCENE_2_END + 150} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
