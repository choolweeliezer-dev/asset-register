import * as React from 'react';
import {Table,TableBody,TableCell,TableHead,TableRow,
  Paper,TablePagination,TextField,MenuItem,Box, IconButton, Tooltip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useAssetActions } from './AssetActions';

export default function MainAssetsTable({ rows = [] }) {
  const {
    rows: updatedRows,
    handleOpen,
    handleDelete,
    AssetDialog
  } = useAssetActions(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  // ================= FILTERING =================
  const filteredRows = updatedRows.filter((row) => {
    const matchesSearch =
      row.name?.toLowerCase().includes(search.toLowerCase()) ||
      row.location?.toLowerCase().includes(search.toLowerCase()) ||
      row.assignedTo?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || row.status === statusFilter;

    const matchesCategory =
      categoryFilter === 'all' || row.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // ================= PAGINATION =================
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; 

  return (
    <Paper sx={{ p: 2, overflowX: 'auto' }}>

      {/* ================= FILTER BAR ================= */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{width: 500}}
        />

        <TextField
          size="small"
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{width: 220}}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          size="small"
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{width: 220}}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Building">Building</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Vehicle">Vehicle</MenuItem>
        </TextField>

      </Box>

      {/* ================= TABLE ================= */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Next Maintenance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((asset) => (
            
            <TableRow key={asset.id}
            hover
            onClick={() => handleOpen(asset)}
            sx={{
            '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',},
          }}>
  
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.serialNumber}</TableCell>
              <TableCell>{asset.status}</TableCell>
              <TableCell>{asset.location}</TableCell>
              <TableCell>{asset.assignedTo}</TableCell>
              <TableCell>{asset.nextMaintenance}</TableCell>

                {/* DELETE BUTTON */}
              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(asset.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ================= PAGINATION ================= */}
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* THIS RENDERS THE MODAL */}
      <AssetDialog />

    </Paper>
  );
}