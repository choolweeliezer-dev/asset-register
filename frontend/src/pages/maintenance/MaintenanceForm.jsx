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
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";

import {
  Build,
  Engineering,
  Event,
  AttachMoney,
  Description,
} from "@mui/icons-material";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMaintenance } from "../../api/maintenanceApi";

// =========================
// REUSABLE FIELD
// =========================
const Field = ({ error, required, ...props }) => (
  <TextField
    fullWidth
    size="medium"
    variant="outlined"
    error={!!error}
    helperText={error}
    required={required}
    sx={{
      "& .MuiInputBase-root": {
        height: 60,
        width: 500,
      },
    }}
    {...props}
  />
);

// =========================
// FORM FIELD WRAPPER (NEW)
// =========================
const FormField = ({ label, children }) => (
  <Box>
    <Typography
      variant="body2"
      fontWeight={600}
      color="text.secondary"
      sx={{ mb: 0.8 }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

export default function MaintenanceFormDialog({ open, onClose }) {
  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const [form, setForm] = React.useState({
    assetCode: "",
    description: "",
    scheduledDate: "",
    cost: "",
    performedBy: "",
    status: "PENDING",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.assetCode) newErrors.assetCode = "Asset code is required";
    if (!form.description?.trim())
      newErrors.description = "Description is required";
    if (!form.performedBy?.trim())
      newErrors.performedBy = "Technician name is required";
    if (!form.cost) newErrors.cost = "Maintenance cost is required";

    if (form.status === "PENDING" && !form.scheduledDate) {
      newErrors.scheduledDate = "Scheduled date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: createMaintenance,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance-records"],
      });

      setSuccess(true);

      setForm({
        assetCode: "",
        description: "",
        scheduledDate: "",
        cost: "",
        performedBy: "",
        status: "PENDING",
      });

      setErrors({});

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    },

    onError: (error) => {
      console.log("CREATE MAINTENANCE ERROR:", error);
      alert("Failed to create maintenance report");
    },
  });

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      assetCode: form.assetCode,
      description: form.description.trim(),
      scheduledDate:
        form.status === "PENDING" ? form.scheduledDate : null,
      cost: parseFloat(form.cost) || 0,
      performedBy: form.performedBy.trim(),
      status: form.status,
    };

    try {
      await mutation.mutateAsync(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
       PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(180deg, #2e3643 0%, #072c68 100%)",
        },
      }}
    >
      {/* TITLE */}
      <DialogTitle
      sx={{
        color: "#f5f5f5",
      }}>
        <Typography variant="h6" fontWeight={600}>
          Submit Maintenance Report
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
            py: 4,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.35) 100%)",
            backdropFilter: "blur(6px)",
          }}
        >

          {/* ================= MAINTENANCE INFO ================= */}
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
                  Maintenance Information
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormField label="Asset Code">
                    <Field
                      value={form.assetCode}
                      onChange={handleChange("assetCode")}
                      error={errors.assetCode}
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
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="FAILED">Failed</MenuItem>
                    </Field>
                  </FormField>
                </Grid>

                <Grid item xs={12}>
                  <FormField label="Description">
                    <Field
                      multiline
                      rows={2}
                      value={form.description}
                      onChange={handleChange("description")}
                      error={errors.description}
                    />
                  </FormField>
                </Grid>
              </Grid>

            </Box>
          </Box>

          {/* ================= SCHEDULING ================= */}
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
                  Scheduling
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {form.status === "PENDING" && (
                  <Grid item xs={6}>
                    <FormField label="Scheduled Date">
                      <Field
                        type="date"
                        value={form.scheduledDate}
                        onChange={handleChange("scheduledDate")}
                        error={errors.scheduledDate}
                      />
                    </FormField>
                  </Grid>
                )}
              </Grid>

            </Box>
          </Box>

          {/* ================= TECHNICIAN ================= */}
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
                  Technician
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormField label="Performed By">
                    <Field
                      value={form.performedBy}
                      onChange={handleChange("performedBy")}
                      error={errors.performedBy}
                    />
                  </FormField>
                </Grid>
              </Grid>

            </Box>
          </Box>

          {/* ================= COST ================= */}
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
                  Cost
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormField label="Maintenance Cost">
                    <Field
                      type="number"
                      value={form.cost}
                      onChange={handleChange("cost")}
                      error={errors.cost}
                    />
                  </FormField>
                </Grid>
              </Grid>

            </Box>
          </Box>

        </Box>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </DialogActions>
    </Dialog>

    {/* SUCCESS */}
    <Snackbar
      open={success}
      autoHideDuration={1500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled">
        Maintenance report submitted successfully!
      </Alert>
    </Snackbar>
  </>
  );
}