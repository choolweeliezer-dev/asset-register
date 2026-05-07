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
        width: 150,
      },
    }}
    {...props}
  />
);

export default function MaintenanceFormDialog({ open, onClose }) {
  const queryClient = useQueryClient();

  // =========================
  // STATE
  // =========================
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

  // =========================
  // HANDLE CHANGE
  // =========================
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

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!form.assetCode) {
      newErrors.assetCode = "Asset code is required";
    }

    if (!form.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.performedBy?.trim()) {
      newErrors.performedBy = "Technician name is required";
    }

    if (!form.cost) {
      newErrors.cost = "Maintenance cost is required";
    }

    if (form.status === "PENDING" && !form.scheduledDate) {
      newErrors.scheduledDate = "Scheduled date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // MUTATION
  // =========================
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

  // =========================
  // SUBMIT
  // =========================
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

    console.log("SUBMITTING:", payload);

    try {
      await mutation.mutateAsync(payload);
    } catch (error) {
      console.log(error);
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
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 3,
          },
        }}
      >
        {/* TITLE */}
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Submit Maintenance Report
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Build color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Maintenance Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* ASSET CODE */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Asset Code"
                  value={form.assetCode}
                  onChange={handleChange("assetCode")}
                  error={!!errors.assetCode}
                  helperText={errors.assetCode}
                  required
                />
              </Grid>

              {/* STATUS */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={form.status}
                  onChange={handleChange("status")}
                >
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="FAILED">Failed</MenuItem>
                </TextField>
              </Grid>

              {/* DESCRIPTION */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={form.description}
                  onChange={handleChange("description")}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* SCHEDULING */}
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Event color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Scheduling
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {form.status === "PENDING" && (
                <Grid item xs={12}>
                  <Field
                    type="date"
                    label="Scheduled Date"
                    value={form.scheduledDate}
                    onChange={handleChange("scheduledDate")}
                    error={errors.scheduledDate}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* TECHNICIAN */}
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Engineering color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Technician
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  label="Performed By"
                  value={form.performedBy}
                  onChange={handleChange("performedBy")}
                  error={errors.performedBy}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* COST */}
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AttachMoney color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Cost
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  type="number"
                  label="Maintenance Cost"
                  value={form.cost}
                  onChange={handleChange("cost")}
                  error={errors.cost}
                  required
                />
              </Grid>
            </Grid>
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
            startIcon={
              loading ? <CircularProgress size={18} /> : <Description />
            }
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