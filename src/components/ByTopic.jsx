import React, { useMemo } from "react";

const TopicByFeature = ({ feature }) => {
  const words = useMemo(
    () => [
      { text: "Change", size: 28 },
      { text: "Holiday", size: 14 },
      { text: "Merger", size: 16 },
      { text: "Company", size: 18 },
      { text: "Benefits", size: 14 },
      { text: "ABC", size: 12 },
      { text: "Christmas Break", size: 12 },
      { text: "Hyperion Project", size: 20 },
      { text: "Layoffs", size: 14 },
    ],
    []
  );

  // Randomized positioning + rotation for a natural word cloud
  const positionedWords = useMemo(
    () =>
      words.map((word) => ({
        ...word,
        top: `${Math.random() * 70 + 5}%`,
        left: `${Math.random() * 80 + 5}%`,
        rotate: Math.random() > 0.5 ? 0 : -90,
        color: "#1e3558",
      })),
    [words]
  );

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "250px",
        height: "auto",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Left caption area */}
      <div
        style={{
          backgroundColor: "#1e3558",
          color: "white",
          padding: "24px",
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
            fontSize: "14px",
            letterSpacing: "0.5px",
          }}
        >
          BY TOPIC
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          Monitor {feature} by topic.
        </p>
      </div>

      {/* Right content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          color: "#1e3558",
          position: "relative",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "5px" }}>
          {feature} BY TOPIC
        </h2>

        {/* Word Cloud */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "140px",
            flex: "0 0 auto",
            overflow: "hidden",
          }}
        >
          {positionedWords.map((word, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: word.top,
                left: word.left,
                transform: `rotate(${word.rotate}deg)`,
                fontSize: `${word.size}px`,
                fontWeight: 600,
                color: word.color,
                opacity: 0.9,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                textShadow: "0 1px 2px rgba(0,0,0,0.15)",
              }}
            >
              {word.text}
            </span>
          ))}
        </div>

        {/* Bottom actions */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            color: "#8c7732",
            fontWeight: 400,
            fontSize: "13px",
          }}
        >
          <span>Drill down</span>
          <span>Explore {feature}</span>
        </div>
      </div>
    </div>
  );
};

export default TopicByFeature;
