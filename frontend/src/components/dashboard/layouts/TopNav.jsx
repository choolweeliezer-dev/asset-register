import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
//import Menu from "@mui/icons-material/Menu";
//import MenuItem  from '@mui/material/MenuItem';

import { authService } from '../../../api/authService';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeContext } from '../../../ThemeContext';

export default function TopNav({ onMenuClick }) {

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = React.useState(false);
  //const [anchorEl, setAnchorEl] = React.useState(null);
  //const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setShowLogout((prev) => !prev);
  };
  const user = authService.getAuthUser();

 // const handleClose = () => {
   // setAnchorEl(null);
  //};

  const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    await fetch("http://localhost:8080/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Logout failed", err);
  }

  // ALWAYS clear frontend state after request
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("name");

  navigate("/");
  };
    
  const {mode, toggleDarkMode} = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        background: 'linear-gradient(90deg, #0f172a, #3b82f6, #a855f7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 0,
        boxShadow: 1,
      }}
    >

      {/* LEFT SIDE */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

        {/* MOBILE MENU BUTTON */}
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* LOGO */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '6px 10px',
            borderRadius: '10px',
          }}
        >
          <img
            src="/tylerlogo.png"
            alt="logo"
            style={{ width: 120 }}
          />
        </Box>

        {/* TITLE */}
        <Typography variant="h6" sx={{ fontWeight: 300, color: 'white' }}>
          Asset Register
        </Typography>

      </Box>

      {/* RIGHT SIDE */}
      <Stack direction="row" spacing={1} alignItems="center">

        <Tooltip title="Search">
          <IconButton sx={{ color: 'white' }}>
            <MagnifyingGlassIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Users">
          <IconButton sx={{ color: 'white' }}>
            <UsersIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton sx={{ color: 'white' }}>
            <Badge variant="dot" color="success">
              <BellIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Box>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
        <Avatar
          src="/assets/avatar.png"
          sx={{ width: 32, height: 32, cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "white",
              mt: 0.3,
              lineHeight: 1
            }}
          >
            {user ? `Hello, ${user.fullName}` : "Guest"}
          </Typography>

          {showLogout && (
            <Typography
              onClick={handleLogout}
              sx={{
                fontSize: "0.75rem",
                color: "white",
                mt: 0.5,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Logout
            </Typography>
           
          )}
           </Box>

      </Stack>
    </Box>
  );
}