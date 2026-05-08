import { jwtDecode } from "jwt-decode";

export const getRole = () => {
  const token = localStorage.getItem("authToken");   // ← Fixed

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;   // make sure your backend puts "role" in the token
  } catch (err) {
    console.error("Invalid JWT token", err);
    localStorage.removeItem("authToken"); // clean up bad token
    return null;
  }
};