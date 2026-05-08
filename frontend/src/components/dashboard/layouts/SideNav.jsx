import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ComputerIcon from '@mui/icons-material/Computer';
import InfoIcon from '@mui/icons-material/Info';
//import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { MoneyIcon, TrendUpIcon, PersonIcon } from '@phosphor-icons/react';

import { getRole } from '../../../api/jwtDecode';

const navItems = [
  { title: 'Dashboard', path: '/assetspages/dash', icon: <DashboardIcon />, section: 'main' },
  { title: 'Main Assets', path: '/assetspages/main', icon: <Inventory2Icon />, section: 'main' },
  { title: 'IT Assets', path: '/assetspages/it', icon: <ComputerIcon />, section: 'main' },

  { title: 'Asset Details', path: '/assetspages/details', icon: <InfoIcon />, section: 'maintenance' },
  { title: 'Maintenance History', path: '/assetspages/pages/maintenance/his', icon: <TrendUpIcon />, section: 'maintenance' },


  { title: 'Subscription Table', path: '/pages/subscriptions/subsTable', icon: <MoneyIcon />, section: 'subscriptions' },

  // Admin only
  { title: 'User Tracker', path: '/assetspages/pages/admin/tracker', icon: <PersonIcon />, section: 'admin' },
  { title: 'User Management', path: '/assetspages/pages/admin/users', icon: <PersonIcon />, section: 'admin' },
];

const Section = ({ title, open, children }) => (
  <Box sx={{ mb: 2 }}>
    {open && (
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.5)',
          ml: 1,
          mb: 1,
          display: 'block',
          fontSize: 11,
          letterSpacing: 1,
        }}
      >
        {title}
      </Typography>
    )}
    <Stack spacing={1}>{children}</Stack>
  </Box>
);

// {/* { title: 'Subscriptions', path: '/pages/subscriptions/subs', icon: <SubscriptionsIcon />, section: 'subscriptions' }, */}

export default function SideNav() {
  const [open, setOpen] = React.useState(true);
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    const loadRole = () => setRole(getRole());
    loadRole();

    window.addEventListener('storage', loadRole);
    return () => window.removeEventListener('storage', loadRole);
  }, []);

  const isAdmin = role === "ADMIN" || role === "admin";

  const renderNavItem = (item) => (
    <NavLink
      key={item.path}
      to={item.path}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "rgb(237, 231, 231)" : "white",
        padding: "10px",
        borderRadius: 8,
        background: isActive ? "rgba(0,188,212,0.15)" : "transparent",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 40,
          fontSize: 22,
        }}
      >
        {item.icon}
      </Box>

      {open && <span style={{ marginLeft: 10 }}>{item.title}</span>}
    </NavLink>
  );

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #0f172a, #2864c6)',
        width: open ? 240 : 70,
        height: '100%',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        color: 'white',
        px: 2,
        py: 1,
        transition: 'width 0.2s ease',
        overflowX: 'hidden',
        '&:hover': {
          backgroundColor: 'rgba(59, 130, 246, 0.12)',
        },
      }}
    >
      {/* Toggle Button */}
      <Box>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: 'white' }}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {/* Main Assets */}
      <Section title="ASSETS" open={open}>
        {navItems.filter(item => item.section === 'main').map(renderNavItem)}
      </Section>

      {/* Maintenance */}
      <Section title="MAINTENANCE" open={open}>
        {navItems.filter(item => item.section === 'maintenance').map(renderNavItem)}
      </Section>

      {/* Subscriptions */}
      <Section title="SUBSCRIPTIONS" open={open}>
        {navItems.filter(item => item.section === 'subscriptions').map(renderNavItem)}
      </Section>

      {/* ADMIN SECTION */}
      {isAdmin && (
        <Section title="ADMIN" open={open}>
          {navItems.filter(item => item.section === 'admin').map(renderNavItem)}
        </Section>
      )}
    </Box>
  );
}