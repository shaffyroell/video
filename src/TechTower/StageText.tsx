import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface StageTextProps {
  stages: string[];
  stageDuration: number;
  startFrame?: number;
}

export const StageText: React.FC<StageTextProps> = ({ stages, stageDuration, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  // Determine which stage we're on
  const currentStageIndex = Math.min(
    Math.floor(adjustedFrame / stageDuration),
    stages.length - 1
  );

  const stageFrame = adjustedFrame - currentStageIndex * stageDuration;

  // Subtle glow animation - very subtle pulse
  const glowOpacity = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.06, 0.1, 0.06],
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
      {/* Outer glow - subtle gray */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          height: 260,
          background: `radial-gradient(ellipse at center, rgba(30, 41, 59, ${glowOpacity}) 0%, rgba(100, 116, 139, ${glowOpacity * 0.4}) 40%, transparent 70%)`,
          filter: "blur(35px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* System container - oval card with reduced shadow */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "36px 56px",
          borderRadius: 100,
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)",
          boxShadow: `
            0 2px 12px rgba(0, 0, 0, 0.06),
            0 4px 24px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(0, 0, 0, 0.04)
          `,
          minWidth: 360,
        }}
      >
        {/* Sourcing system label - black/dark gray */}
        <div
          style={{
            fontSize: 14,
            color: "#1e293b",
            letterSpacing: 1.5,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          · Sourcing system ·
        </div>

        {/* Animated stage text */}
        <div style={{ position: "relative", height: 40, minWidth: 280 }}>
          {stages.map((stage, index) => {
            const isActive = index === currentStageIndex;
            const isPast = index < currentStageIndex;

            // Animation for entering
            const enterProgress = interpolate(
              stageFrame,
              [0, 18],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

            // Animation for exiting
            const exitProgress =
              index === currentStageIndex && stageFrame > stageDuration - 18
                ? interpolate(
                    stageFrame,
                    [stageDuration - 18, stageDuration],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )
                : 0;

            const opacity = isActive ? enterProgress * (1 - exitProgress) : isPast ? 0 : 0;

            const translateY = isActive
              ? interpolate(enterProgress, [0, 1], [12, 0]) +
                interpolate(exitProgress, [0, 1], [0, -12])
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
                  fontSize: 26,
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
