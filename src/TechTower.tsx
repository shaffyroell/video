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
import { LinkedInProfile } from "./TechTower/LinkedInProfile";
import { LinkedInRequest } from "./TechTower/LinkedInRequest";
import { OutreachEmail } from "./TechTower/OutreachEmail";

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
// Cards: 1.5 sec (45 frames) apart - delays 10, 55, 100, 145
// Last card finishes animating around frame 175
const TEXT_1_START = 185; // First text appears after cards
const TEXT_1_END = 245; // First text stays 2 sec (60 frames)
const TEXT_2_END = 335; // Second text stays 3 sec (90 frames - 1 sec longer)
const SYSTEM_APPEAR = 345; // System appears after texts
const CARDS_SLIDE_OUT = 355; // Cards start sliding into system
const SCENE_1_END = 480; // End of scene 1 (stages cycle)
const SCENE_2_END = 570; // Deal created + CRM record
const SCENE_3_END = 660; // LinkedIn profile view
const SCENE_4_END = 750; // LinkedIn request
const SCENE_5_END = 840; // Outreach email

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

  // Scene 2 fade in/out (Deal Created + CRM Record)
  const scene2Opacity = interpolate(
    frame,
    [SCENE_1_END, SCENE_1_END + 20, SCENE_2_END - 30, SCENE_2_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 3 fade in/out (LinkedIn Profile)
  const scene3Opacity = interpolate(
    frame,
    [SCENE_2_END, SCENE_2_END + 20, SCENE_3_END - 30, SCENE_3_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 4 fade in/out (LinkedIn Request)
  const scene4Opacity = interpolate(
    frame,
    [SCENE_3_END, SCENE_3_END + 20, SCENE_4_END - 30, SCENE_4_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 5 fade in/out (Outreach Email)
  const scene5Opacity = interpolate(
    frame,
    [SCENE_4_END, SCENE_4_END + 20, SCENE_5_END - 30, SCENE_5_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Scene 6 fade in and final fade out (Full view)
  const scene6Opacity = interpolate(
    frame,
    [SCENE_5_END, SCENE_5_END + 20, durationInFrames - 30, durationInFrames],
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
                icon="message"
                title="FWD: Founder Linkedin"
                description="Hey – have a look at this founder's Linkedin, think they're raising soon"
                to="deals@your-workflow.ai"
                delay={10}
                slideOut={shouldFadeCards}
                slideOutStart={CARDS_SLIDE_OUT}
                slideOutIndex={0}
              />
              <EmailCard
                icon="lightning"
                title="Raised pre-seed round 12m ago"
                description="Signal detected · Pre-Seed round raised · 12 months ago · may raise soon"
                to="deals@your-workflow.ai"
                delay={55}
                slideOut={shouldFadeCards}
                slideOutStart={CARDS_SLIDE_OUT}
                slideOutIndex={1}
              />
              <EmailCard
                icon="email"
                title="FWD: Pitch Deck"
                description="Received this deck, let me know if I should get in touch with the founder."
                to="deals@your-workflow.ai"
                attachment="PitchDeck.pdf"
                delay={100}
                slideOut={shouldFadeCards}
                slideOutStart={CARDS_SLIDE_OUT}
                slideOutIndex={2}
              />
              <EmailCard
                icon="linkedin"
                title="LinkedIn invite received from founder"
                description="Connection request · Sarah Chen, CEO at TechStartup · 2nd degree connection"
                to="deals@your-workflow.ai"
                delay={145}
                slideOut={shouldFadeCards}
                slideOutStart={CARDS_SLIDE_OUT}
                slideOutIndex={3}
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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

      {/* Scene 3: LinkedIn Profile View */}
      {frame >= SCENE_2_END - 20 && frame < SCENE_3_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: scene3Opacity,
          }}
        >
          <LinkedInProfile delay={SCENE_2_END} />
        </div>
      )}

      {/* Scene 4: LinkedIn Request */}
      {frame >= SCENE_3_END - 20 && frame < SCENE_4_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: scene4Opacity,
          }}
        >
          <LinkedInRequest delay={SCENE_3_END} />
        </div>
      )}

      {/* Scene 5: Outreach Email */}
      {frame >= SCENE_4_END - 20 && frame < SCENE_5_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: scene5Opacity,
          }}
        >
          <OutreachEmail delay={SCENE_4_END} />
        </div>
      )}

      {/* Scene 6: Full view with Contact Card and Draft Email */}
      {frame >= SCENE_5_END - 20 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            opacity: scene6Opacity,
            padding: 60,
          }}
        >
          {/* Left column: Deal Created + Contact Card + Draft Email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <DealCreated delay={SCENE_5_END} />
              <ContactCard delay={SCENE_5_END + 15} />
            </div>
            <DraftEmail delay={SCENE_5_END + 30} />
          </div>

          {/* Right column: CRM Record */}
          <div>
            <CRMRecord delay={SCENE_5_END + 5} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
