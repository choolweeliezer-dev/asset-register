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

export default function TopNav() {
  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 1
  }}
>
  {/* LEFT SIDE - TITLE */}
  <Typography variant="h3" sx={{ fontWeight: 600 }}>
    Asset Register
  </Typography>

  {/* RIGHT SIDE */}
  <Stack direction="row" spacing={1} alignItems="center">
    <Tooltip title="Search">
      <IconButton>
        <MagnifyingGlassIcon />
      </IconButton>
    </Tooltip>

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
      sx={{ width: 32, height: 32, cursor: "pointer" }}
    />
  </Stack>
</Box>
  );
}