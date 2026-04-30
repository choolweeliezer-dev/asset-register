import * as React from "react";
import axios from "axios";

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
} from "@mui/material";

const Field = (props) => (
    <TextField fullWidth size="small" {...props} />
  );

export default function AddAsset() {
  const [categories, setCategories] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    asset_type: "",
    category: "",
    serial_number: "",
    status: "",
    location: "",
    dateOfPurchase: "",
    purchaseCost: "",
    ip_address: "",
    os: "",
  });

  // fetch categories
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const selectedCategory = categories.find(
  (cat) => cat.id === form.category
   );

   const categoryName = selectedCategory?.name?.toLowerCase();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAsset = {
      name: form.name,
      asset_type: form.asset_type,
      category_id: form.category,
      serial_number: form.serial_number,
      status: form.status || "active",
      location: form.location,
      cost: form.purchaseCost,
      purchase_date: form.dateOfPurchase,
      os: form.os,
      ip_address: form.ip_address || null,
    };

    try {
      await axios.post("http://localhost:5000/api/assets", newAsset);

      alert("Asset saved successfully!");

      // reset form
      setForm({
        name: "",
        asset_type: "",
        category: "",
        serial_number: "",
        status: "",
        location: "",
        dateOfPurchase: "",
        purchaseCost: "",
        os: "",
        ip_address: "",
      });
    } catch (err) {
      console.error("Error saving asset:", err);
    }
  };

  

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add New Asset
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>

          {/* CATEGORY */}
          <Box sx={{ mb: 3 }}>
            <Field
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {(categories || []).map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Field>
          </Box>

          <Grid container spacing={2}>

            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>

                    <Field
                      name="name"
                      label="Asset Name"
                      value={form.name}
                      onChange={handleChange}
                    />

                    <Field
                      name="asset_type"
                      label="Asset Type (Laptop, Printer, etc)"
                      value={form.asset_type}
                      onChange={handleChange}
                    />

                    <Field
                      name="serial_number"
                      label="Serial Number"
                      value={form.serial_number}
                      onChange={handleChange}
                    />

                    <Field
                      name="status"
                      label="Status"
                      value={form.status}
                      onChange={handleChange}
                    />

                    <Field
                      name="location"
                      label="Location"
                      value={form.location}   
                      onChange={handleChange}
                    />

                    {categoryName === "it" && (
                    <>
                      <Field
                        name="ip_address"
                        label="IP Address"
                        value={form.ip_address}
                        onChange={handleChange}
                        required
                      />

                      <Field
                        name="os"
                        label="Operating System"
                        value={form.os}
                        onChange={handleChange}
                        required
                      />
                    </>
                      )}

                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>

                    <Field
                      name="purchaseCost"
                      label="Purchase Cost"
                      value={form.purchaseCost}   // ✅ FIXED
                      onChange={handleChange}
                    />

                    <Field
                      name="dateOfPurchase"
                      label="Date of Purchase"
                      type="date"
                      value={form.dateOfPurchase}  // ✅ FIXED
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />

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