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
  const [selected, setSelected] = React.useState([]);

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

  // ✅ toggle select
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ delete selected
  const deleteSelected = () => {
    setSelected([]);
  };

  return (
    <Box>

      {/* HEADER + DELETE ACTION */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">
          Subscriptions
        </Typography>

        {selected.length > 0 && (
          <Chip
            label={`Delete Selected (${selected.length})`}
            color="error"
            clickable
            onClick={deleteSelected}
          />
        )}
      </Stack>

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
              onClick={() => toggleSelect(asset.id)}
              onMouseEnter={() => setHovered(asset.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                transition: '0.3s',
                cursor: 'pointer',

                transform: selected.includes(asset.id)
                  ? 'scale(1.03)'
                  : hovered === asset.id
                  ? 'scale(1.02)'
                  : 'scale(1)',

                border: selected.includes(asset.id)
                  ? '2px solid #f44336'
                  : '1px solid transparent',
              }}
            >
              <CardContent>

                {/* HEADER */}
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">
                    {asset.name}
                  </Typography>

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

                {/* GENERAL INFO */}
                <Typography variant="body2">
                  ID: {asset.id}
                </Typography>

                <Typography variant="body2">
                  Type: {asset.subscriptionType}
                </Typography>

                <Typography variant="body2">
                  Cost: {asset.subscriptionCost}
                </Typography>

                {/* SELECTED LABEL */}
                {selected.includes(asset.id) && (
                  <Chip
                    label="Selected"
                    size="small"
                    color="error"
                    sx={{ mt: 1 }}
                  />
                )}

                {/* HOVER DETAILS (UNCHANGED) */}
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
                      Click to make payment →
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