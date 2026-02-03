import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

interface OutreachSequenceProps {
  delay: number;
}

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({
  stepNumber,
  title,
  description,
  icon,
  delay,
  isLast = false,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 25], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const checkOpacity = interpolate(frame - delay, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Step indicator with line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Step circle */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#4f46e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            position: "relative",
          }}
        >
          {stepNumber}
          {/* Checkmark overlay */}
          <div
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: checkOpacity,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div
            style={{
              width: 3,
              height: 60,
              backgroundColor: "#e2e8f0",
              marginTop: 8,
            }}
          />
        )}
      </div>

      {/* Step content card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
          flex: 1,
          minWidth: 320,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
          {/* Text */}
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 4,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 15, color: "#64748b" }}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OutreachSequence: React.FC<OutreachSequenceProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Automated Outreach Sequence
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Step
          stepNumber={1}
          title="View LinkedIn Profile"
          description="Review founder's background and company"
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="2" fill="#0077B5" />
              <path
                d="M7 10V17M7 7V7.01M11 17V13C11 12 12 11 13.5 11C15 11 16 12 16 13V17M11 10V17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          delay={delay + 10}
        />

        <Step
          stepNumber={2}
          title="Send LinkedIn Invite"
          description="Personalized connection request sent"
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#0077B5" />
              <path
                d="M12 8V16M8 12H16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          }
          delay={delay + 50}
        />

        <Step
          stepNumber={3}
          title="Send Outreach Email"
          description="Personalized email with investment thesis"
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                fill="#4f46e5"
              />
              <path d="M2 7L12 13L22 7" stroke="white" strokeWidth="2" />
            </svg>
          }
          delay={delay + 90}
          isLast
        />
      </div>
    </div>
  );
};
