import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";

export function useAssetActions(rows, setRows) {

  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  // ================= OPEN =================
  const handleOpen = (asset) => {
    setSelectedAsset(asset);
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsset(null);
    setEditMode(false);
  };

  // ================= EDIT =================
  const handleEditChange = (field, value) => {
    setSelectedAsset((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = () => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === selectedAsset.id ? selectedAsset : item
      )
    );

    handleClose();
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    setRows((prev) => prev.filter((item) => item.id !== id));

    if (selectedAsset?.id === id) {
      handleClose();
    }
  };

  // ================= MODAL =================
  const AssetDialog = () => (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {editMode ? "Edit Asset" : "Asset Details"}
      </DialogTitle>

      <DialogContent>
        {selectedAsset && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField label="ID" value={selectedAsset.id} disabled />

            <TextField
              label="Name"
              value={selectedAsset.name || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <TextField
              label="Category"
              value={selectedAsset.category || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("category", e.target.value)}
            />

            <TextField
              label="Status"
              value={selectedAsset.status || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("status", e.target.value)}
            />

            <TextField
              label="Location"
              value={selectedAsset.location || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("location", e.target.value)}
            />

            <TextField
              label="Assigned To"
              value={selectedAsset.assignedTo || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("assignedTo", e.target.value)}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {!editMode ? (
          <>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
            <Button color="error" onClick={() => handleDelete(selectedAsset.id)}>
              Delete
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );

  return {
    handleOpen,
    handleDelete,
    AssetDialog,
  };
}