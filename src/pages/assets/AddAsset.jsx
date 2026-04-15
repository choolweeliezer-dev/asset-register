import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

export default function AddAsset() {
  const [assetType, setAssetType] = React.useState('main');

  const [form, setForm] = React.useState({
    id: '',
    name: '',
    category: '',
    serialNumber: '',
    status: '',
    location: '',
    assignedTo: '',
    purchaseCost: '',
    insuranceCoverage: '',
    dateOfPurchase: '',
    nextMaintenance: '',
    ipAddress: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAsset = {
    id: form.id,
    name: form.name,
    category: form.category,
    serialNumber: form.serialNumber,
    status: form.status,
    location: form.location,
    assignedTo: form.assignedTo,
    purchaseCost: form.purchaseCost,
    insuranceCoverage: form.insuranceCoverage,
    dateOfPurchase: form.dateOfPurchase,
    nextMaintenance: form.nextMaintenance,
    ipAddress: form.ipAddress,
    type: assetType,
  };

  // get existing assets
  const existing = JSON.parse(localStorage.getItem("assetsMock")) || [];

  // add new asset
  const updated = [...existing, newAsset];

  // save back
  localStorage.setItem("assetsMock", JSON.stringify(updated));

  console.log("ASSET SAVED:", newAsset);
};

  const Field = (props) => (
    <TextField fullWidth size="small" {...props} />
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add New Asset
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          
          {/* TOP: TYPE SELECT */}
          <Box sx={{ mb: 3 }}>
            <Field
              select
              label="Asset Type"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <MenuItem value="main">Main Asset</MenuItem>
              <MenuItem value="it">IT Asset</MenuItem>
            </Field>
          </Box>

          {/* MAIN GRID */}
          <Grid container spacing={2} sx={{width:'100%'}}>
            
            {/* LEFT SIDE */}
            <Grid item xs={12} md={5} sx={{display: 'flex'}}>
              
              {/* Financial */}
              <Card sx={{ mb: 2, width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Financial Information
                  </Typography>

                  <Stack spacing={2}>
                    <Field
                      name="purchaseCost"
                      label="Purchase Cost"
                      onChange={handleChange}
                    />
                    <Field
                      name="insuranceCoverage"
                      label="Insurance Coverage"
                      onChange={handleChange}
                    />
                  </Stack>
                </CardContent>
              </Card>

              {/* Maintenance */}
              <Card sx={{width:'100%'}}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Maintenance Information
                  </Typography>

                  <Stack spacing={2}>
                    <Field
                      name="dateOfPurchase"
                      label="Date of Purchase"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />

                    <Field
                      name="nextMaintenance"
                      label="Next Maintenance"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Stack>
                </CardContent>
              </Card>

            </Grid>

            {/* RIGHT SIDE */}
            <Grid item xs={12} md={6} sx={{display: 'flex'}}>
              <Card sx={{width: '100%'}}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    General Information
                  </Typography>

                  <Stack spacing={2}>
                    <Field name="id" label="Asset ID" onChange={handleChange} />
                    <Field name="name" label="Asset Name" onChange={handleChange} />
                    <Field name="category" label="Category" onChange={handleChange} />
                    <Field name="serialNumber" label="Serial Number" onChange={handleChange} />
                    <Field name="status" label="Status" onChange={handleChange} />
                    <Field name="location" label="Location" onChange={handleChange} />
                    <Field name="assignedTo" label="Assigned To" onChange={handleChange} />

                    {/* IT only */}
                    {assetType === 'it' && (
                      <Field
                        name="ipAddress"
                        label="IP Address"
                        onChange={handleChange}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

          </Grid>

          {/* SUBMIT */}
          <Box sx={{ mt: 3 }}>
            <Button fullWidth variant="contained" type="submit">
              Save Asset
            </Button>
          </Box>

        </form>
      </Paper>
    </Box>
  );
  
}