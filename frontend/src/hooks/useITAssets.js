import { useQuery } from "@tanstack/react-query";
import { getAssetSummary } from "../api/assetApi";

export const useITAssets = () => {
  return useQuery({
    queryKey: ["assets", "it"],
    queryFn: () => getAssetSummary(1), // IT categoryId
  });
};