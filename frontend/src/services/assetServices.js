import { assetsMock } from "../components/dashboard/data/assetsMock";

export const getAssetsByType = (type) => {
  return assetsMock.filter((asset) => asset.type === type);
};

export const getAllAssets = () => {
  return assetsMock;
};