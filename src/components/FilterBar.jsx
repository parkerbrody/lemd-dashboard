import React, { useState, useEffect } from "react";

import API_BASE_URL from "../config";

const FilterBar = ({
  selectedFeature,
  setSelectedFeature,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedGroup,
  setSelectedGroup,
}) => {
  const [metadata, setMetadata] = useState({ users: [], teams: [] });
  const [submenu, setSubmenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  let closeTimeout = null;

  // Fetch user/team metadata
  useEffect(() => {
    fetch(`${API_BASE_URL}/metadata`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setMetadata({
            users: data.users || [],
            teams: data.teams || [],
          });
        } else {
          console.warn("Metadata fetch failed:", data.message);
        }
      })
      .catch((err) => console.error("Failed to fetch metadata:", err));
  }, []);

  // Close with delay for smooth hover
  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setSubmenu(null);
      setMenuOpen(false);
    }, 250);
  };
  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      {/* Feature dropdown */}
      <select
        aria-label="Select Feature"
        value={selectedFeature}
        onChange={(e) => setSelectedFeature(e.target.value)}
        style={dropdownStyle}
      >
        <option value="">Select Feature</option>
        <option value="sentiment">Sentiment</option>
        <option value="energy">Energy</option>
        <option value="politeness">Politeness</option>
      </select>

      {/* Start Date */}
      <input
        aria-label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={dropdownStyle}
      />

      {/* End Date */}
      <input
        aria-label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={dropdownStyle}
      />

      {/* Group By */}
      <div
        style={{
          ...dropdownStyle,
          position: "relative",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {selectedGroup ? (
          <>
            <span>Group: {selectedGroup}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGroup("");
              }}
              style={clearButtonStyle}
              aria-label="Clear group filter"
            >
              ×
            </button>
          </>
        ) : (
          "Group By ▾"
        )}

        {/* Dropdown menu */}
        {menuOpen && (
          <div style={menuContainerStyle}>
            {/* Team Member submenu */}
            <div
              onMouseEnter={() => setSubmenu("member")}
              onClick={() => setSubmenu(submenu === "member" ? null : "member")}
              style={submenuItemStyle}
            >
              Team Member ▶
              {submenu === "member" && (
                <div style={submenuPanelStyle}>
                  {metadata.users.length > 0 ? (
                    metadata.users.map((user) => (
                      <div
                        key={user}
                        style={submenuItemStyle}
                        onClick={() => {
                          setSelectedGroup(user);
                          setMenuOpen(false);
                        }}
                      >
                        {user}
                      </div>
                    ))
                  ) : (
                    <div style={submenuItemStyle}>No users found</div>
                  )}
                </div>
              )}
            </div>

            {/* Team submenu */}
            <div
              onMouseEnter={() => setSubmenu("team")}
              onClick={() => setSubmenu(submenu === "team" ? null : "team")}
              style={submenuItemStyle}
            >
              Team ▶
              {submenu === "team" && (
                <div style={submenuPanelStyle}>
                  {metadata.teams.length > 0 ? (
                    metadata.teams.map((team) => (
                      <div
                        key={team}
                        style={submenuItemStyle}
                        onClick={() => {
                          setSelectedGroup(team);
                          setMenuOpen(false);
                        }}
                      >
                        {team}
                      </div>
                    ))
                  ) : (
                    <div style={submenuItemStyle}>No teams found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const dropdownStyle = {
  border: "1px solid #000",
  borderRadius: "20px",
  padding: "5px 12px",
  color: "#8c7732",
  fontSize: "13px",
  fontWeight: 500,
  backgroundColor: "white",
  cursor: "pointer",
};

const clearButtonStyle = {
  border: "none",
  background: "transparent",
  color: "#c74a3a",
  fontSize: "14px",
  cursor: "pointer",
  lineHeight: "1",
  padding: "0 4px",
};

const menuContainerStyle = {
  position: "absolute",
  top: "30px",
  right: 0,
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  zIndex: 10,
  minWidth: "140px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const submenuItemStyle = {
  padding: "6px 10px",
  fontSize: "13px",
  color: "#1e3558",
  whiteSpace: "nowrap",
};

const submenuPanelStyle = {
  position: "absolute",
  top: 0,
  left: "95%",
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  zIndex: 20,
  minWidth: "150px",
  paddingLeft: "5px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default FilterBar;
