import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import { ThemeContextProvider } from './ThemeContext';

import DashboardLayout from './components/dashboard/layouts/DashboardLayout';
import MainAssets from './pages/assetspages/MainAssets';
import ItAssets from './pages/assetspages/ItAssets';
import AddAsset from './pages/assetspages/AddAssetForm';
import AssetDetails from './pages/assetspages/AssetDetails';
import Subscriptions from './pages/subscriptions/Subscriptions';
import Dashboard from './pages/assetspages/Dashboard';
import SubscriptionTable from './pages/subscriptions/SubscriptionsTable';
import SignIn from './pages/signIn/SignIn';
import MaintenanceFormDialog from './pages/maintenance/maintenanceForm';
//import MaintenancePage from './pages/maintenance/maintenancePage';
import MaintenanceTable from './pages/maintenance/MaintenanceTable';
import ProtectedRoute from './pages/signIn/ProtectedRoute';
import UserTracker from './pages/admin/UserTracker';
import PublicRoute from './pages/signIn/PublicRoute';

export default function App() {

  return (
    
    <BrowserRouter>
    <ThemeContextProvider>
       <Routes>
         {/**Sign in  */}
          <Route path="/" element={
            <PublicRoute><SignIn/></PublicRoute>}/>

      <Route element={
        <ProtectedRoute>
            <DashboardLayout/>
        </ProtectedRoute>
        }>
       
          {/* Dashboard */}
          <Route path="/assetspages/dash" element={<Dashboard />} />

          {/* Assets */}
          <Route path="/assetspages/main" element={<MainAssets />} />
          <Route path="/assetspages/it" element={<ItAssets />} />
          <Route path="/assetspages/add" element={<AddAsset />} />
          <Route path="/assetspages/details" element={<AssetDetails />} />

          {/* Subscriptions */}
          <Route path="/pages/subscriptions/subs" element={<Subscriptions />} />
          <Route path="/pages/subscriptions/subsTable" element={<SubscriptionTable />}/>

          {/**Maintenance */}
          <Route path="assetspages/pages/maintenance/his" element={<MaintenanceTable/>}/>
          <Route path="assetspages/pages/maintenance/form" element={<MaintenanceFormDialog/>}/>

          {/**Admin Access Only */}
          <Route path="assetspages/pages/admin/tracker" element={<UserTracker/>}/>

          {/* 404 fallback *
          <Route path="*" element={<div>404 Not Found</div>} /> */}

       
      </Route>
       </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  );
}