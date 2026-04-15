import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/dashboard/layouts/DashboardLayout';
import MainAssets from './pages/assets/MainAssets';
import ItAssets from './pages/assets/ItAssets';
import AddAsset from './pages/assets/AddAsset';
import AssetDetails from './pages/assets/AssetDetails';
import Subscriptions from './pages/assets/Subscriptions';
import Dashboard from './pages/assets/Dashboard';
import FeaturedInfo from './pages/assets/featuredInfo';

function Page({ title }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>{title}</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
        {/*  <Route path="/assets/main" element={<div>Main Assets</div>} /> */}
        {/*  <Route path="/assets/it" element={<div>IT Assets</div>} />*/}
        {/*  <Route path="/assets/new" element={<div>Add Asset</div>} /> */}
        {/*  <Route path="/maintenance" element={<div>Maintenance</div>} /> */}
        {/*  <Route path="/subscriptions" element={<div>Subscriptions</div>} />*/}
        <Route path='/' element={<Dashboard/>}/>
          <Route path="/assets/main" element={<MainAssets />} /> 
          <Route path="/assets/it" element={<ItAssets />} />
          <Route path="/assets/add" element={<AddAsset />} />
       {/*   <Route path="/assets/add" element={<AddAsset />} /> */}
          <Route path="/assets/details" element={<AssetDetails />} />
          <Route path="/assets/subscriptions" element={<Subscriptions/>}/>
         {/* <Route path="/assets/dashboard" element={<Dashboard/>}/> */}
         <Route path="/MainAssets" element={<MainAssets />} />
         <Route path="/ItAssets" element={<ItAssets />} />
         <Route path="/add-asset" element={<AddAsset />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}