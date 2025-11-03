import React from "react";

const TopicByFeature = ({ feature }) => {
  const words = [
    { text: "Change", size: 28, rotate: -90 },
    { text: "Holiday", size: 14 },
    { text: "Merger", size: 16 },
    { text: "Company", size: 18 },
    { text: "Benefits", size: 14, rotate: -90 },
    { text: "ABC", size: 12 },
    { text: "Christmas Break", size: 12 },
    { text: "Hyperion Project", size: 20 },
    { text: "Layoffs", size: 14 },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "220px",
        height: "auto",
        fontFamily: "sans-serif",
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
        <h3 style={{ marginBottom: "10px", fontSize: "14px", letterSpacing: "0.5px" }}>
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
            height: "90px",
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "4px",
            marginTop: "5px",
            overflow: "visible",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                fontSize: `${word.size}px`,
                fontWeight: 600,
                transform: `rotate(${word.rotate || 0}deg)`,
                color: "#1e3558",
                whiteSpace: "nowrap",
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
          <span>Explore Sentiment</span>
        </div>
      </div>
    </div>
  );
};

export default TopicByFeature;
