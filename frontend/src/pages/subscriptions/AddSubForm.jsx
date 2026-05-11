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
  Subscriptions,
  AttachMoney,
  DateRange,
} from "@mui/icons-material";

import { createSubscription } from "../../api/subsApi";

const Field = ({ error, required, ...props }) => (
  <TextField
    fullWidth
    size="medium"
    error={!!error}
    helperText={error}
    required={required}
    variant="outlined"
    sx={{
      '& .MuiInputBase-root': {
        height: 60,
        width: 500
      }
    }}
    {...props}
  />
);

/* =========================
   FORM FIELD WRAPPER (ADDED)
========================= */
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

export default function AddSubscriptionDialog({ open, onClose }) {

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [form, setForm] = React.useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    cost: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name?.trim()) newErrors.name = "Subscription name is required";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    if (!form.cost) newErrors.cost = "Cost is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name: form.name.trim(),
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      cost: parseFloat(form.cost),
    };

    try {
      await createSubscription(payload);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();

        setForm({
          name: "",
          type: "",
          startDate: "",
          endDate: "",
          cost: "",
        });

        setErrors({});
      }, 1200);

    } catch (err) {
      console.error("Failed to create subscription:", err);
      alert("Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

        <DialogTitle>
          <Typography variant="h6" fontWeight={500}>
            Add Subscription
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
                  <FormField label="Subscription Name">
                    <Field
                      value={form.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      required
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="Type">
                    <Field
                      select
                      value={form.type}
                      onChange={handleChange("type")}
                      error={errors.type}
                      required
                    >
                      <MenuItem value="MONTHLY">Monthly</MenuItem>
                      <MenuItem value="QUARTERLY">Quarterly</MenuItem>
                      <MenuItem value="ANNUALLY">Annually</MenuItem>
                      <MenuItem value="MORE_THAN_ONE_YEAR">1-5 Years</MenuItem>
                      <MenuItem value="FIVE_PLUS_YEARS">5+ Years</MenuItem>
                    </Field>
                  </FormField>
                </Grid>

              </Grid>

            </Box>
          </Box>

          {/* ================= DURATION ================= */}
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
                  Duration
                </Typography>
              </Box>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <FormField label="Start Date">
                    <Field
                      type="date"
                      value={form.startDate}
                      onChange={handleChange("startDate")}
                      error={errors.startDate}
                      required
                    />
                  </FormField>
                </Grid>

                <Grid item xs={6}>
                  <FormField label="End Date">
                    <Field
                      type="date"
                      value={form.endDate}
                      onChange={handleChange("endDate")}
                      error={errors.endDate}
                      required
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
                  Financial Details
                </Typography>
              </Box>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <FormField label="Cost">
                    <Field
                      type="number"
                      value={form.cost}
                      onChange={handleChange("cost")}
                      error={errors.cost}
                      required
                    />
                  </FormField>
                </Grid>

              </Grid>

            </Box>
          </Box>

        </Box>
      </DialogContent>


        <DialogActions sx={{ px: 3, py: 2 }}>

          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save Subscription"}
          </Button>

        </DialogActions>

      </Dialog>

      {/* SUCCESS */}
      <Snackbar
        open={success}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Subscription created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}