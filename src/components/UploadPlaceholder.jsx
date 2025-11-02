// src/components/UploadPlaceholder.jsx
import React from "react";

const UploadPlaceholder = () => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="file"
        accept=".zip"
        disabled
        style={{
          border: "1px solid #000",
          borderRadius: "5px",
          padding: "5px",
          cursor: "not-allowed",
          opacity: 0.6,
        }}
      />
      <button
        disabled
        style={{
          backgroundColor: "#1e3558",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "6px 12px",
          cursor: "not-allowed",
          opacity: 0.6,
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPlaceholder;
