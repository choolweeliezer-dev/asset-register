/* eslint-disable react/prop-types */
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
  TableContainer,
} from "@mui/material";

import { Link } from "react-router-dom";
import { assetsMock } from "../dashboard/data/assetsMock";

export function AssetPreview() {

  // SHOW FIRST 10 ASSETS
  const assets = assetsMock.slice(0, 10);

  const getStatusColor = (status) => {
    if (status === "Active") return "success";
    if (status === "Maintenance") return "warning";
    return "error";
  };

  return (
    <Grid container spacing={3}>
      <Grid>

        <Card sx={{width: "100%"}}>
          <CardContent>

            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">
                Asset Details
              </Typography>

              <Button
                size="small"
                LinkComponent={Link}
                to="/assets"
              >
                View All →
              </Button>
            </Box>

            {/* TABLE */}
            <TableContainer sx={{width: 1120}}>
              <Table size="small">

                <TableHead>
                  <TableRow>
                    <TableCell>Asset ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Assigned To</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} hover>

                      <TableCell>{asset.id}</TableCell>

                      <TableCell>{asset.name}</TableCell>

                      <TableCell>
                        {asset.id.startsWith("IT")
                          ? "IT Asset"
                          : "Main Asset"}
                      </TableCell>

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
            </TableContainer>

          </CardContent>
        </Card>

      </Grid>
    </Grid>
  );
}