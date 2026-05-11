import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import BuildIcon from "@mui/icons-material/Build";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PeopleIcon from "@mui/icons-material/People";

import { getDashboardSummary } from "../../api/dashboardApi";

const StatCard = ({ title, value, subtitle, icon }) => (
  <Card
    sx={{
      borderRadius: 4,
      height: 180,
      boxShadow: 2,
    }}
  >
    <CardContent
      sx={{
        height: "100%",
        width: 267,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
      }}
    >
      {/* Top Section */}
<Box
  display="flex"
  alignItems="center"
  width="100%"
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      gap: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       // backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        width: "30px",
        height: "30px",
        flexShrink: 0,
      }}
    >
      {icon}
    </span>

    {title}
  </Typography>
</Box>

      {/* Middle Value */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 370,
            mt: 2,
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default function DashboardCards() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary();

      console.log("DASHBOARD DATA:", data);

      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch dashboard summary", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Total Assets"
          value={summary?.totalAssets || 0}
          icon={<Inventory2Icon fontSize="small" color="primary" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Under Maintenance"
          value={summary?.maintenanceCount || 0}
          icon={<BuildIcon fontSize="small" color="warning" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Active Subscriptions"
          value={summary?.activeSubscriptions || 0}
          icon={<SubscriptionsIcon fontSize="small" color="success" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Active Sessions"
          value={summary?.sessions || 0}
          icon={<PeopleIcon fontSize="small" color="secondary" />}
        />
      </Grid>
    </Grid>
  );
}