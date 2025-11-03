import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API_BASE_URL from "../config";

const EngagementTrend = ({ startDate, endDate, selectedGroup }) => {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Fetch engagement trend ---
  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (selectedGroup) queryParams.append("group", selectedGroup);
        if (startDate) queryParams.append("start_date", startDate);
        if (endDate) queryParams.append("end_date", endDate);

        const url = `${API_BASE_URL}/engagement?${queryParams.toString()}`;
        console.log("📈 Fetching engagement trend:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.status === "ok" && Array.isArray(data.trend)) {
          setTrendData(data.trend);
        } else {
          setTrendData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching engagement trend:", err);
        setError("Failed to load engagement trend.");
        setTrendData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, [startDate, endDate, selectedGroup]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderRadius: "0px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "240px",
        height: "auto",
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
          ENGAGEMENT TREND
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          View overall engagement over time. Adjust date range or select a
          team/user to filter.
        </p>
      </div>

      {/* Right chart area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "5px 25px 10px 25px",
          color: "#1e3558",
        }}
      >
        <h2 style={{ fontWeight: "700", marginBottom: "5px", textAlign: "center" }}>
          ENGAGEMENT TREND
        </h2>

        <div style={{ width: "100%", height: "180px", marginTop: "5px" }}>
          {loading ? (
            <p style={{ color: "#8c7732" }}>Loading...</p>
          ) : error ? (
            <p style={{ color: "#c74a3a" }}>{error}</p>
          ) : trendData.length === 0 ? (
            <p style={{ color: "#8c7732" }}>No data available for this range.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickMargin={5}
                  tickFormatter={formatDate}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11 }} />
                <Tooltip labelFormatter={formatDate} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6d9b6b"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementTrend;
