import * as React from 'react';
import { Box } from '@mui/material';

import SideNav from './SideNav';
import TopNav from './TopNav';

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* SIDEBAR */}
      <SideNav />

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* TOP BAR */}
        <TopNav />

        {/* PAGE CONTENT AREA */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            backgroundColor: '#f9fafb',

            // ✅ THIS is the fix
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* CENTERED CONTENT WRAPPER */}
          <Box sx={{ width: '100%', maxWidth: '1400px' }}>
            {children}
          </Box>

        </Box>

      </Box>
    </Box>
  );
}