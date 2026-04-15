import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ComputerIcon from '@mui/icons-material/Computer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import "../../../App.css";

const navItems = [
  { title: 'Dashboard', path: '/', icon: <DashboardIcon/>},
  { title: 'Main Assets', path: '/assets/main', icon: <Inventory2Icon/> },
  { title: 'IT Assets', path: '/assets/it', icon: <ComputerIcon/> },
  { title: 'Add Asset', path: '/assets/add', icon: <AddBoxIcon/> },
  { title: 'Asset Details', path: '/assets/details', icon: <InfoIcon/> },
  { title: 'Subscriptions', path: '/assets/subscriptions', icon: <SubscriptionsIcon/> },
];

export default function SideNav() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box
      sx={{
        width: open ? 240 : 70,
        height: '100vh',
        bgcolor: '#111827',
        color: 'white',
        p: 2,
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      {/**============ SECTION 1: LOGO =============== */}
      {/* Header + toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          mb: 2,
        }}
      >
        {open && (
          <div 
            style={{
            backgroundColor: "#ffffff",
            padding: "12px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src="/tylerlogo.png"
            alt="logo"
            style={{ width: "200px" }}
          />
          </div>
        )}

        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: 'white' }}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

       {/* Divider */}
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

        {/**=========== SECTION 2 ================ */}
      {/* Nav items */}
      <Stack spacing={1}>
        {navItems.map((item) => (
          <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#00bcd4" : "white",
                padding: "10px",
                borderRadius: 8,
                background: isActive ? "rgba(0,188,212,0.15)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                transition: "all 0.2s ease",
              })}
            >
                {/* ICON ALWAYS VISIBLE */}
                <Box
                  sx={{
                    display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "show",
                  fontSize: 22,
                  minWidth: 40,     
                  }}
                >
                  {item.icon}
                </Box>

                {/* TEXT ONLY WHEN OPEN */}
                {open && (
                  <span style={{ marginLeft: 10 }}>
                    {item.title}
                  </span>
                )}
              </NavLink>
                      ))}
                    </Stack>
                  </Box>
  );
}