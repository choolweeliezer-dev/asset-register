import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { assetsMock } from "../../components/dashboard/data/assetsMock";
import NewAssetsTable from "../../components/dashboard/assets/NewAssetsTable";

export default function ItAssets() {

  // ✅ LOCAL DATA ONLY
  const [data] = React.useState(assetsMock.filter(a => a.type === "it"));

  // ✅ FILTER STATE
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("");

  // ✅ FILTER LOGIC
  const filteredRows = data.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter ? item.status === statusFilter : true;

    const matchesLocation =
      locationFilter ? item.location === locationFilter : true;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <Box>

      {/* HEADER */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        IT Assets
      </Typography>

      {/* FILTER BAR */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>

        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          select
          label="Location"
          size="small"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="HQ">HQ</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
        </TextField>

      </Box>

      {/* TABLE */}
      <NewAssetsTable
        rows={filteredRows}
        onRowClick={() => {}}
        onDelete={() => {}}
      />

    </Box>
  );
}