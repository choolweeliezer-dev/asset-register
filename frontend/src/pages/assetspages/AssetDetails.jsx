import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { assetsMock } from '../../components/dashboard/data/assetsMock';

export default function AssetDetails() {
  const [type, setType] = React.useState('main');
  const [hovered, setHovered] = React.useState(null);

  const filteredAssets = assetsMock.filter(
    (asset) => asset.type === type
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Maintenance':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Asset Details
      </Typography>

      {/* 🔥 TOGGLE */}
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(e, val) => val && setType(val)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="main">Main Assets</ToggleButton>
        <ToggleButton value="it">IT Assets</ToggleButton>
      </ToggleButtonGroup>

      {/* CARDS */}
      <Grid container spacing={2}>
        {filteredAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <Card
              onMouseEnter={() => setHovered(asset.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                transition: '0.3s',
                transform:
                  hovered === asset.id ? 'scale(1.02)' : 'scale(1)',
                cursor: 'pointer',
              }}
            >
              <CardContent>

                {/* HEADER + STATUS */}
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">
                    {asset.name}
                  </Typography>

                  <Chip
                    label={asset.status}
                    color={getStatusColor(asset.status)}
                    size="small"
                  />
                </Stack>

                {/* GENERAL INFO (ALWAYS VISIBLE) */}
                <Typography variant="body2">ID: {asset.id}</Typography>
                <Typography variant="body2">
                  Serial: {asset.serialNumber}
                </Typography>
                <Typography variant="body2">
                  Category: {asset.category}
                </Typography>
                <Typography variant="body2">
                  Assigned: {asset.assignedTo}
                </Typography>
                <Typography variant="body2">
                  Next Maintenance: {asset.nextMaintenance}
                </Typography>

                {/* IT ONLY FIELD */}
                {asset.type === 'it' && (
                  <Typography variant="body2">
                    OS: {asset.os || 'Windows'}
                  </Typography>
                )}

                {/* HOVER DETAILS */}
                {hovered === asset.id && (
                  <Box
                    sx={{
                      mt: 2,
                      borderTop: '1px solid #ddd',
                      pt: 2,
                    }}
                  >
                    <Typography variant="body2">
                      Location: {asset.location}
                    </Typography>

                    <Typography variant="body2">
                      Purchase Date: {asset.purchaseDate}
                    </Typography>

                    <Typography variant="body2">
                      Purchase Cost: {asset.purchaseCost}
                    </Typography>

                    <Typography variant="body2">
                      Insurance Coverage: {asset.insuranceCoverage}
                    </Typography>

                    <Typography variant="body2">
                      Last Maintenance: {asset.lastMaintenance}
                    </Typography>

                    <Typography variant="body2">
                      Current Value: {asset.currentValue}
                    </Typography>

                    <Typography variant="body2">
                      Warranty: {asset.warranty}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: 'primary.main',
                        cursor: 'pointer',
                      }}
                    >
                      Click any field to edit →
                    </Typography>
                  </Box>
                )}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}