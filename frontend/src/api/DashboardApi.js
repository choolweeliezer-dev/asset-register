import axiosClient from "./axiosClient";

export const getDashboardSummary = async () => {
  const response = await axiosClient.get("/dashboard/summary");
  return response.data;
};

export const getMaintenanceStatus = async () => {
  const response = await axiosClient.get(
    "/dashboard/maintenancestatus"
  );
  return response.data;
};

export const getFinancialAllocation = async () => {
  const response = await axiosClient.get(
    "/dashboard/financialallocation"
  );
  return response.data;
};

export const getTopAssets = async () => {
  const response = await axiosClient.get("/dashboard/topassets");
  return response.data;
};