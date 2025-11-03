import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

const EngagementTrend = () => {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/engagement`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok" && data.trend) {
          setTrendData(data.trend);
        } else {
          console.warn("Trend fetch failed:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching engagement trend:", err))
      .finally(() => setLoading(false));
  }, []);

  // Map trend points into SVG coordinates
  const width = 280;
  const height = 120;
  const xStep = width / (trendData.length - 1 || 1);
  const points = trendData
    .map((d, i) => `${20 + i * xStep},${110 - (d.score / 100) * 100}`)
    .join(" ");

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
          backgroundColor: "#0e1a2b",
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
            fontWeight: "600",
          }}
        >
          MONITOR CHANGE
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          Select a date window to view your team’s engagement trend over time.
        </p>
      </div>

      {/* Right chart area */}
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
        <h2
          style={{
            fontWeight: "700",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          ENGAGEMENT TREND
        </h2>

        {/* Chart */}
        <svg
          width="100%"
          height="130"
          viewBox="0 0 320 130"
          preserveAspectRatio="xMidYMid meet"
          style={{ marginTop: "0" }}
        >
          {/* Axes */}
          <line x1="20" y1="110" x2="300" y2="110" stroke="#999" strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="110" stroke="#999" strokeWidth="1" />

          {/* Grid lines */}
          {[30, 50, 70, 90].map((y) => (
            <line
              key={y}
              x1="20"
              y1={110 - (y / 100) * 100}
              x2="300"
              y2={110 - (y / 100) * 100}
              stroke="#eee"
              strokeWidth="0.5"
            />
          ))}

          {/* Trend line */}
          {!loading && trendData.length > 0 && (
            <>
              <motion.polyline
                fill="none"
                stroke="#6d9b6b"
                strokeWidth="2.5"
                points={points}
                strokeDasharray="500"
                strokeDashoffset="500"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              {points.split(" ").map((pt, i) => {
                const [x, y] = pt.split(",").map(Number);
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#1e3558"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
                  />
                );
              })}
            </>
          )}

          {/* Loading shimmer */}
          {loading && (
            <text
              x="160"
              y="70"
              textAnchor="middle"
              fontSize="14"
              fill="#8c7732"
            >
              Loading...
            </text>
          )}

          {/* X-axis labels */}
          {trendData.map((d, i) => (
            <text
              key={d.date}
              x={20 + i * xStep}
              y="125"
              textAnchor="middle"
              fontSize="11"
              fill="#333"
            >
              {new Date(d.date).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
              })}
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((val) => (
            <text
              key={val}
              x="5"
              y={110 - (val / 100) * 100}
              fontSize="10"
              fill="#333"
              textAnchor="start"
            >
              {val}
            </text>
          ))}
        </svg>

        {/* Bottom caption */}
        <div
          style={{
            marginTop: "5px",
            color: "#8c7732",
            fontWeight: 400,
            fontSize: "13px",
            textAlign: "left",
            width: "100%",
          }}
        >
          Set time period
        </div>
      </div>
    </div>
  );
};

export default EngagementTrend;
