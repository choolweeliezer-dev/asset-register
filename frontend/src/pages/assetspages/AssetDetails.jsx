import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from "@mui/material";

import { getAssets, deleteAsset } from "../../api/assetApi";

export default function AssetDetails() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const res = await getAssets();
      setAssets(res.data);
    } catch (err) {
      setError("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  // ================= BULK SELECTION =================
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteAsset(id)));
      clearSelection();
      loadAssets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkExport = () => {
    console.log("Export PDF for:", selectedIds);
  };

  // ================= FILTER =================
  const filteredAssets = categoryFilter
    ? assets.filter((a) => a.general?.categoryId === categoryFilter)
    : assets;

  const getStatusColor = (status) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "maintenance":
        return "warning";
      default:
        return "error";
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "N/A";

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Asset Details
      </Typography>

      {/* ================= FILTER ================= */}
      <ToggleButtonGroup
    value={categoryFilter}
    exclusive
    onChange={(e, val) => setCategoryFilter(val)}
    sx={{ mb: 3 }}
  >
    <ToggleButton value={1}>IT Assets</ToggleButton>
    <ToggleButton value={3}>Main Assets</ToggleButton>
  </ToggleButtonGroup>

      {/* ================= BULK ACTION BAR ================= */}
      {selectedIds.length > 0 && (
        <Box
          mb={3}
          p={2}
          sx={{
            background: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="500">
          {selectedIds.length} asset(s) selected
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip label="Delete" color="error" onClick={handleBulkDelete} clickable />
            <Chip label="Export PDF" color="success" onClick={handleBulkExport} clickable />
            <Chip label="Clear" onClick={clearSelection} clickable />
          </Stack>
        </Box>
      )}

      {/* ================= GRID ================= */}
      <Box mt={2}>
        <Grid container spacing={2}>
        {filteredAssets.map((asset) => {
          const g = asset.general;
          const t = asset.technical;
          const f = asset.financial;
          const m = asset.maintenance;
          const a = asset.audit;

          const isSelected = selectedIds.includes(g.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={g.id}>
              <Card
                onClick={() => toggleSelect(g.id)}
                onMouseEnter={() => setHovered(g.id)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  transition: "0.3s",
                  transform: isSelected
                    ? "scale(1.02)"
                    : hovered === g.id
                    ? "scale(1.02)"
                    : "scale(1)",
                  boxShadow: isSelected
                    ? 8
                    : hovered === g.id
                    ? 6
                    : 2,
                  border: isSelected
                    ? "2px solid #1976d2"
                    : "1px solid #eee",
                }}
              >
                <CardContent>

                  {/* ================= GENERAL ================= */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" noWrap>
                      {g.name}
                    </Typography>

                    <Chip
                      label={g.status}
                      size="small"
                      color={getStatusColor(g.status)}
                    />
                  </Stack>

                  <Typography variant="body2">
                    <b>Code:</b> {g.assetCode}
                  </Typography>

                  <Typography variant="body2">
                    <b>Category:</b> {g.categoryName}
                  </Typography>

                  <Typography variant="body2">
                    <b>Location:</b> {g.location}
                  </Typography>

                  <Typography variant="body2">
                    <b>Serial:</b> {g.serialNumber}
                  </Typography>

                  <Typography variant="body2">
                    <b>Type:</b> {g.assetType}
                  </Typography>

                  {/* ================= HOVER DETAILS ================= */}
                  {hovered === g.id && (
                    <Box mt={2} pt={2} borderTop="1px dashed #ddd">

                      <Typography variant="subtitle2" fontWeight="bold">
                        Technical
                      </Typography>
                      <Typography variant="body2">
                        <i>OS:</i> {t?.os || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <i>IP Address:</i> {t?.ipAddress || "N/A"}
                      </Typography>

                      <Box mt={1.5}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Financial
                        </Typography>
                        <Typography variant="body2">
                          <i>Cost:</i> {f?.purchaseCost || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Vendor:</i> {f?.vendor || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Warranty:</i> {f?.warranty || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Insurance:</i> {f?.insuranceCoverage || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Current Value:</i> {f?.currentValue || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Purchase Date:</i> {formatDate(f?.purchaseDate)}
                        </Typography>
                      </Box>

                      <Box mt={1.5}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Maintenance
                        </Typography>
                        <Typography variant="body2">
                          <i>Last:</i> {formatDate(m?.lastMaintenance)}
                        </Typography>
                        <Typography variant="body2">
                          <i>Next:</i> {formatDate(m?.nextMaintenance)}
                        </Typography>
                      </Box>

                      <Box mt={1.5}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Audit
                        </Typography>
                        <Typography variant="body2">
                          <i>Created By:</i> {a?.createdBy || "System"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Updated By:</i> {a?.updatedBy || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          <i>Created At:</i> {formatDate(a?.createdAt)}
                        </Typography>
                        <Typography variant="body2">
                          <i>Updated At:</i> {formatDate(a?.updatedAt)}
                        </Typography>
                      </Box>

                    </Box>
                  )}

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      </Box>
    </Box>
  );
}