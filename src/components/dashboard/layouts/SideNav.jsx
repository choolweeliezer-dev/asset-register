import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const navItems = [
  { title: 'Dashboard', path: '/' },

  { title: 'Main Assets', path: '/assets/main' },
  //{ title: 'IT Assets', path: '/assets/it' },
   { title: 'IT Assets', path: '/assets/it' },

 // { title: 'Add Asset', path: '/assets/new' },
  { title: 'Add Asset', path: '/assets/add' },

  { title: 'Asset Details', path: '/assets/details' },

  { title: 'Subscriptions', path: '/assets/subscriptions' }, 
  
];

export default function SideNav() {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: '#111827',
        color: 'white',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Asset Register
      </Typography>

      <Stack spacing={1}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#00bcd4' : 'white',
              padding: '8px 10px',
              borderRadius: 6,
              background: isActive ? 'rgba(0,188,212,0.15)' : 'transparent',
            })}
          >
            {item.title}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
}