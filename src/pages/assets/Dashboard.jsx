import React from "react";
import { Grid } from "@mui/material";
import { assetsMock } from "../../components/dashboard/data/assetsMock";

import {SubscriptionCard} from "../../components/chartsCards/SubscriptionsCard"
import { MaintenanceCard } from "../../components/chartsCards/MaintenanceCard";
import { InactiveCard } from "../../components/chartsCards/InactiveAssetsCard";
import { AssetStatusChart } from "../../components/chartsCards/assetStatusChart";
import {AssetPreview} from "../../components/chartsCards/AssetPreview";
import { MaintenanceTrendChart } from "../../components/chartsCards/MaintenanceTrendChart";
import { maintenanceMock } from "../../components/dashboard/data/maintenanceMock";

export default function FeaturedInfo() {

  const now = new Date();

  const daysDiff = (date) => {
    const d = new Date(date);
    return (now - d) / (1000 * 60 * 60 * 24);
  };

  const withinDays = (date, days) => daysDiff(date) <= days;

  // ---------------- SUBSCRIPTIONS ----------------
  const subscriptions = assetsMock.filter(a => a.subscriptionType);

  const subWeek = subscriptions.filter(a =>
    withinDays(a.subscriptionEndDate, 7)
  );

  const subMonth = subscriptions.filter(a =>
    withinDays(a.subscriptionEndDate, 30)
  );

  const subYear = subscriptions.filter(a =>
    withinDays(a.subscriptionEndDate, 365)
  );

  // ---------------- MAINTENANCE ----------------
  const maintWeek = assetsMock.filter(a =>
    withinDays(a.nextMaintenance, 7)
  );

  const maintMonth = assetsMock.filter(a =>
    withinDays(a.nextMaintenance, 30)
  );

  const maintYear = assetsMock.filter(a =>
    withinDays(a.nextMaintenance, 365)
  );

  // ---------------- INACTIVE ----------------
  const inactiveWeek = assetsMock.filter(a =>
    withinDays(a.lastMaintenance || a.purchaseDate, 7)
  );

  const inactiveMonth = assetsMock.filter(a =>
    withinDays(a.lastMaintenance || a.purchaseDate, 30)
  );

  const inactiveYear = assetsMock.filter(a =>
    withinDays(a.lastMaintenance || a.purchaseDate, 365)
  );
 
  // ----------- Asset Status Chart ------------
  const data = {
  active: assetsMock.filter(a => a.status === 'Active').length,
  maintenance: assetsMock.filter(a => a.status === 'Maintenance').length,
  inactive: assetsMock.filter(a => a.status === 'Inactive').length,
  };


  return (
    <Grid container spacing={3}>

      <SubscriptionCard
        subWeek={subWeek}
        subMonth={subMonth}
        subYear={subYear}
      />

      <MaintenanceCard
        maintWeek={maintWeek}
        maintMonth={maintMonth}
        maintYear={maintYear}
      />

      <InactiveCard
        inactiveWeek={inactiveWeek}
        inactiveMonth={inactiveMonth}
        inactiveYear={inactiveYear}
      />
      
      {/**Left: Trend*/}
      <Grid item xs={12} md={8}>
        <MaintenanceTrendChart
          categories={maintenanceMock.categories}
          data={maintenanceMock.data}
        />
      </Grid>

      {/**Right: Pie */}
      <Grid item xs={12} md={4}>
        <AssetStatusChart data={data} />
      </Grid>
       

      <AssetPreview/>
    </Grid> 
    
  );
}