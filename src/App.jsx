import { useState, useEffect } from "react";
import EngagementSnapshot from "./components/EngagementSnapshot";
import ByTopic from "./components/ByTopic";
import EngagementTrend from "./components/EngagementTrend";
import FeatureTrend from "./components/FeatureTrend";
import FilterBar from "./components/FilterBar";
import UploadPlaceholder from "./components/UploadPlaceholder";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

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
            paddingRight: "5rem",   // adds space from the right edge
            maxWidth: "80%",         // ensures dropdowns don’t overflow
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
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <EngagementSnapshot />
        <ByTopic />
        <EngagementTrend />
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
