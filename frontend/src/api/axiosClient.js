// axiosClient.js

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    console.log("======== AXIOS REQUEST ========");
    console.log("➡️ URL:", config.url);
    console.log("➡️ METHOD:", config.method);
    console.log("➡️ TOKEN FROM STORAGE:", token);

    // 🚫 DO NOT attach token to login request
    if (config.url.includes("/users/login")) {
      console.log("🚫 Skipping token for login request");
      console.log("================================");
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("➡️ FINAL HEADERS SENT:", config.headers);
    console.log("================================");

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE SUCCESS:", response.config.url);
    return response;
  },
  (error) => {
    console.log("❌ RESPONSE ERROR:", error.config?.url);
    console.log("❌ STATUS:", error.response?.status);
    console.log("❌ DATA:", error.response?.data);

    return Promise.reject(error);
  }
);

export default axiosClient;