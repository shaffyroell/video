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

  // Glow animation - subtle pulse for the outer glow
  const glowOpacity = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.15, 0.25, 0.15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle scale pulse for the container
  const containerScale = interpolate(
    frame % 90,
    [0, 45, 90],
    [1, 1.01, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow - creates the "gravity point" effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 280,
          background: `radial-gradient(ellipse at center, rgba(59, 130, 246, ${glowOpacity}) 0%, rgba(147, 197, 253, ${glowOpacity * 0.5}) 40%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* System container - the main oval card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 60px",
          borderRadius: 100,
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)",
          boxShadow: `
            0 4px 24px rgba(59, 130, 246, 0.12),
            0 8px 48px rgba(59, 130, 246, 0.08),
            0 0 0 1px rgba(59, 130, 246, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
          transform: `scale(${containerScale})`,
          minWidth: 380,
        }}
      >
        {/* Sourcing system label */}
        <div
          style={{
            fontSize: 16,
            color: "#3b82f6",
            letterSpacing: 1.5,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          · Sourcing system ·
        </div>

        {/* Animated stage text */}
        <div style={{ position: "relative", height: 44, minWidth: 300 }}>
          {stages.map((stage, index) => {
            const isActive = index === currentStageIndex;
            const isPast = index < currentStageIndex;

            // Animation for entering
            const enterProgress = interpolate(
              stageFrame,
              [0, 20],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

            // Animation for exiting
            const exitProgress =
              index === currentStageIndex && stageFrame > stageDuration - 20
                ? interpolate(
                    stageFrame,
                    [stageDuration - 20, stageDuration],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )
                : 0;

            const opacity = isActive ? enterProgress * (1 - exitProgress) : isPast ? 0 : 0;

            const translateY = isActive
              ? interpolate(enterProgress, [0, 1], [15, 0]) +
                interpolate(exitProgress, [0, 1], [0, -15])
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
                  left: "50%",
                  transform: `translateX(-50%) translateY(${translateY}px)`,
                  opacity,
                  fontSize: 28,
                  fontWeight: 500,
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{firstWord}</span>{" "}
                {restWords}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
