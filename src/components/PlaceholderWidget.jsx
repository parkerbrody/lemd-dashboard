import React from "react";

const PlaceholderWidget = ({ title }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#555",
        fontSize: "1.2rem",
        fontWeight: "500",
        height: "250px",
      }}
    >
      {title}
    </div>
  );
};

export default PlaceholderWidget;
