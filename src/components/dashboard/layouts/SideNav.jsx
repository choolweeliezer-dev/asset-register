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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import "../../../App.css";
import { MoneyIcon, TrendUpIcon } from '@phosphor-icons/react';

/* ================= NAV ITEMS ================= */
const navItems = [
  { title: 'Dashboard', path: '/', icon: <DashboardIcon />, section: 'main', active: 'true' },
  { title: 'Main Assets', path: '/assetspages/main', icon: <Inventory2Icon />, section: 'main', active: 'true' },
  { title: 'IT Assets', path: '/assetspages/it', icon: <ComputerIcon />, section: 'main', active: 'true' },

  { title: 'Asset Details', path: '/assetspages/details', icon: <InfoIcon />, section: 'maintenance', active: 'true' },
  { title: 'Maintenance History', path: '/assetspages/trend', icon: <TrendUpIcon />, section: 'maintenance', active: 'false' },

  { title: 'Subscriptions', path: '/assetspages/subs', icon: <SubscriptionsIcon />, section: 'subscriptions', active: 'true' },
  { title: 'Subscription Table', path: '/pages/subscriptions/subsTable', icon: <MoneyIcon />, section: 'subscriptions', active: 'true' },
];

/* ================= SECTION COMPONENT ================= */
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

    <Stack spacing={1}>
      {children}
    </Stack>
  </Box>
);

/* ================= MAIN COMPONENT ================= */
export default function SideNav() {
  const [open, setOpen] = React.useState(true);

  const renderNavItem = (item) => (
    <NavLink
     key={item.path}
    to={item.active === false ? "#" : item.path}
    onClick={(e) => {
      if (!item.active) e.preventDefault(); // block navigation
    }}
    style={({ isActive }) => ({
      textDecoration: "none",
      color: item.active === false
        ? "rgba(255,255,255,0.3)"   // faded color
        : isActive
        ? "rgb(237, 231, 231)"
        : "white",

      padding: "10px",
      borderRadius: 8,
      background: isActive && item.active !== false
        ? "rgba(0,188,212,0.15)"
        : "transparent",

      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease",
      cursor: item.active === false ? "not-allowed" : "pointer",

      ':hover': {
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        transform: "translateX(4px)",
      },
    })}
    >
      {/* ICON */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 40,
          fontSize: 22,
          opacity: item.active === false ? 0.4 : 1,
        }}
      >
        {item.icon}
      </Box>

      {/* TEXT */}
      {open && (
        <span style={{ marginLeft: 10 }}>
          {item.title}
        </span>
      )}
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
        '&:hover':{backgroundColor: 'rgba(59, 130, 246, 0.12)'},
      }}
    >

      {/* ================= SECTION 1: LOGO ================= */}
      <Box>

        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: 'white' }}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {/* ================= SECTION 2: MAIN ASSETS ================= */}
      <Section title="ASSETS" open={open}>
        {navItems
          .filter(item => item.section === 'main')
          .map(renderNavItem)}
      </Section>

      {/* ================= SECTION 3: MAINTENANCE ================= */}
      <Section title="MAINTENANCE" open={open}>
        {navItems
          .filter(item => item.section === 'maintenance')
          .map(renderNavItem)}
      </Section>

      {/* ================= SECTION 4: SUBSCRIPTIONS ================= */}
      <Section title="SUBSCRIPTIONS" open={open}>
        {navItems
          .filter(item => item.section === 'subscriptions')
          .map(renderNavItem)}
      </Section>

    </Box>
  );
}