import * as React from "react";
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Paper, TablePagination,
  TextField, MenuItem, Box,
  Drawer, Typography, Divider, Button, IconButton
} from "@mui/material";

export default function NewAssetsTable({
  rows = [],
  onDelete,
  onUpdate
}) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);

  // ================= OPEN DRAWER =================
  const handleOpen = (asset) => {
    setSelectedAsset({ ...asset }); // clone to avoid direct mutation
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsset(null);
    setEditMode(false);
  };

  // ================= EDIT HANDLER =================
  const handleChange = (field, value) => {
    setSelectedAsset((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = () => {
    if (onUpdate && selectedAsset) {
      onUpdate(selectedAsset);
    }
    setEditMode(false);
    setOpen(false);
  };

  // ================= DELETE =================
  const handleDeleteClick = (id) => {
    if (onDelete) {
      onDelete(id);
    }

    // close drawer if deleting current item
    if (selectedAsset?.id === id) {
      handleClose();
    }
  };

  // ================= FILTERING =================
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name?.toLowerCase().includes(search.toLowerCase()) ||
      row.location?.toLowerCase().includes(search.toLowerCase()) ||
      row.assignedTo?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || row.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || row.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // ================= PAGINATION =================
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ p: 2 }}>

      {/* ================= FILTER BAR ================= */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />

        <TextField
          size="small"
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          size="small"
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Desktop">Desktop</MenuItem>
          <MenuItem value="Server">Server</MenuItem>
        </TextField>

      </Box>

      {/* ================= TABLE ================= */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((asset) => (
            <TableRow
              key={asset.id}
              hover
              onClick={() => handleOpen(asset)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "action.hover" }
              }}
            >

              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.status}</TableCell>
              <TableCell>{asset.location}</TableCell>

              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(asset.id)}
                >
                  🗑
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>

      {/* ================= PAGINATION ================= */}
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {/* ================= DRAWER ================= */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 500, p: 2 } }}
      >

        <Typography variant="h6" sx={{ mb: 2 }}>
          {editMode ? "Edit Asset" : "Asset Details"}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {selectedAsset && (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>

            <TextField label="ID" value={selectedAsset.id} disabled />

            <TextField
              label="Name"
              value={selectedAsset.name || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <TextField
              label="Type"
              value={selectedAsset.type || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("type", e.target.value)}
            />

            <TextField
              label="Category"
              value={selectedAsset.category || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("category", e.target.value)}
            />

            <TextField
              label="Serial No"
              value={selectedAsset.serialNumber || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("serialNumber", e.target.value)}
            />

            <TextField
              label="Status"
              value={selectedAsset.status || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("status", e.target.value)}
            />

            <TextField
              label="IP Address"
              value={selectedAsset.ipAddress || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("ipAddress", e.target.value)}
            />

            <TextField
              label="Location"
              value={selectedAsset.location || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("location", e.target.value)}
            />

            <TextField
              label="Assigned To"
              value={selectedAsset.assignedTo || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
            />

            <TextField
              label="Last Maintenance"
              value={selectedAsset.lastMaintenance || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("lastMaintenance", e.target.value)}
            />

            <TextField
              label="Next Maintenance"
              value={selectedAsset.nextMaintenance || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("nextMaintenance", e.target.value)}
            />

            <TextField
              label="Purchase Date"
              value={selectedAsset.purchaseDate || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("purchaseDate", e.target.value)}
            />

            <TextField
              label="Purchase Cost"
              value={selectedAsset.purchaseCost || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("purchaseCost", e.target.value)}
            />

            <TextField
              label="Insurance"
              value={selectedAsset.insuranceCoverage || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("insuranceCoverage", e.target.value)}
            />

            <TextField
              label="Warranty"
              value={selectedAsset.warranty || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("warranty", e.target.value)}
            />

          </Box>
        )}

        {/* ================= ACTIONS ================= */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>

          {!editMode ? (
            <>
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Edit
              </Button>

              <Button color="error" onClick={() => handleDeleteClick(selectedAsset.id)}>
                Delete
              </Button>

              <Button onClick={handleClose}>
                Close
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>

              <Button onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          )}

        </Box>

      </Drawer>

    </Paper>
  );
}