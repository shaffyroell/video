import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface DataScrapingProps {
  delay: number;
}

const dataSources = [
  {
    type: "Leads",
    icon: "target",
    color: "#3b82f6",
    count: "2,847",
    items: ["Crunchbase", "LinkedIn", "AngelList"],
  },
  {
    type: "Candidates",
    icon: "users",
    color: "#8b5cf6",
    count: "1,203",
    items: ["GitHub", "LinkedIn", "Stack Overflow"],
  },
  {
    type: "Investors",
    icon: "briefcase",
    color: "#10b981",
    count: "412",
    items: ["PitchBook", "Dealroom", "Twitter/X"],
  },
];

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const icons: Record<string, React.FC> = {
  target: TargetIcon,
  users: UsersIcon,
  briefcase: BriefcaseIcon,
};

export const DataScraping: React.FC<DataScrapingProps> = ({ delay }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {dataSources.map((source, index) => {
        const cardDelay = delay + index * 25;
        const opacity = interpolate(frame - cardDelay, [0, 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slideUp = interpolate(frame - cardDelay, [0, 25], [50, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - cardDelay, [0, 25], [0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Counting animation for the number
        const countProgress = interpolate(
          frame - cardDelay - 25,
          [0, 40],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const numericCount = parseInt(source.count.replace(",", ""));
        const displayCount = Math.floor(countProgress * numericCount);
        const formattedCount = displayCount.toLocaleString();

        // Source items stagger
        const Icon = icons[source.icon];

        return (
          <div
            key={source.type}
            style={{
              opacity,
              transform: `translateY(${slideUp}px) scale(${scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Card */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                width: 280,
                border: `2px solid ${source.color}20`,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: `${source.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: source.color,
                  }}
                >
                  <Icon />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1e293b",
                    }}
                  >
                    {source.type}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    Scraping...
                  </div>
                </div>
              </div>

              {/* Count */}
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: source.color,
                  marginBottom: 16,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formattedCount}
              </div>

              {/* Sources */}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Sources
                </div>
                {source.items.map((item, itemIndex) => {
                  const itemDelay = cardDelay + 30 + itemIndex * 10;
                  const itemOpacity = interpolate(
                    frame - itemDelay,
                    [0, 15],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                        opacity: itemOpacity,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: source.color,
                        }}
                      />
                      <span style={{ fontSize: 13, color: "#64748b" }}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
