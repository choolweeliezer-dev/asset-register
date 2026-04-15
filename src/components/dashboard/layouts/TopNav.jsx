import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export default function TopNav() {
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
      }}
    >
      {/* LEFT SIDE */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Search">
          <IconButton>
            <MagnifyingGlassIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* RIGHT SIDE */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Users">
          <IconButton>
            <UsersIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton>
            <Badge variant="dot" color="success">
              <BellIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Avatar
          src="/assets/avatar.png"
          sx={{ width: 32, height: 32, cursor: 'pointer' }}
        />
      </Stack>
    </Box>
  );
}