// src/config.js
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://parkerlbrody-lemd.hf.space";

export default API_BASE_URL;