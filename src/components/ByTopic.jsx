import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const ByTopic = ({ feature }) => {
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
      const score = (topic.positive || 0) - (topic.negative || 0);
      if (score > 0.4) return "#6d9b6b"; // green = positive
      if (score < -0.4) return "#c74a3a"; // red = negative
      return "#d1b243"; // neutral yellow
    }

    if (feature === "energy") {
      const prob = topic.yes ?? 0.5;
      return prob > 0.6 ? "#6d9b6b" : prob < 0.4 ? "#c74a3a" : "#d1b243";
    }

    if (feature === "politeness") {
      const prob = topic.polite ?? 0.5;
      return prob > 0.6 ? "#6d9b6b" : prob < 0.4 ? "#c74a3a" : "#d1b243";
    }

    return "#8c7732";
  };

  const maxFreq = Math.max(...topics.map((t) => t.freq), 1);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        minHeight: "250px",
      }}
    >
      <h3 style={{ color: "#1e3558" }}>
        {feature ? `${feature[0].toUpperCase() + feature.slice(1)} by Topic` : "By Topic"}
      </h3>

      {topics.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {topics.map((t) => (
            <span
              key={t.word}
              style={{
                fontSize: `${10 + (t.freq / maxFreq) * 28}px`,
                color: getColor(t),
                fontWeight: 600,
              }}
            >
              {t.word}
            </span>
          ))}
        </div>
      ) : (
        <p style={{ color: "#8c7732" }}>Select a feature to view topics.</p>
      )}
    </div>
  );
};

export default ByTopic;
