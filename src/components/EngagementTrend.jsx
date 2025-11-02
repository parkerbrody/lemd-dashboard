import React from "react";
import { motion } from "framer-motion";

const EngagementTrend = () => {
  const trendPoints = "20,90 60,70 100,80 140,45 180,40 220,75 260,50";

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        height: "320px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left caption area */}
      <div
        style={{
          backgroundColor: "#0e1a2b", // darker midnight-blue tone
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
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.4",
            margin: 0,
          }}
        >
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

        {/* Animated SVG Chart */}
        <svg
          width="100%"
          height="130"
          viewBox="0 0 300 130"
          preserveAspectRatio="xMidYMid meet"
          style={{ marginTop: "0" }}
        >
          {/* Axes */}
          <line x1="20" y1="110" x2="280" y2="110" stroke="#999" strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="110" stroke="#999" strokeWidth="1" />

          {/* Horizontal grid lines */}
          {[20, 40, 60, 80, 100].map((y) => (
            <line
              key={y}
              x1="20"
              y1={y}
              x2="280"
              y2={y}
              stroke="#ddd"
              strokeWidth="0.5"
            />
          ))}

          {/* Animated trend line */}
          <motion.polyline
            fill="none"
            stroke="#000"
            strokeWidth="2"
            points={trendPoints}
            strokeDasharray="300"
            strokeDashoffset="300"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Optional point markers */}
          {trendPoints.split(" ").map((pt, i) => {
            const [x, y] = pt.split(",").map(Number);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#1e3558"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              />
            );
          })}

          {/* X-axis labels (days) */}
          {["S", "M", "T", "W", "TH", "F", "SA"].map((day, i) => (
            <text
              key={day}
              x={40 * i + 20}
              y="122" // nudged up to avoid clipping
              textAnchor="middle"
              fontSize="12"
              fill="#333"
            >
              {day}
            </text>
          ))}

          {/* Y-axis labels (values) */}
          {[0, 10, 20, 30, 40].map((val, i) => (
            <text
              key={val}
              x="5"
              y={110 - i * 25}
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
