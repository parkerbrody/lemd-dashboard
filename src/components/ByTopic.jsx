import React from "react";
import WordCloud from "react-wordcloud";

const TopicByFeature = ({ feature }) => {
  // Simulated demo data
  const simulatedWords = [
    { text: "Change", value: 28, color: "#6d9b6b" },
    { text: "Holiday", value: 14, color: "#d1b243" },
    { text: "Merger", value: 16, color: "#c74a3a" },
    { text: "Benefits", value: 14, color: "#6d9b6b" },
    { text: "Hyperion Project", value: 20, color: "#8c7732" },
    { text: "Layoffs", value: 12, color: "#c74a3a" },
  ];

  // ✅ Ensure non-empty words array
  const words = simulatedWords && simulatedWords.length > 0 ? simulatedWords : [{ text: "No data", value: 10 }];

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [12, 40],
    deterministic: true,
  };

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "220px",
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
          Monitor {feature || "feature"} by topic.
        </p>
      </div>

      {/* Word cloud */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "5px" }}>
          {feature ? feature.toUpperCase() : "FEATURE"} BY TOPIC
        </h2>

        <div style={{ width: "100%", height: "180px" }}>
          <WordCloud words={words} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TopicByFeature;
