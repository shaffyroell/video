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

  // Glow animation - subtle pulse
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
        gap: 20,
        position: "relative",
      }}
    >
      {/* Radial glow behind content - gravity point effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          width: 400,
          height: 300,
          background: `radial-gradient(ellipse at center, rgba(100, 116, 139, ${glowOpacity}) 0%, rgba(100, 116, 139, ${glowOpacity * 0.5}) 30%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Sourcing system label - strengthened presence */}
      <div
        style={{
          fontSize: 18,
          color: "#64748b",
          letterSpacing: 0.8,
          fontWeight: 500,
          position: "relative",
          zIndex: 1,
        }}
      >
        · Sourcing system
      </div>

      {/* Animated stage text */}
      <div style={{ position: "relative", height: 50, zIndex: 1 }}>
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isPast = index < currentStageIndex;

          // Animation for entering
          const enterProgress = interpolate(
            stageFrame,
            [0, 25],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          // Animation for exiting
          const exitProgress =
            index === currentStageIndex && stageFrame > stageDuration - 25
              ? interpolate(
                  stageFrame,
                  [stageDuration - 25, stageDuration],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                )
              : 0;

          const opacity = isActive ? enterProgress * (1 - exitProgress) : isPast ? 0 : 0;

          const translateY = isActive
            ? interpolate(enterProgress, [0, 1], [20, 0]) +
              interpolate(exitProgress, [0, 1], [0, -20])
            : 0;

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
                transform: `translateY(${translateY}px)`,
                fontSize: 32,
                fontWeight: 500,
                color: "#64748b",
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
