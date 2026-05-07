import * as React from 'react';
import { Box, useTheme, useMediaQuery, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

import SideNav from './SideNav';
import TopNav from './TopNav';

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: "background.default" }}>

      <TopNav onMenuClick={() => setOpen(true)} />

      <Box sx={{ display: 'flex', flex: 1 }}>

        {!isMobile && (
          <Box sx={{ width: 260, flexShrink: 0 }}>
            <SideNav />
          </Box>
        )}

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          variant="temporary"
        >
          <SideNav />
        </Drawer>

        <Box
          sx={{
            flex: 1,
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            pb: 10,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: 2 }}>
            <Outlet />
          </Box>

          <Footer />
        </Box>

      </Box>
    </Box>
  );
}