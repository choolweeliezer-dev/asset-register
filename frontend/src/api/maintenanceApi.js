// maintenanceApi.js

import axiosClient from "./axiosClient";

// =========================
// GET ALL MAINTENANCE
// =========================
export const getAllMaintenance = () => {
  return axiosClient.get("/maintenance");
};

// =========================
// GET SINGLE MAINTENANCE
// =========================
export const getMaintenanceById = (id) => {
  return axiosClient.get(`/maintenance/${id}`);
};

// =========================
// CREATE MAINTENANCE
// =========================
export const createMaintenance = (data) => {
  return axiosClient.post("/maintenance", data);
};

// =========================
// START MAINTENANCE
// =========================
export const startMaintenance = (id) => {
  return axiosClient.post(`/maintenance/start/${id}`);
};

// =========================
// COMPLETE MAINTENANCE
// =========================
export const completeMaintenance = (id) => {
  return axiosClient.post(`/maintenance/complete/${id}`);
};

// =========================
// FAIL MAINTENANCE
// =========================
export const failMaintenance = (id) => {
  return axiosClient.post(`/maintenance/fail/${id}`);
};

// =========================
// UPDATE MAINTENANCE
// =========================
export const updateMaintenance = (id, data) => {
  return axiosClient.put(`/maintenance/${id}`, data);
};