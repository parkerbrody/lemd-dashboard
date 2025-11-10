import { useState, useEffect } from "react";
import EngagementSnapshot from "./components/EngagementSnapshot";
import ByTopic from "./components/ByTopic";
import EngagementTrend from "./components/EngagementTrend";
import FeatureTrend from "./components/FeatureTrend";
import FilterBar from "./components/FilterBar";
import UploadPlaceholder from "./components/UploadPlaceholder";

// ---- Engagement data hook ----
function useEngagementData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEngagement() {
      try {
        const res = await fetch("https://diywry214y4lv.cloudfront.net");
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching engagement data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEngagement();
  }, []);

  return { data, loading, error };
}

// ---- Main App ----
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // Fetch engagement data once for all components
  const { data: engagementData, loading, error } = useEngagementData();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1rem",
        backgroundColor: "var(--background-color)",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1>ABC COMPANY DASHBOARD</h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingRight: "5rem",
            maxWidth: "80%",
            justifyContent: "flex-end",
          }}
        >
          <FilterBar
            selectedFeature={selectedFeature}
            setSelectedFeature={setSelectedFeature}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <UploadPlaceholder />
      </div>

      {/* Dashboard grid */}
      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <EngagementSnapshot
          startDate={startDate}
          endDate={endDate}
          selectedGroup={selectedGroup}
        />
        <ByTopic feature={selectedFeature} />
        <EngagementTrend
          startDate={startDate}
          endDate={endDate}
          selectedGroup={selectedGroup}
        />
        <FeatureTrend
          feature={selectedFeature}
          startDate={startDate}
          endDate={endDate}
          selectedGroup={selectedGroup}
        />
      </div>
    </div>
  );
}

export default App;
