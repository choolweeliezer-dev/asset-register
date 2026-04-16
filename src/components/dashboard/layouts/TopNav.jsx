import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopNav({ onMenuClick }) {
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
        borderRadius: 2,
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

        <Avatar
          src="/assets/avatar.png"
          sx={{ width: 32, height: 32, cursor: "pointer" }}
        />

      </Stack>
    </Box>
  );
}