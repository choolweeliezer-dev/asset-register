import * as React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import DashboardLayout from './components/dashboard/layouts/DashboardLayout';
import MainAssets from './pages/assetspages/MainAssets';
import ItAssets from './pages/assetspages/ItAssets';
import AddAsset from './pages/assetspages/AddAsset';
import AssetDetails from './pages/assetspages/AssetDetails';
import Subscriptions from './pages/assetspages/Subscriptions';
import Dashboard from './pages/assetspages/Dashboard';
import SubscriptionTable from './pages/subscriptions/SubscriptionsTable';

export default function App() {

  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Assets */}
          <Route path="/assetspages/main" element={<MainAssets />} />
          <Route path="/assetspages/it" element={<ItAssets />} />
          <Route path="/assetspages/add" element={<AddAsset />} />
          <Route path="/assetspages/details" element={<AssetDetails />} />

          {/* Subscriptions */}
          <Route path="/assetspages/subs" element={<Subscriptions />} />

          {/* OPTIONAL: only if you REALLY want a separate page */}
          <Route path="/pages/subscriptions/subsTable" element={<SubscriptionTable />}/>

          {/* 404 fallback */}
          <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}