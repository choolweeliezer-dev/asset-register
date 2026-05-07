import axiosClient from "./axiosClient";

// GET all assets
export const getAssets = (categoryId) => {
  return axiosClient.get("/assets", {
    params: categoryId ? { categoryId } : {},
  });
};

// GET summary (IT / MAIN table)
export const getAssetSummary = (categoryId) => {
  return axiosClient.get("/assets/summary", {
    params: categoryId ? { categoryId } : {},
  });
};

// GET single asset
export const getAssetById = (id) => {
  return axiosClient.get(`/assets/${id}`);
};

export const getAssetsById = async (id) => {
  const response = await axiosClient.get(`/assets/${id}`);
  return response.data;
};

// CREATE asset (ADMIN)
export const createAsset = (data) => {
  return axiosClient.post("/assets", data);
};

// UPDATE asset (ADMIN)
export const updateAsset = (id, data) => {
  console.log("🚀 updateAsset CALLED");
  console.log("🚀 ID:", id);
  console.log("🚀 DATA:", data);
  return axiosClient.put(`/assets/${id}`, data);
};

// DELETE asset (ADMIN)
export const deleteAsset = (id) => {
  return axiosClient.delete(`/assets/${id}`);
};

// GET all categories
export const getCategories = () => {
  return axiosClient.get("/categories");
};
