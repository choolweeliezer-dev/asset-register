import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getFinancialAllocation } from "../../api/dashboardApi";

const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

export default function FinancialAllocationChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFinancialAllocation();
  }, []);

  const loadFinancialAllocation = async () => {
    try {
      setLoading(true);

      const response = await getFinancialAllocation();

      console.log("FINANCIAL ALLOCATION:", response);

      setData(response);
    } catch (error) {
      console.error(
        "Failed to load financial allocation",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Assets",
      value: data?.assetValue || 0,
    },
    {
      name: "Maintenance",
      value: data?.maintenanceCost || 0,
    },
    {
      name: "Subscriptions",
      value: data?.subscriptionCost || 0,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Financial Allocation
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={300}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer
            width={530}
            height={300}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}