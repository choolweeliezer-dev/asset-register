import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { assetsMock } from "../dashboard/data/assetsMock";
import { Link } from "react-router-dom";
import ItAssets from "../../pages/assets/ItAssets";
import MainAssets from "../../pages/assets/MainAssets";

export function AssetPreview() {
  const navigate = useNavigate();

  // MAIN ASSETS (first 5 non-IT assets)
  const mainAssets = assetsMock
  .filter(asset => !asset.id.startsWith("IT"))
  .slice(0, 5);

  // IT ASSETS (first 5 IT assets)
  const itAssets = assetsMock
  .filter(asset => asset.id.startsWith("IT"))
  .slice(0, 5);

  const getStatusColor = (status) => {
    if (status === "Active") return "success";
    if (status === "Maintenance") return "warning";
    return "error";
  };

  const AssetTable = ({ title, data, route }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>

        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Assigned</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>

                <TableCell>
                  <Chip
                    label={asset.status}
                    color={getStatusColor(asset.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell>{asset.location}</TableCell>

                <TableCell>{asset.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* VIEW MORE */}
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button
            size="small"
            LinkComponent={Link}
            to={route}
          >
            View More →
          </Button>
        </Box>

      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3}>

      {/* MAIN ASSETS */}
      <Grid item xs={12} md={6}>
        <AssetTable
          title="Main Assets"
          data={mainAssets}
          route="/MainAssets"
        />
      </Grid>

      {/* IT ASSETS */}
      <Grid item xs={12} md={6}>
        <AssetTable
          title="IT Assets"
          data={itAssets}
          route="/ItAssets"
        />
      </Grid>

    </Grid>
  );
}