// components/UploadPlaceholder.jsx
import React from "react";

const UploadPlaceholder = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "inline-block",
          padding: "8px 16px",
          background: "#8c7732",
          color: "white",
          borderRadius: "4px",
          opacity: 0.6,
          cursor: "not-allowed",
        }}
      >
        Upload ZIP
      </label>
    </div>
  );
};

export default UploadPlaceholder;
