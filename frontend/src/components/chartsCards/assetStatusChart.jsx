'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { Chart } from '../core/chart';

export  function AssetStatusChart({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const chartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    labels: ['Active', 'Maintenance', 'Inactive'],
    colors: [
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  const series = [
    data.active,
    data.maintenance,
    data.inactive,
  ];

  return (
    <Card>
      <CardHeader title="Asset Status Overview" />

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 3,
          }}
        >

          {/* Right: CHART */}
          <Box sx={{ flex: 1 }}>
            <Chart
              height={350}
              options={chartOptions}
              series={series}
              type="donut"
              width="100%"
            />
          </Box>

          {/* RIGHT: CLICKABLE LEGEND */}
          <Stack spacing={2} sx={{ ml: 3 }}>

            <Typography
              sx={{ cursor: 'pointer', color: 'success.main' }}
              onClick={() => navigate('/assets?status=Active')}
            >
              ● Active: {data.active}
            </Typography>

            <Typography
              sx={{ cursor: 'pointer', color: 'warning.main' }}
              onClick={() => navigate('/assets?status=Maintenance')}
            >
              ● Maintenance: {data.maintenance}
            </Typography>

            <Typography
              sx={{ cursor: 'pointer', color: 'error.main' }}
              onClick={() => navigate('/assets?status=Inactive')}
            >
              ● Inactive: {data.inactive}
            </Typography>

          </Stack>

        </Box>
      </CardContent>

      <Divider />
    </Card>
  );
}