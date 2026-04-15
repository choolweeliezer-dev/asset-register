import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { assetsMock } from "../../components/dashboard/data/assetsMock";
import NewAssetsTable from "../../components/dashboard/assets/NewAssetsTable";
import { useAssetActions } from "../../components/dashboard/assets/AssetActions";

export default function MainAssets() {

  // filter MAIN assets (NOT IT)
  //const mainAssets = assetsMock.filter(a => a.type !== "it");
  const mainAssets = assetsMock.filter(
  (a) => a.type && a.type.toLowerCase() === "main");
  const {
    rows,
    handleOpen,
    handleDelete,
    AssetDialog
  } = useAssetActions(mainAssets);

  return (
    <Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Main Assets
      </Typography>

      <NewAssetsTable
        rows={rows}
        onRowClick={handleOpen}
        onDelete={handleDelete}
      />

      {/* MODAL / SIDE PANEL */}
      <AssetDialog />

    </Box>
  );
}