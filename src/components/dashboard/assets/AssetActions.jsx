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

const STORAGE_KEY = "assets_data";

export function useAssetActions(initialRows = []) {

  // ✅ single source of truth
  const [rows, setRows] = React.useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialRows;
  });

  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  // ❌ REMOVE the bugged reset effect
  // (THIS WAS BREAKING YOUR DELETE)
  // React.useEffect(() => {
  //   setRows(initialRows);
  // }, [initialRows]);

  // ✅ save to localStorage ONLY when rows change
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

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

    setEditMode(false);
    setOpen(false);
  };

  // ================= DELETE (FIXED) =================
  const handleDelete = (id) => {
    setRows((prev) => prev.filter((item) => item.id !== id));

    // close modal if deleting open item
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
            {/* ID */}
            <TextField
              label="ID"
              value={selectedAsset.id}
              disabled
            />

            <TextField
              label="Name"
              value={selectedAsset.name || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <TextField
              label="Type"
              value={selectedAsset.type || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("type", e.target.value)}
            />

            <TextField
              label="Category"
              value={selectedAsset.category || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("category", e.target.value)}
            />

            <TextField
              label="Serial Number"
              value={selectedAsset.serialNumber || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("serialNumber", e.target.value)
              }
            />

            <TextField
              label="Status"
              value={selectedAsset.status || ""}
              disabled={!editMode}
              onChange={(e) => handleEditChange("status", e.target.value)}
            />

            <TextField
              label="IP Address"
              value={selectedAsset.ipAddress || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("ipAddress", e.target.value)
              }
            />

            <TextField
              label="Location"
              value={selectedAsset.location || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("location", e.target.value)
              }
            />

            <TextField
              label="Assigned To"
              value={selectedAsset.assignedTo || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("assignedTo", e.target.value)
              }
            />

            <TextField
              label="Last Maintenance"
              value={selectedAsset.lastMaintenance || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("lastMaintenance", e.target.value)
              }
            />

            <TextField
              label="Next Maintenance"
              value={selectedAsset.nextMaintenance || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("nextMaintenance", e.target.value)
              }
            />

            <TextField
              label="Purchase Date"
              value={selectedAsset.purchaseDate || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("purchaseDate", e.target.value)
              }
            />

            <TextField
              label="Purchase Cost"
              value={selectedAsset.purchaseCost || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("purchaseCost", e.target.value)
              }
            />

            <TextField
              label="Insurance"
              value={selectedAsset.insuranceCoverage || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("insuranceCoverage", e.target.value)
              }
            />

            <TextField
              label="Warranty"
              value={selectedAsset.warranty || ""}
              disabled={!editMode}
              onChange={(e) =>
                handleEditChange("warranty", e.target.value)
              }
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
    rows,
    handleOpen,
    handleDelete,
    handleSave,
    handleEditChange,
    AssetDialog,
  };
}