import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material';

import { assetsMock } from '../../components/dashboard/data/assetsMock';

export default function Subscriptions() {
  const [filter, setFilter] = React.useState('all');
  const [hovered, setHovered] = React.useState(null);

  const subscriptionAssets = assetsMock.filter(
    (asset) => asset.subscriptionType
  );

  const filtered = subscriptionAssets.filter((asset) => {
    if (filter === 'all') return true;
    return asset.subscriptionType === filter;
  });

  const getStatusColor = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return end > today ? 'success' : 'error';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Subscriptions
      </Typography>

      {/* FILTER */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, val) => val && setFilter(val)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="annual">Annual</ToggleButton>
        <ToggleButton value="quarterly">Quarterly</ToggleButton>
      </ToggleButtonGroup>

      {/* CARDS */}
      <Grid container spacing={2}>
        {filtered.map((asset) => (
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

                {/* HEADER */}
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">
                    {asset.name}
                  </Typography>

                  {/* STATUS */}
                  <Chip
                    label={
                      new Date(asset.subscriptionEndDate) > new Date()
                        ? 'Active'
                        : 'Expired'
                    }
                    color={getStatusColor(asset.subscriptionEndDate)}
                    size="small"
                  />
                </Stack>

                {/* GENERAL INFO (ALWAYS VISIBLE) */}
                <Typography variant="body2">
                  ID: {asset.id}
                </Typography>

                <Typography variant="body2">
                  Type: {asset.subscriptionType}
                </Typography>

                <Typography variant="body2">
                  Cost: {asset.subscriptionCost}
                </Typography>

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
                      Start Date: {asset.subscriptionStartDate}
                    </Typography>

                    <Typography variant="body2">
                      End Date: {asset.subscriptionEndDate}
                    </Typography>

                    <Typography variant="body2">
                      Duration: {asset.subscriptionType === 'annual'
                        ? '1 Year'
                        : '3 Months'}
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