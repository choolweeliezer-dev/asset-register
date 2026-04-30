import axiosClient from "./axiosClient";

// Login function
export const loginUser = (credentials) => {
  return axiosClient.post("/users/login", credentials);
};