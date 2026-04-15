import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { assetsMock } from "../../components/dashboard/data/assetsMock";
import { useAssetActions } from "../../components/dashboard/assets/AssetActions";
import NewAssetsTable from "../../components/dashboard/assets/NewAssetsTable";

export default function ItAssets() {

  const itAssets = assetsMock.filter(a => a.type === "it");

  const {
    rows,
    handleOpen,
    handleDelete,
    AssetDialog
  } = useAssetActions(itAssets);

  return (
    <Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        IT Assets
      </Typography>

      <NewAssetsTable
        rows={rows}
        onRowClick={handleOpen}
        onDelete={handleDelete}
      />

      <AssetDialog />

    </Box>
  );
}