import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

export default function MaintenanceFormDialog({ open, onClose }) {
  const [form, setForm] = React.useState({});
  const [success, setSuccess] = React.useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    setSuccess(true);

    // close after short delay
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Maintenance Report Form</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>

            {/* GENERAL INFO */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization / Department"
                onChange={handleChange("organization")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Owner Name"
                onChange={handleChange("ownerName")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Designation"
                onChange={handleChange("designation")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                onChange={handleChange("phone")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                onChange={handleChange("email")}
              />
            </Grid>

            {/* MAINTENANCE INFO */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Date & Time"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange("datetime")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                onChange={handleChange("location")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Maintenance Team"
                onChange={handleChange("team")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Headed By"
                onChange={handleChange("headedBy")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Purpose"
                onChange={handleChange("purpose")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Brief Description"
                onChange={handleChange("description")}
              />
            </Grid>

            {/* ENGINEER INFO */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Chief Maintenance Engineer"
                onChange={handleChange("engineer")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Engineer Email"
                onChange={handleChange("engineerEmail")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Engineer Phone"
                onChange={handleChange("engineerPhone")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Report Date"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange("reportDate")}
              />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS MESSAGE */}
      <Snackbar
        open={success}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Form submitted successfully
        </Alert>
      </Snackbar>
    </>
  );
}