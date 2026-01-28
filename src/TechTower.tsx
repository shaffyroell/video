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
import { ContactCard } from "./TechTower/ContactCard";
import { DraftEmail } from "./TechTower/DraftEmail";
import { AnimatedText } from "./TechTower/AnimatedText";

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
// New Scene 1 timing:
// - Cards animate in one by one: 0-90 (cards at 10, 30, 50, 70 delay)
// - Text 1 appears: 90+ for 2 seconds
// - Text 2 appears: after text 1 for 2 seconds
// - Sourcing system appears after texts
const CARDS_SETTLE = 90; // Cards finish animating
const TEXT_1_START = CARDS_SETTLE;
const TEXT_1_DURATION = 60; // 2 seconds
const TEXT_2_START = TEXT_1_START + TEXT_1_DURATION + 15; // Small gap after text 1 fades
const TEXT_2_DURATION = 60; // 2 seconds
const SOURCING_START = TEXT_2_START + TEXT_2_DURATION + 15; // After text 2 fades

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

      {/* Scene 1: Email cards + Animated texts + Stage text */}
      {frame < SCENE_1_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 80,
            right: 80,
            bottom: 80,
            display: "flex",
            flexDirection: "column",
            opacity: scene1Opacity,
          }}
        >
          {/* Animated text overlay above cards */}
          <div
            style={{
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <AnimatedText
              text="Workflow for inbound and outbound sourcing"
              startFrame={TEXT_1_START}
              duration={TEXT_1_DURATION}
            />
            <AnimatedText
              text="All signals are pushed to the system"
              startFrame={TEXT_2_START}
              duration={TEXT_2_DURATION}
            />
          </div>

          {/* Main content area */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Left side - Email cards (4 cards, coming in one by one) */}
            <div style={{ flex: 1, maxWidth: 450 }}>
              <EmailCard
                icon="email"
                title="FWD: Founder Linkedin"
                description="Hey – have a look at this founder's Linkedin, think they're raising soon"
                to="deals@your-workflow.ai"
                delay={10}
                fadeOut={shouldFadeCards}
                fadeOutStart={stageDuration * 2}
              />
              <EmailCard
                icon="lightning"
                title="Raised pre-seed round 12m ago"
                description="Signal detected · Pre-Seed round raised · 12 months ago · may raise soon"
                to="deals@your-workflow.ai"
                delay={30}
                fadeOut={shouldFadeCards}
                fadeOutStart={stageDuration * 2}
              />
              <EmailCard
                icon="message"
                title="WhatsApp: Intro to founder"
                description="Hey, wanted to connect you with Sarah from TechCo – she's building something interesting"
                to="deals@your-workflow.ai"
                delay={50}
                fadeOut={shouldFadeCards}
                fadeOutStart={stageDuration * 2}
              />
              <EmailCard
                icon="email"
                title="FWD: Pitch Deck"
                description="Received this deck, let me know if I should get in touch with the founder."
                to="deals@your-workflow.ai"
                attachment="PitchDeck.pdf"
                delay={70}
                fadeOut={shouldFadeCards}
                fadeOutStart={stageDuration * 2}
              />
            </div>

            {/* Right side - Stage text (appears after text animations) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: interpolate(
                  frame,
                  [SOURCING_START, SOURCING_START + 20],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                ),
              }}
            >
              <StageText
                stages={stages}
                stageDuration={stageDuration}
                startDelay={SOURCING_START}
              />
            </div>
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

      {/* Scene 3: Full view with Contact Card and Draft Email */}
      {frame >= SCENE_2_END - 20 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 60,
            right: 60,
            bottom: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 30,
            opacity: scene3Opacity,
          }}
        >
          {/* Left column: Deal Created + Contact Card + Draft Email */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <DealCreated delay={SCENE_2_END} />
              <ContactCard delay={SCENE_2_END + 15} />
            </div>
            <DraftEmail delay={SCENE_2_END + 30} />
          </div>

          {/* Right column: CRM Record */}
          <div>
            <CRMRecord delay={SCENE_2_END + 5} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
