import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import { assetsMock } from "../../components/dashboard/data/assetsMock";

export default function MainAssets() {

  //HOOK
  const navigate = useNavigate();

  //select all 
  const [selectedIds, setSelectedIds] = React.useState([]);

  //Toogle logic
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  //select all logic
  const toggleSelectAll = (rows) => {
      if (selectedIds.length === rows.length) {
        setSelectedIds([]);
      } else {
        setSelectedIds(rows.map((r) => r.id));
      }
    };

  //bulk delete
  const handleBulkDelete = () => {
    const updated = data.filter((item) => !selectedIds.includes(item.id));
    setData(updated);
    setSelectedIds([]);
  };

  //  MAIN DATA STATE
  const [data, setData] = React.useState(assetsMock);

  //  FILTER STATE
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("");

  //  PAGINATION
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //  DIALOG STATE
  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [editedAsset, setEditedAsset] = React.useState(null);

  //  FILTER LOGIC
  const filteredData = data
    .filter(item => item.type === "main")
    .filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        (item.status || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter ? item.status === statusFilter : true;

      const matchesLocation =
        locationFilter ? item.location === locationFilter : true;

      return matchesSearch && matchesStatus && matchesLocation;
    });

  //  PAGINATION LOGIC
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //  HANDLERS
  const handleOpen = (asset) => {
    setSelectedAsset(asset);
    setEditedAsset(asset);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsset(null);
  };

  const handleSave = () => {
    const updated = data.map(item =>
      item.id === editedAsset.id ? editedAsset : item
    );
    setData(updated);
    handleClose();
  };

  const handleDelete = () => {
    const updated = data.filter(item => item.id !== selectedAsset.id);
    setData(updated);
    handleClose();
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>

          {/* HEADER */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Main Assets</Typography>
          </Box>

          {/* SEARCH + FILTERS */}
          <Box sx={{ display: "flex",
             mb: 2, 
             justifyContent: "space-between", 
             alignItems: "center" }}>
              <Box>
                <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
              select
              label="Status"
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{minWidth: 200}}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <TextField
              select
              label="Location"
              size="small"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              sx={{minWidth: 200}}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="HQ">HQ</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </TextField>
              </Box>

              <Button
                  variant="contained"
                  onClick={() => navigate("/assetspages/add")}>
                  Add Asset
                </Button>
            
          </Box>

          {/* TABLE */}
          <Table sx={{
            '& th': { fontWeight: 'bold' },
            '& td, & th': { borderBottom: '1px solid #eee' }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Next Maintenance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.length > 0 ? (
                paginatedData.map((sub) => (
                  <TableRow
                    key={sub.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        transform: "scale(1.01)"
                      }
                    }}
                    onClick={() => handleOpen(sub)}
                  >
                    <TableCell>{sub.id}</TableCell>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>{sub.category}</TableCell>
                    <TableCell>{sub.serialNumber}</TableCell>
                    <TableCell>{sub.location}</TableCell>
                    <TableCell>{sub.assignedTo}</TableCell>
                    <TableCell>{sub.nextMaintenance}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(sub)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(sub.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Assets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </CardContent>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />

        {/* DIALOG */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit Asset</DialogTitle>

          <DialogContent>
            {editedAsset && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                  label="Name"
                  value={editedAsset.name}
                  onChange={(e) =>
                    setEditedAsset({ ...editedAsset, name: e.target.value })
                  }
                />
                <TextField
                  label="Category"
                  value={editedAsset.category}
                  onChange={(e) =>
                    setEditedAsset({ ...editedAsset, category: e.target.value })
                  }
                />
                <TextField
                  label="Location"
                  value={editedAsset.location}
                  onChange={(e) =>
                    setEditedAsset({ ...editedAsset, location: e.target.value })
                  }
                />
                <TextField
                  label="Assigned To"
                  value={editedAsset.assignedTo}
                  onChange={(e) =>
                    setEditedAsset({ ...editedAsset, assignedTo: e.target.value })
                  }
                />
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>

      </Card>
    </Grid>
  );
}