import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputAdornment,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";

import {
  Inventory,
  Settings,
  AttachMoney,
  FactCheck,
  AssignmentInd,
} from "@mui/icons-material";

import { createAsset } from "../../api/assetApi";   // ← Adjust path if needed
import axiosClient from "../../api/axiosClient";

const Field = ({ error, required, ...props }) => (
  <TextField
    fullWidth
    size="medium"
    error={!!error}
    helperText={error}
    required={required}
    variant="outlined"
    sx={{
      '& .MuiInputBase-root':{
        height: 60,
        width: 500
      }
    }}

    {...props}
  />
);

/* =========================
   FORM FIELD WRAPPER (FIX)
========================= */
const FormField = ({ label, icon, children }) => (
  <Box>
    <Box display="flex" alignItems="center" gap={1} mb={0.8}>
      {icon}
      <Typography variant="body2" fontWeight={600} color="text.secondary">
        {label}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default function AddAssetDialog({ open, onClose }) {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    asset_type: "",
    category_id: "",   
    serial_number: "",
    status: "AVAILABLE",
    location: "",
    purchaseCost: "",
    dateOfPurchase: "",
    os: "",
    ip_address: "",
    lastMaintenance: "",
    nextMaintenance: "",
    assigned_to: "",
  });

  //const [form, setForm] = React.useState(intialForm);
  const [errors, setErrors] = React.useState({});

  // Fetch Categories
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/assets/categories", {
          headers:{Authorization: null}
        });
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    if (open) fetchCategories();
  }, [open]);

  const selectedCategory = categories.find((cat) => cat.id === form.category_id);
  const isITCategory = selectedCategory?.name?.toLowerCase() === "it";

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name?.trim()) newErrors.name = "Asset name is required";
    if (!form.category_id) newErrors.category = "Category is required";
    if (!form.serial_number?.trim()) newErrors.serial_number = "Serial number is required";
    if (!form.location?.trim()) newErrors.location = "Location is required";
    if (!form.purchaseCost) newErrors.purchaseCost = "Purchase cost is required";
    if (!form.dateOfPurchase) newErrors.dateOfPurchase = "Purchase date is required";

    if (isITCategory) {
      if (!form.ip_address) newErrors.ip_address = "IP address is required";
      if (!form.os) newErrors.os = "Operating System is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const newAsset = {
      name: form.name.trim(),
      asset_type: form.asset_type.trim(),
      category_id: form.category_id,
      serial_number: form.serial_number.trim(),
      status: form.status,
      location: form.location.trim(),
      cost: parseFloat(form.purchaseCost) || 0,
      purchase_date: form.dateOfPurchase,
      os: form.os?.trim() || null,
      ip_address: form.ip_address?.trim() || null,
      last_maintenance: form.lastMaintenance || null,
      next_maintenance: form.nextMaintenance || null,
      assigned_to: form.assigned_to?.trim() || null,
    };

    try {
      await createAsset(newAsset);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setForm({
          name: "", asset_type: "", category: "", serial_number: "",
          status: "AVAILABLE", location: "", purchaseCost: "",
          dateOfPurchase: "", os: "", ip_address: "",
          lastMaintenance: "", nextMaintenance: "", assigned_to: ""
        });
        setErrors({});
      }, 1600);
    } catch (err) {
      console.error("Failed to create asset:", err);
      alert("Failed to save asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        minWidth={500}
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={500}>
            Add New Asset
          </Typography>
        </DialogTitle>

        <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mt: 1,
            alignItems: "center",
          }}
        >

          {/* ================= BASIC INFO ================= */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 500 }}>

              <Box sx={{
                backgroundColor: "#e0e0e0",
                padding: "6px 12px",
                borderRadius: "8px",
                mb: 2,
                textAlign: "center",
              }}>
                <Typography fontWeight="bold">
                  Basic Information
                </Typography>
              </Box>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <FormField label="Category">
                    <Field
                      select
                      value={form.category_id}
                      onChange={handleChange("category_id")}
                      error={errors.category_id}
                      required
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Asset Name">
                    <Field
                      value={form.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      required
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Asset Type / Model">
                    <Field
                      value={form.asset_type}
                      onChange={handleChange("asset_type")}
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Serial Number">
                    <Field
                      value={form.serial_number}
                      onChange={handleChange("serial_number")}
                      error={errors.serial_number}
                      required
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Status">
                    <Field
                      select
                      value={form.status}
                      onChange={handleChange("status")}
                    >
                      <MenuItem value="AVAILABLE">Available</MenuItem>
                      <MenuItem value="IN_USE">In Use</MenuItem>
                      <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                      <MenuItem value="RETIRED">Retired</MenuItem>
                    </Field>
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Location">
                    <Field
                      value={form.location}
                      onChange={handleChange("location")}
                      error={errors.location}
                      required
                    />
                  </FormField>
                </Grid>

              </Grid>

            </Box>
          </Box>

          {/* ================= TECHNICAL ================= */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 500 }}>

              <Box sx={{
                backgroundColor: "#e0e0e0",
                padding: "6px 12px",
                borderRadius: "8px",
                mb: 2,
                textAlign: "center",
              }}>
                <Typography fontWeight="bold">
                  Technical Specifications
                </Typography>
              </Box>

              <Grid container spacing={2}>

                {isITCategory ? (
                  <>
                    <Grid item xs={6}>
                      <FormField label="IP Address">
                        <Field
                          value={form.ip_address}
                          onChange={handleChange("ip_address")}
                          error={errors.ip_address}
                          required
                        />
                      </FormField>
                    </Grid>

                    <Grid item xs={6}>
                      <FormField label="Operating System">
                        <Field
                          value={form.os}
                          onChange={handleChange("os")}
                          error={errors.os}
                          required
                        />
                      </FormField>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Typography color="text.secondary" align="center" py={2}>
                      No technical fields required for this category.
                    </Typography>
                  </Grid>
                )}

              </Grid>

            </Box>
          </Box>

          {/* ================= FINANCIAL ================= */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 500 }}>

              <Box sx={{
                backgroundColor: "#e0e0e0",
                padding: "6px 12px",
                borderRadius: "8px",
                mb: 2,
                textAlign: "center",
              }}>
                <Typography fontWeight="bold">
                  Financial Details
                </Typography>
              </Box>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <FormField label="Purchase Cost">
                    <Field
                      type="number"
                      value={form.purchaseCost}
                      onChange={handleChange("purchaseCost")}
                      error={errors.purchaseCost}
                      required
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Purchase Date">
                    <Field
                      type="date"
                      value={form.dateOfPurchase || ""}
                      onChange={handleChange("dateOfPurchase")}
                      error={errors.dateOfPurchase}
                      required
                    />
                  </FormField>
                </Grid>

              </Grid>

            </Box>
          </Box>

          {/* ================= AUDIT ================= */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 500 }}>

              <Box sx={{
                backgroundColor: "#e0e0e0",
                padding: "6px 12px",
                borderRadius: "8px",
                mb: 2,
                textAlign: "center",
              }}>
                <Typography fontWeight="bold">
                  Audit Details
                </Typography>
              </Box>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <FormField label="Assigned To">
                    <Field
                      value={form.assigned_to}
                      onChange={handleChange("assigned_to")}
                      error={errors.assigned_to}
                    />
                  </FormField>
                </Grid>

              </Grid>

            </Box>
          </Box>

        </Box>
      </DialogContent>

        <DialogActions sx={{ px: 3, py: 2.5 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save Asset"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={1600} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" variant="filled">
          Asset added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}