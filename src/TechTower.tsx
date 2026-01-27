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

export const TechTower: React.FC<z.infer<typeof techTowerSchema>> = ({
  backgroundColor = "#f8fafc",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Calculate stage duration based on total frames
  const stageDuration = Math.floor(durationInFrames / stages.length);

  // Header fade in
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Determine fade state for cards (they fade when we get past "Analyzing signals")
  const currentStage = Math.floor(frame / stageDuration);
  const shouldFadeCards = currentStage >= 2;

  // Global fade out at end
  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
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
        opacity: globalOpacity,
      }}
    >
      {/* Header */}
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

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          bottom: 80,
          display: "flex",
          justifyContent: "space-between",
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
    </AbsoluteFill>
  );
};
