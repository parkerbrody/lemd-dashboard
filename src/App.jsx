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
          flexWrap: "wrap",         // ✅ allows wrapping on small screens
          justifyContent: "space-between",
       alignItems: "center",
       gap: "1rem",              // ✅ adds breathing room when wrapped
       marginBottom: "1.5rem",
     }}
   >
     <h1
       style={{
         flex: "1 1 100%",       // ✅ ensures the title spans full width when wrapped
         fontSize: "clamp(1.2rem, 2vw + 1rem, 2rem)", // responsive font sizing
       }}
     >
       ABC COMPANY DASHBOARD
     </h1>

     <div
       style={{
         display: "flex",
         flexWrap: "wrap",
         alignItems: "center",
         gap: "1rem",
         justifyContent: "flex-end",
         flex: "1 1 auto",
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
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gridAutoRows: "minmax(320px, auto)", // ⬅️ taller module cards
          alignItems: "stretch",
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
