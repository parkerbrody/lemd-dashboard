// components/FileUpload.js
import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      setStatus(`Uploaded ${data.num_messages} messages successfully!`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        style={{ border: "1px solid #000", borderRadius: "5px", padding: "5px" }}
      />
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "#1e3558",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
      {status && <span style={{ color: "#8c7732" }}>{status}</span>}
    </div>
  );
};

export default FileUpload;
