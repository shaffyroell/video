import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { z } from "zod";
import { EmailCard } from "./TechTower/EmailCard";
import { StageText } from "./TechTower/StageText";
import { DealCreated } from "./TechTower/DealCreated";
import { CRMRecord } from "./TechTower/CRMRecord";
import { ContactCard } from "./TechTower/ContactCard";
import { DraftEmail } from "./TechTower/DraftEmail";

export const techTowerSchema = z.object({
  backgroundColor: z.string().default("#f8fafc"),
});

const stages = [
  "Analyzing signals",
  "Scoring fit with thesis",
  "Sharing result with team",
  "Finding contact info",
];

// Scene timing (in frames at 30fps)
// Cards: 1 sec (30 frames) apart - delays 10, 40, 70, 100
// Last card finishes animating around frame 120
const TEXT_1_START = 130; // First text appears after cards
const TEXT_1_END = 190; // First text stays 2 sec (60 frames)
const TEXT_2_END = 250; // Second text stays 2 sec (60 frames)
const SYSTEM_APPEAR = 260; // System appears after texts
const SCENE_1_END = 380; // End of scene 1 (stages cycle)
const SCENE_2_END = 530; // Deal created + CRM record

export const TechTower: React.FC<z.infer<typeof techTowerSchema>> = ({
  backgroundColor = "#f8fafc",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Calculate stage duration for the system animation
  const stageDuration = Math.floor((SCENE_1_END - SYSTEM_APPEAR) / stages.length);

  // Determine fade state for email cards
  const shouldFadeCards = frame >= SYSTEM_APPEAR;

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

  // Text above cards animations (appear after cards, 2 sec each)
  const text1Opacity = interpolate(
    frame,
    [TEXT_1_START, TEXT_1_START + 15, TEXT_1_END - 15, TEXT_1_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const text2Opacity = interpolate(
    frame,
    [TEXT_1_END, TEXT_1_END + 15, TEXT_2_END - 15, TEXT_2_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // System container animation
  const systemOpacity = interpolate(
    frame,
    [SYSTEM_APPEAR, SYSTEM_APPEAR + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const systemScale = interpolate(
    frame,
    [SYSTEM_APPEAR, SYSTEM_APPEAR + 25],
    [0.9, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Text above system
  const systemTextOpacity = interpolate(
    frame,
    [SYSTEM_APPEAR + 10, SYSTEM_APPEAR + 25],
    [0, 1],
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
      {/* Header - TechTower logo only */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
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
            top: 100,
            left: 80,
            right: 80,
            bottom: 40,
            display: "flex",
            flexDirection: "column",
            opacity: scene1Opacity,
          }}
        >
          {/* Animated text above cards */}
          <div
            style={{
              height: 60,
              marginBottom: 20,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                opacity: text1Opacity,
                fontSize: 28,
                color: "#1e293b",
                fontWeight: 500,
              }}
            >
              Signals are pushed to the sourcing system
            </div>
            <div
              style={{
                position: "absolute",
                opacity: text2Opacity,
                fontSize: 28,
                color: "#1e293b",
                fontWeight: 500,
              }}
            >
              Set up automated tracking signals
            </div>
          </div>

          {/* Main content area */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left side - Email cards */}
            <div style={{ flex: 1, maxWidth: 520 }}>
              <EmailCard
                icon="whatsapp"
                title="FWD: Founder Linkedin"
                description="Hey – have a look at this founder's Linkedin, think they're raising soon"
                to="deals@your-workflow.ai"
                delay={10}
                fadeOut={shouldFadeCards}
                fadeOutStart={SYSTEM_APPEAR}
              />
              <EmailCard
                icon="lightning"
                title="Raised pre-seed round 12m ago"
                description="Signal detected · Pre-Seed round raised · 12 months ago · may raise soon"
                to="deals@your-workflow.ai"
                delay={40}
                fadeOut={shouldFadeCards}
                fadeOutStart={SYSTEM_APPEAR}
              />
              <EmailCard
                icon="email"
                title="FWD: Pitch Deck"
                description="Received this deck, let me know if I should get in touch with the founder."
                to="deals@your-workflow.ai"
                attachment="PitchDeck.pdf"
                delay={70}
                fadeOut={shouldFadeCards}
                fadeOutStart={SYSTEM_APPEAR}
              />
              <EmailCard
                icon="linkedin"
                title="LinkedIn invite received from founder"
                description="Connection request · Sarah Chen, CEO at TechStartup · 2nd degree connection"
                to="deals@your-workflow.ai"
                delay={100}
                fadeOut={shouldFadeCards}
                fadeOutStart={SYSTEM_APPEAR}
              />
            </div>

            {/* Right side - Stage text (appears after cards) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: systemOpacity,
                transform: `scale(${systemScale})`,
              }}
            >
              {/* Text above system */}
              <div
                style={{
                  marginBottom: 24,
                  opacity: systemTextOpacity,
                  fontSize: 20,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                Custom workflow to analyze fit
              </div>
              <StageText stages={stages} stageDuration={stageDuration} startFrame={SYSTEM_APPEAR} />
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
