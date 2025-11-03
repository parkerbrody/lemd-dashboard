import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

const EngagementSnapshot = ({ startDate, endDate, selectedGroup }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch engagement current value
  useEffect(() => {
    const fetchCurrent = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedGroup) queryParams.append("group", selectedGroup);
        if (startDate) queryParams.append("start_date", startDate);
        if (endDate) queryParams.append("end_date", endDate);

        const url = `${API_BASE_URL}/engagement?${queryParams.toString()}`;
        console.log("📊 Fetching engagement snapshot:", url);

        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok") {
          setCurrentScore(data.current || 0);
        } else {
          setCurrentScore(0);
        }
      } catch (err) {
        console.error("❌ Error fetching engagement snapshot:", err);
        setCurrentScore(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrent();
  }, [startDate, endDate, selectedGroup]);

  // --- Gauge animation ---
  const rotation = (currentScore / 100) * 180 - 90;
  const color =
    currentScore < 50 ? "#c74a3a" : currentScore < 75 ? "#d1b243" : "#6d9b6b";

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "240px",
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
          ENGAGEMENT SNAPSHOT
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          Overall engagement index. Adjust filters to view by team or individual.
        </p>
      </div>

      {/* Right gauge area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#1e3558",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "10px" }}>CURRENT ENGAGEMENT</h2>
        {loading ? (
          <p style={{ color: "#8c7732" }}>Loading...</p>
        ) : (
          <>
            <div style={{ position: "relative", width: "140px", height: "70px" }}>
              <svg viewBox="0 0 100 50" width="140" height="70">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(currentScore / 100) * 126}, 126`}
                />
              </svg>
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "2px",
                  height: "45px",
                  backgroundColor: "#333",
                  transformOrigin: "bottom center",
                }}
              />
            </div>
            <h1 style={{ marginTop: "10px", fontSize: "28px", color }}>{currentScore.toFixed(1)}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default EngagementSnapshot;
