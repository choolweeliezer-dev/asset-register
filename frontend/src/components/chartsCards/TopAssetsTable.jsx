import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getTopAssets } from "../../api/dashboardApi";

const columns = [
  { field: "assetCode", headerName: "Code", flex: 1 },
  { field: "assetName", headerName: "Name", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "value", headerName: "Value", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

export default function TopAssetsTable() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopAssets();
  }, []);

  const loadTopAssets = async () => {
    try {
      setLoading(true);

      const data = await getTopAssets();
      console.log("TOP ASSETS:", data);

      setAssets(data);
    } catch (error) {
      console.error("Failed to load top assets", error);
    } finally {
      setLoading(false);
    }
  };

  const rows = (assets || []).map((a) => ({
  id: a.assetCode,
  assetCode: a.assetCode,
  assetName: a.assetName,
  category: a.category,
  value: a.value,
  status: a.status,
}));

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top Assets
        </Typography>

        <Box sx={{ height: 420, width: 1115 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>
  );
}