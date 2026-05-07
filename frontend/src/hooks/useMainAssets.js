import { useQuery } from "@tanstack/react-query";
import { getAssetSummary } from "../api/assetApi";

export const useMainAssets = () => {
  return useQuery({
    queryKey: ["assets", "main"],
    queryFn: () => getAssetSummary(2), // MAIN categoryId
  });
};