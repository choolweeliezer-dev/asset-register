import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

export default function ITAssetsTable({ rows = [] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  // FILTER
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name?.toLowerCase().includes(search.toLowerCase()) ||
      row.location?.toLowerCase().includes(search.toLowerCase()) ||
      row.assignedTo?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || row.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || row.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // PAGINATION
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ p: 2 }}>

      {/* FILTER BAR */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          size="small"
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Desktop">Desktop</MenuItem>
          <MenuItem value="Server">Server</MenuItem>
        </TextField>

      </Box>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((asset) => (
            <TableRow key={asset.id} hover>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.status}</TableCell>
              <TableCell>{asset.ipAddress}</TableCell>
              <TableCell>{asset.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

    </Paper>
  );
}