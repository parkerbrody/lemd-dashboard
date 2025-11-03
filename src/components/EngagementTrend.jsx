import React from "react";
import { motion } from "framer-motion";

const EngagementTrend = ({ data, loading, error }) => {
  const trendData = data?.trend || [];

  // Chart bounds
  const chartLeft = 30;
  const chartRight = 300;
  const chartTop = 10;
  const chartBottom = 110;
  const chartHeight = chartBottom - chartTop;
  const chartWidth = chartRight - chartLeft;

  // Compute line points safely
  let points = "";
  if (trendData.length > 0) {
    const xStep = chartWidth / Math.max(1, trendData.length - 1);
    points = trendData
      .map((d, i) => {
        const clamped = Math.min(100, Math.max(0, d.score)); // ensure valid range
        const x = chartLeft + i * xStep;
        const y = chartBottom - (clamped / 100) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");
  }

  const hasData = trendData.length > 1;

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
          {[25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="20"
              y1={chartBottom - (y / 100) * chartHeight}
              x2="300"
              y2={chartBottom - (y / 100) * chartHeight}
              stroke="#eee"
              strokeWidth="0.5"
            />
          ))}

          {/* Trend line + points */}
          {!loading && hasData && (
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

          {/* Loading / Error / No data */}
          {loading && (
            <text x="160" y="70" textAnchor="middle" fontSize="14" fill="#8c7732">
              Loading...
            </text>
          )}
          {error && (
            <text x="160" y="70" textAnchor="middle" fontSize="13" fill="red">
              Failed to load trend
            </text>
          )}
          {!loading && !error && !hasData && (
            <text x="160" y="70" textAnchor="middle" fontSize="13" fill="#999">
              No data available
            </text>
          )}

          {/* X-axis labels */}
          {trendData.map((d, i) => {
            const xStep = chartWidth / Math.max(1, trendData.length - 1);
            const x = chartLeft + i * xStep;
            return (
              <text
                key={d.date}
                x={x}
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
            );
          })}

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((val) => (
            <text
              key={val}
              x="5"
              y={chartBottom - (val / 100) * chartHeight}
              fontSize="10"
              fill="#333"
              textAnchor="start"
            >
              {val}
            </text>
          ))}
        </svg>

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
