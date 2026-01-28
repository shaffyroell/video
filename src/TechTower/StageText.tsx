import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface StageTextProps {
  stages: string[];
  stageDuration: number;
}

export const StageText: React.FC<StageTextProps> = ({ stages, stageDuration }) => {
  const frame = useCurrentFrame();

  // Determine which stage we're on
  const currentStageIndex = Math.min(
    Math.floor(frame / stageDuration),
    stages.length - 1
  );

  const stageFrame = frame - currentStageIndex * stageDuration;

  // Glow opacity pulses subtly
  const glowOpacity = interpolate(
    frame % 120,
    [0, 60, 120],
    [0.05, 0.08, 0.05],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
        position: "relative",
      }}
    >
      {/* Radial glow / halo behind center text - system feels like gravity point */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          width: 320,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(59, 130, 246, ${glowOpacity}) 0%, rgba(59, 130, 246, 0) 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Sourcing system label - smaller, lighter, more letter spacing */}
      <div
        style={{
          fontSize: 13,
          color: "#b0bac9",
          letterSpacing: 1.5,
          fontWeight: 400,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        · Sourcing system
      </div>

      {/* Animated stage text - larger, darker */}
      <div style={{ position: "relative", height: 55, zIndex: 1 }}>
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isPast = index < currentStageIndex;

          // Animation for entering - fade only, no slide (linear/soft easing)
          const enterProgress = interpolate(
            stageFrame,
            [0, 30],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad), // Soft easing, no bounce
            }
          );

          // Animation for exiting - fade only
          const exitProgress =
            index === currentStageIndex && stageFrame > stageDuration - 30
              ? interpolate(
                  stageFrame,
                  [stageDuration - 30, stageDuration],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.in(Easing.quad), // Linear-ish fade out
                  }
                )
              : 0;

          const opacity = isActive ? enterProgress * (1 - exitProgress) : isPast ? 0 : 0;

          // Highlight the first word
          const words = stage.split(" ");
          const firstWord = words[0];
          const restWords = words.slice(1).join(" ");

          return (
            <div
              key={stage}
              style={{
                position: "absolute",
                opacity,
                // No translateY - just fade in/out
                fontSize: 38, // ~15-20% larger than 32
                fontWeight: 500,
                color: "#475569", // Darker gray (was #64748b)
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#1e293b", fontWeight: 600 }}>{firstWord}</span>{" "}
              {restWords}
            </div>
          );
        })}
      </div>
    </div>
  );
};
