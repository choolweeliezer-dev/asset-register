import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { assetsMock } from "../../components/dashboard/data/assetsMock";

//import { SubscriptionCard} from "../../components/chartsCards/SubscriptionsCard";
//import { MaintenanceCard } from "../../components/chartsCards/MaintenanceCard";
//import { InactiveCard } from "../../components/chartsCards/InactiveAssetsCard";
//import { AssetStatusChart } from "../../components/chartsCards/assetStatusChart";
//import {AssetPreview} from "../../components/chartsCards/AssetPreview";
//import { MaintenanceTrendChart } from "../../components/chartsCards/MaintenanceTrendChart";
//import { maintenanceHis } from "../../components/dashboard/data/maintenanceMock";
import TopAssetsTable from "../../components/chartsCards/TopAssetsTable";
import DashboardCards from "../../components/chartsCards/DashboardCards";
import FinancialAllocationChart from "../../components/chartsCards/FinancialAllocationChart";
import MaintenanceStatusChart from "../../components/chartsCards/MaintenanceStatusChart";

export default function FeaturedInfo() {

  const now = new Date();

  const daysDiff = (date) => {
    const d = new Date(date);
    return (now - d) / (1000 * 60 * 60 * 24);
  };

  const withinDays = (date, days) => daysDiff(date) <= days;

  
  
  // ----------- Asset Status Chart ------------
  const data = {
  active: assetsMock.filter(a => a.status === 'Active').length,
  maintenance: assetsMock.filter(a => a.status === 'Maintenance').length,
  inactive: assetsMock.filter(a => a.status === 'Inactive').length,
  };


  return (

    
    <Grid container spacing={3}>

       <Grid>
        <DashboardCards/>
         </Grid>

     {/* <SubscriptionCard
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
        <FinancialAllocationChart
        />
      </Grid>

      {/**Right: Pie */}
      <Grid item xs={12}>
        <Box width="1000px">
           <MaintenanceStatusChart />
        </Box>


      </Grid>
      <TopAssetsTable/>
    </Grid> 
    
    
  );
}