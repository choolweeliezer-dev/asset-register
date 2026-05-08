import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Chip, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import {usersApi} from '../../api/usersApi';
import { toast } from 'react-toastify';

export default function UserTracker() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getAllaudits();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

      const columns = [
        { field: 'id', headerName: 'Log ID', width: 90 },
        {
          field: 'createdAt',
          headerName: 'Date & Time',
          width: 180,
          valueFormatter: (params) => params?.value ? new Date(params.value).toLocaleString() : '',
        },
        { field: 'userCode', headerName: 'User Code', width: 120 },
        { field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 180 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },

        {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={
            params.value?.includes('LOGIN') || params.value?.includes('CREATE') ? 'success' :
            params.value?.includes('DELETE') || params.value?.includes('LOGOUT') ? 'error' : 'primary'
          }
          size="small"
        />
      )
    },
    { field: 'entityName', headerName: 'Entity', width: 130 },
    { field: 'entityId', headerName: 'Entity ID', width: 100 },
    { field: 'description', headerName: 'Description', flex: 1.5, minWidth: 250 },
    { field: 'ipAddress', headerName: 'IP Address', width: 130 },

    {
      field: 'oldValue',
      headerName: 'Old Value',
      width: 180,
      renderCell: (params) => params.value ? 
        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{params.value}</Typography> : '—'
    },
    {
      field: 'newValue',
      headerName: 'New Value',
      width: 180,
      renderCell: (params) => params.value ? 
        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{params.value}</Typography> : '—'
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <div>
          <Typography variant="h4">Audit Trail</Typography>
          <Typography variant="body2" color="text.secondary">
            Complete history of all user actions in the system
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchAuditLogs}
        >
          Refresh Logs
        </Button>
      </Box>

      <Paper sx={{ height: 720 }}>
        <DataGrid
          rows={logs}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] },
          }}
          density="comfortable"
        />
      </Paper>
    </Box>
  );
}