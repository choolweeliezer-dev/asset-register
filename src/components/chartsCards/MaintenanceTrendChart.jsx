'use client';

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { useTheme } from "@mui/material/styles";
import { Chart } from "../core/chart";

export function MaintenanceTrendChart({categories, data }) {
  const theme = useTheme();

  const options = {
    chart: {
      background: "transparent",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}`
      }
    }
  };

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <CardHeader title="Maintenance Trend" />
      <CardContent>
        <Chart
          type="line"
          height={300}
          width={550}
          options={options}
          series={[{ name: "Maintenance", data }]}
        />
      </CardContent>
    </Card>
  );
}