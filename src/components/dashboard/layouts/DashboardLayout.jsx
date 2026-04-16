import * as React from 'react';
import { Box, useTheme, useMediaQuery, Drawer } from '@mui/material';

import SideNav from './SideNav';
import TopNav from './TopNav';

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* TOP NAV (pass toggle for mobile menu button later) */}
      <TopNav onMenuClick={() => setOpen(true)} />

      {/* MAIN AREA */}
      <Box sx={{ display: 'flex', flex: 1 }}>

        {/* DESKTOP SIDEBAR */}
        {!isMobile && (
          <Box sx={{ width: 260, flexShrink: 0 }}>
            <SideNav />
          </Box>
        )}

        {/* MOBILE SIDEBAR (DRAWER) */}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          variant="temporary"
        >
          <SideNav />
        </Drawer>

        {/* CONTENT AREA */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0, // IMPORTANT: prevents overflow issues
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: 2 }}>
            {children}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}