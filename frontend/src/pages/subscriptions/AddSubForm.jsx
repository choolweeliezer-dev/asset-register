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
        width: 250
      }
    }}
    {...props}
  />
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
          <Typography variant="h6" fontWeight={600}>
            Add Subscription
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ py: 4 }}>

          {/* BASIC INFO */}
          <Box sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Subscriptions color="primary" />
              <Typography variant="h6">Basic Information</Typography>
            </Box>

            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <Field
                  label="Subscription Name"
                  value={form.name}
                  onChange={handleChange("name")}
                  error={errors.name}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  select
                  label="Type"
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
              </Grid>

            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* DATES */}
          <Box sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <DateRange color="primary" />
              <Typography variant="h6">Duration</Typography>
            </Box>

            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <Field
                  type="date"
                  label="Start Date"
                  value={form.startDate}
                  onChange={handleChange("startDate")}
                  error={errors.startDate}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  type="date"
                  label="End Date"
                  value={form.endDate}
                  onChange={handleChange("endDate")}
                  error={errors.endDate}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* COST */}
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AttachMoney color="primary" />
              <Typography variant="h6">Financial Details</Typography>
            </Box>

            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <Field
                  label="Cost"
                  type="number"
                  value={form.cost}
                  onChange={handleChange("cost")}
                  error={errors.cost}
                  required
                />
              </Grid>

            </Grid>
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