import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getMaintenanceStatus } from "../../api/dashboardApi";

const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#10b981",
  "#ef4444",
];

export default function MaintenanceStatusChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMaintenanceStatus();
  }, []);

  const loadMaintenanceStatus = async () => {
    try {
      setLoading(true);

      const response = await getMaintenanceStatus();

      console.log(
        "MAINTENANCE STATUS:",
        response
      );

      setData(response);
    } catch (error) {
      console.error(
        "Failed to load maintenance status",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Pending",
      value: data?.pending || 0,
    },
    {
      name: "In Progress",
      value: data?.inProgress || 0,
    },
    {
      name: "Completed",
      value: data?.completed || 0,
    },
    {
      name: "Failed",
      value: data?.failed || 0,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: 500,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Maintenance Status
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={420}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer
            width={530}
            height={420}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
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