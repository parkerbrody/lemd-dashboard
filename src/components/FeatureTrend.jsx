import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, LineChart as LineChartIcon } from "lucide-react";
import API_BASE_URL from "../config";

const FeatureTrend = ({ feature, startDate, endDate, setStartDate, setEndDate, selectedGroup }) => {
  const [trendData, setTrendData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultStart = useRef(null);
  const defaultEnd = useRef(null);

  // --- Default 5-day range setup ---
  useEffect(() => {
    if (!startDate && !endDate && !defaultStart.current) {
      const today = new Date();
      const end = today.toISOString().split("T")[0];
      const start = new Date(today);
      start.setDate(today.getDate() - 4);
      const startStr = start.toISOString().split("T")[0];
      const endStr = end;
      defaultStart.current = startStr;
      defaultEnd.current = endStr;
      if (typeof setStartDate === "function") setStartDate(startStr);
      if (typeof setEndDate === "function") setEndDate(endStr);
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

  // --- Helper: generate a date range ---
  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const endDateObj = new Date(end);
    while (current <= endDateObj) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // --- Fetch and normalize trend data ---
  useEffect(() => {
    if (!feature) {
      setTrendData([]);
      return;
    }

    const fetchTrendData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        const effectiveStart = startDate || defaultStart.current;
        const effectiveEnd = endDate || defaultEnd.current;
        if (effectiveStart) queryParams.append("start_date", effectiveStart);
        if (effectiveEnd) queryParams.append("end_date", effectiveEnd);
        if (selectedGroup) queryParams.append("group", selectedGroup);

        const url = `${API_BASE_URL}/trend/${feature.toLowerCase()}?${queryParams.toString()}`;
        console.log("📊 Fetching:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.status === "ok" && data.trend) {
          const parsed = Object.entries(data.trend).map(([date, values]) => ({
            date,
            ...values,
          }));
          const range = getDateRange(effectiveStart, effectiveEnd);
          const merged = range.map((d) => parsed.find((p) => p.date === d) || { date: d });
          setTrendData(merged);
        } else {
          setTrendData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching trend:", err);
        setError("Failed to load trend data.");
        setTrendData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [feature, startDate, endDate, selectedGroup]);

  // --- Chart setup ---
  const colors = {
    positive: "#6d9b6b",
    neutral: "#d1b243",
    negative: "#c74a3a",
    yes: "#6d9b6b",
    no: "#c74a3a",
  };

  const keys =
    feature?.toLowerCase() === "sentiment"
      ? ["positive", "neutral", "negative"]
      : ["yes", "no"];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

  // --- Guards ---
  const showEmpty = !loading && !error && (!trendData || trendData.length === 0);

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
          MONITOR CHANGE
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "1.4", margin: 0 }}>
          Select a date window to view your team’s {feature || "feature"} trend over time.
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
          {feature ? feature.toUpperCase() : "FEATURE"} TREND
        </h2>

        {/* Chart type toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <div style={{ color: "#8c7732", fontWeight: 400, fontSize: "13px" }}>
            Set time period
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setChartType("line")}
              style={{
                background: chartType === "line" ? "#8c7732" : "transparent",
                border: "1px solid #8c7732",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
              }}
            >
              <LineChartIcon size={14} color={chartType === "line" ? "#fff" : "#8c7732"} />
            </button>
            <button
              onClick={() => setChartType("bar")}
              style={{
                background: chartType === "bar" ? "#8c7732" : "transparent",
                border: "1px solid #8c7732",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
              }}
            >
              <BarChart2 size={14} color={chartType === "bar" ? "#fff" : "#8c7732"} />
            </button>
          </div>
        </div>

        {/* Chart container */}
        <div style={{ width: "100%", height: "180px", marginTop: "5px" }}>
          {loading ? (
            <p style={{ color: "#8c7732" }}>Loading...</p>
          ) : error ? (
            <p style={{ color: "#c74a3a" }}>{error}</p>
          ) : showEmpty ? (
            <p style={{ color: "#8c7732" }}>No data available for this feature.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={trendData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickMargin={5}
                    tickFormatter={formatDate}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip labelFormatter={formatDate} />
                  <Legend />
                  {keys.map((k) => (
                    <Line
                      key={k}
                      type="monotone"
                      dataKey={k}
                      stroke={colors[k]}
                      strokeWidth={2}
                      connectNulls={true}
                      dot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              ) : (
                <BarChart data={trendData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickMargin={5}
                    tickFormatter={formatDate}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip labelFormatter={formatDate} />
                  <Legend />
                  {keys.map((k) => (
                    <Bar key={k} dataKey={k} stackId="a" fill={colors[k]} />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureTrend;
