import axiosClient from "./axiosClient";

const USERS_BASE = "/users";

export const usersApi = {
  // Get all users
  getAll: async () => {
    const response = await axiosClient.get(USERS_BASE);
    return response.data;
  },

  // Create user
  create: async (userData) => {
    const response = await axiosClient.post(`${USERS_BASE}/register`, userData);
    return response.data;
  },

  // Update user (assuming endpoint exists)
  update: async (id, userData) => {
    const response = await axiosClient.put(`${USERS_BASE}/update/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id) => {
    const response = await axiosClient.delete(`${USERS_BASE}/delete/${id}`);
    return response.data;
  },

  getAllaudits: async () => {
    const response = await axiosClient.get("/users/audit");
    return response.data;
  },
};