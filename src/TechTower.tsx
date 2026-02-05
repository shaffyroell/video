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
import { StartupEvaluated } from "./TechTower/StartupEvaluated";
import { MemoCreated } from "./TechTower/MemoCreated";
import { VisitCard } from "./TechTower/VisitCard";
import { InviteCard } from "./TechTower/InviteCard";
import { EmailOutreachCard } from "./TechTower/EmailOutreachCard";
import { DealCreated } from "./TechTower/DealCreated";
import { CRMRecord } from "./TechTower/CRMRecord";

export const techTowerSchema = z.object({
  backgroundColor: z.string().default("#f8fafc"),
});

const stages = [
  "Sourcing system",
  "Analyzing signals",
  "Scoring fit with thesis",
];

// Scene timing (in frames at 30fps)
const SCENE_1_END = 200; // Signals identify startups
const SCENE_2_END = 380; // Startup evaluated
const SCENE_3_END = 540; // Memo created
const SCENE_4_END = 720; // Outreach prepared
// Scene 5 runs from 720 to end (900)

const steps = [
  "Signals",
  "Evaluated",
  "Memo",
  "Outreach",
  "CRM",
];

export const TechTower: React.FC<z.infer<typeof techTowerSchema>> = ({
  backgroundColor = "#f8fafc",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const stageDuration = Math.floor(SCENE_1_END / stages.length);

  // Header fade in
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Email card fade
  const currentStage = Math.floor(frame / stageDuration);
  const shouldFadeCards = currentStage >= 2;

  // Step indicator
  const currentStep =
    frame < SCENE_1_END ? 0
    : frame < SCENE_2_END ? 1
    : frame < SCENE_3_END ? 2
    : frame < SCENE_4_END ? 3
    : 4;

  // Scene opacities
  const scene1Opacity = interpolate(
    frame,
    [0, 20, SCENE_1_END - 30, SCENE_1_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scene2Opacity = interpolate(
    frame,
    [SCENE_1_END, SCENE_1_END + 20, SCENE_2_END - 30, SCENE_2_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scene3Opacity = interpolate(
    frame,
    [SCENE_2_END, SCENE_2_END + 20, SCENE_3_END - 30, SCENE_3_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scene4Opacity = interpolate(
    frame,
    [SCENE_3_END, SCENE_3_END + 20, SCENE_4_END - 30, SCENE_4_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scene5Opacity = interpolate(
    frame,
    [SCENE_4_END, SCENE_4_END + 20, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 35,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: -0.5,
          }}
        >
          TechTower
        </div>

        {/* Step indicator pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "white",
            padding: "8px 16px",
            borderRadius: 24,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
          }}
        >
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isPast = i < currentStep;
            return (
              <React.Fragment key={step}>
                {i > 0 && (
                  <div
                    style={{
                      width: 20,
                      height: 3,
                      backgroundColor: isPast ? "#10b981" : "#e2e8f0",
                      borderRadius: 2,
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 18,
                    backgroundColor: isActive
                      ? "#3b82f6"
                      : isPast
                        ? "#ecfdf5"
                        : "#f1f5f9",
                    color: isActive
                      ? "white"
                      : isPast
                        ? "#10b981"
                        : "#94a3b8",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {isPast ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                  <span>{step}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Scene 1: Signals identify startups */}
      {frame < SCENE_1_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 80,
            right: 80,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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

      {/* Scene 2: Startup evaluated */}
      {frame >= SCENE_1_END - 20 && frame < SCENE_2_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 40,
            right: 40,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene2Opacity,
          }}
        >
          <StartupEvaluated delay={SCENE_1_END + 5} />
        </div>
      )}

      {/* Scene 3: Memo created */}
      {frame >= SCENE_2_END - 20 && frame < SCENE_3_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 40,
            right: 40,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene3Opacity,
          }}
        >
          <MemoCreated delay={SCENE_2_END + 5} />
        </div>
      )}

      {/* Scene 4: Outreach prepared (LinkedIn Visit → Invite → Email) */}
      {frame >= SCENE_3_END - 20 && frame < SCENE_4_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene4Opacity,
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              opacity: interpolate(frame - SCENE_3_END, [0, 20], [0, 1], {
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
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>in</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#1e293b" }}>
              Personalized Outreach Sequence
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
            <VisitCard delay={SCENE_3_END + 10} />

            {/* Arrow 1 */}
            <div style={{ display: "flex", alignItems: "center", paddingTop: 140 }}>
              <div style={{ position: "relative", width: 60, height: 4 }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#e2e8f0", borderRadius: 2 }} />
                <div
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: `${interpolate(frame - SCENE_3_END, [60, 90], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                    height: "100%", background: "linear-gradient(90deg, #0077b5, #00a0dc)", borderRadius: 2,
                  }}
                />
                <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", opacity: interpolate(frame - SCENE_3_END, [85, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#0077b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <InviteCard delay={SCENE_3_END + 70} />

            {/* Arrow 2 */}
            <div style={{ display: "flex", alignItems: "center", paddingTop: 140 }}>
              <div style={{ position: "relative", width: 60, height: 4 }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#e2e8f0", borderRadius: 2 }} />
                <div
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: `${interpolate(frame - SCENE_3_END, [140, 170], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                    height: "100%", background: "linear-gradient(90deg, #00a0dc, #3b82f6)", borderRadius: 2,
                  }}
                />
                <div style={{ position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)", opacity: interpolate(frame - SCENE_3_END, [165, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <EmailOutreachCard delay={SCENE_3_END + 150} />
          </div>
        </div>
      )}

      {/* Scene 5: CRM updated */}
      {frame >= SCENE_4_END - 20 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 80,
            right: 80,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            opacity: scene5Opacity,
          }}
        >
          <DealCreated delay={SCENE_4_END} />
          <CRMRecord delay={SCENE_4_END + 10} />
        </div>
      )}
    </AbsoluteFill>
  );
};
