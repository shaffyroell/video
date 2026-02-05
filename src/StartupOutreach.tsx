import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { DataScraping } from "./StartupOutreach/DataScraping";
import { RankingScore } from "./StartupOutreach/RankingScore";
import { FindIndividuals } from "./StartupOutreach/FindIndividuals";
import { OutreachSequence } from "./StartupOutreach/OutreachSequence";

export const startupOutreachSchema = z.object({
  backgroundColor: z.string().default("#f8fafc"),
});

// Scene timing (in frames at 30fps)
const SCENE_1_END = 270; // Data scraping + signal monitoring
const SCENE_2_END = 480; // Ranking
const SCENE_3_END = 660; // Find individuals
// Scene 4 runs from 660 to end (900)

export const StartupOutreach: React.FC<
  z.infer<typeof startupOutreachSchema>
> = ({ backgroundColor = "#f8fafc" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Header
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
    [SCENE_3_END, SCENE_3_END + 20, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Step indicator
  const currentStep =
    frame < SCENE_1_END
      ? 0
      : frame < SCENE_2_END
        ? 1
        : frame < SCENE_3_END
          ? 2
          : 3;

  const steps = [
    "Scrape Data",
    "Rank for Fit",
    "Find Individuals",
    "Personalized Outreach",
  ];

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
          top: 40,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{ fontSize: 28, fontWeight: 700, color: "#1e293b", letterSpacing: -0.5 }}
        >
          Startup Outreach Pipeline
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isPast = i < currentStep;
            return (
              <React.Fragment key={step}>
                {i > 0 && (
                  <div
                    style={{
                      width: 20,
                      height: 2,
                      backgroundColor: isPast ? "#10b981" : "#e2e8f0",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 20,
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
                    fontSize: 12,
                    fontWeight: 600,
                    transition: "all 0.3s",
                  }}
                >
                  {isPast ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
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

      {/* Scene 1: Data Scraping */}
      {frame < SCENE_1_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 60,
            right: 60,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene1Opacity,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#64748b",
              marginBottom: 30,
              opacity: interpolate(frame, [10, 30], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Scraping B2B leads, candidates, and investors + monitoring signals
          </div>
          <DataScraping delay={15} />
        </div>
      )}

      {/* Scene 2: Ranking */}
      {frame >= SCENE_1_END - 20 && frame < SCENE_2_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 60,
            right: 60,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene2Opacity,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#64748b",
              marginBottom: 30,
              opacity: interpolate(
                frame - SCENE_1_END,
                [0, 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            Ranking each lead with a 1-10 fit score based on your criteria
          </div>
          <RankingScore delay={SCENE_1_END + 5} />
        </div>
      )}

      {/* Scene 3: Find Individuals */}
      {frame >= SCENE_2_END - 20 && frame < SCENE_3_END + 30 && (
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 60,
            right: 60,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene3Opacity,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#64748b",
              marginBottom: 30,
              opacity: interpolate(
                frame - SCENE_2_END,
                [0, 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            Finding the right individuals and their contact information
          </div>
          <FindIndividuals delay={SCENE_2_END + 5} />
        </div>
      )}

      {/* Scene 4: Personalized Outreach (LinkedIn Visit → Invite → Email) */}
      {frame >= SCENE_3_END - 20 && (
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
            opacity: scene4Opacity,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
              opacity: interpolate(
                frame - SCENE_3_END,
                [0, 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                backgroundColor: "#0077b5",
                padding: "5px 10px",
                borderRadius: 6,
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
                in
              </span>
            </div>
            <span style={{ fontSize: 20, color: "#64748b" }}>
              Setting up personalized outreach sequence
            </span>
          </div>
          <OutreachSequence delay={SCENE_3_END + 10} />
        </div>
      )}
    </AbsoluteFill>
  );
};
