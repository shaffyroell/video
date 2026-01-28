import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface AnimatedTextProps {
  text: string;
  startFrame: number;
  duration: number; // How long the text stays visible
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame,
  duration,
  fadeInDuration = 15,
  fadeOutDuration = 15,
}) => {
  const frame = useCurrentFrame();

  const endFrame = startFrame + duration;

  // Only render if we're within the visibility window (with some buffer for fade)
  if (frame < startFrame - 5 || frame > endFrame + fadeOutDuration + 5) {
    return null;
  }

  // Fade in
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Fade out
  const fadeOut = interpolate(
    frame,
    [endFrame, endFrame + fadeOutDuration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Slide up animation
  const slideUp = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const opacity = fadeIn * fadeOut;

  return (
    <div
      style={{
        fontSize: 32,
        fontWeight: 600,
        color: "#1e293b",
        textAlign: "center",
        opacity,
        transform: `translateY(${slideUp}px)`,
        padding: "0 20px",
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
};
