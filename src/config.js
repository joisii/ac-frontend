const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://ac-backend.onrender.com" // <-- replace with your Render backend URL
    : "http://localhost:5000"; // local dev

export default API_BASE;
