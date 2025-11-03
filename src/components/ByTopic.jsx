import React, { useEffect, useState, useMemo } from "react";
import WordCloud from "react-wordcloud";
import API_BASE_URL from "../config";

const TopicByFeature = ({ feature }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!feature) return;
    fetch(`${API_BASE_URL}/topics?feature=${feature}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") setTopics(data.topics);
      })
      .catch((err) => console.error("Failed to fetch topics:", err));
  }, [feature]);

  const getColor = (topic) => {
    if (feature === "sentiment") {
      const score = (topic.positive ?? 0) - (topic.negative ?? 0);
      if (score > 0.4) return "#6d9b6b"; // green = positive
      if (score < -0.4) return "#c74a3a"; // red = negative
      return "#d1b243"; // neutral yellow
    }
    if (feature === "energy") {
      const yes = topic.yes ?? 0.5;
      return yes > 0.6 ? "#6d9b6b" : yes < 0.4 ? "#c74a3a" : "#d1b243";
    }
    if (feature === "politeness") {
      const polite = topic.polite ?? 0.5;
      return polite > 0.6 ? "#6d9b6b" : polite < 0.4 ? "#c74a3a" : "#d1b243";
    }
    return "#8c7732";
  };

  const words = useMemo(
    () =>
      topics.map((t) => ({
        text: t.word,
        value: t.freq,
        color: getColor(t),
      })),
    [topics, feature]
  );

  const options = {
    rotations: 2, // mix of horizontal & vertical
    rotationAngles: [0, 90],
    fontSizes: [14, 45],
    fontFamily: "sans-serif",
    deterministic: false,
    enableTooltip: false,
    colors: words.map((w) => w.color),
  };

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
          {feature ? feature.toUpperCase() : "FEATURE"} BY TOPIC
        </h2>

        {/* Word Cloud */}
        <div style={{ width: "100%", height: "150px" }}>
          {words.length > 0 ? (
            <WordCloud words={words} options={options} />
          ) : (
            <p style={{ color: "#8c7732" }}>Select a feature to view topics.</p>
          )}
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
          <span>Explore {feature || "feature"}</span>
        </div>
      </div>
    </div>
  );
};

export default TopicByFeature;
