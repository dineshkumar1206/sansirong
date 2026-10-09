import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const originalFetch = window.fetch;
window.fetch = async (resource, config = {}) => {
  const urlStr = resource instanceof URL ? resource.toString() : (typeof resource === 'string' ? resource : null);
  if (urlStr && urlStr.includes('/api') && !urlStr.includes('/api/auth/login')) {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers instanceof Headers) {
        config.headers.append('Authorization', `Bearer ${token}`);
      } else {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      }
    }
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
