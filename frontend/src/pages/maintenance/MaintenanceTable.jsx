import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import MaintenanceFormDialog from "./maintenanceForm";
import {
  getAllMaintenance,
  updateMaintenance,
  startMaintenance,
  completeMaintenance,
  failMaintenance,
} from "../../api/maintenanceApi";

export default function MaintenanceTable() {
  const queryClient = useQueryClient();

  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [formOpen, setFormOpen] = React.useState(false);

  // =========================
  // GET MAINTENANCE RECORDS
  // =========================
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["maintenance-records"],
    queryFn: getAllMaintenance,
  });

  const data = response?.data || [];

  // =========================
  // UPDATE STATUS LOGIC (FIXED)
  // =========================
  const handleStatusUpdate = async (id, status) => {
    try {
      if (status === "IN_PROGRESS") {
        await startMaintenance(id);
      } else if (status === "COMPLETED") {
        await completeMaintenance(id);
      } else if (status === "FAILED") {
        await failMaintenance(id);
      }

      // correct react-query refresh (NO refetch bug)
      queryClient.invalidateQueries({ queryKey: ["maintenance-records"] });

      setOpen(false);
      setSelectedItem(null);
    } catch (err) {
      console.error("Status update failed:", err.response?.data || err.message);
      alert("Update failed");
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // =========================
  // OPEN/CLOSE
  // =========================
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  // =========================
  // STATUS COLOR
  // =========================
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "IN_PROGRESS":
        return "info";
      case "COMPLETED":
        return "success";
      case "FAILED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6">Maintenance History</Typography>

          {/* SEARCH */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <TextField
              label="Search"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button variant="contained" onClick={() => setFormOpen(true)}>
              Submit Report
            </Button>
          </Box>

          {/* TABLE */}
          {!isLoading && !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset Code</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Maintenance Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Maintenance Date</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Technician</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow
                    key={item.maintenanceId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOpen(item)}
                  >
                    <TableCell>{item.assetCode}</TableCell>
                    <TableCell>{item.assetName}</TableCell>
                    <TableCell>{item.maintenanceCode}</TableCell>
                    <TableCell>{item.description}</TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {item.scheduledDate || "N/A"}
                    </TableCell>
                    <TableCell>P {item.cost}</TableCell>
                    <TableCell>{item.performedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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

        {/* DETAILS DIALOG */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Maintenance Details</DialogTitle>

          <DialogContent>
            {selectedItem && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField value={selectedItem.assetCode} label="Asset Code" InputProps={{ readOnly: true }} />
                <TextField value={selectedItem.assetName} label="Asset Name" InputProps={{ readOnly: true }} />

                <TextField
                  select
                  label="Status"
                  value={selectedItem.status}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                  <MenuItem value="FAILED">FAILED</MenuItem>
                </TextField>

                <TextField
                  value={selectedItem.description}
                  label="Description"
                  multiline
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      description: e.target.value,
                    })
                  }
                />
              </Box>
            )}
          </DialogContent>

          {/* CLEAN BUTTONS (NO TOGGLE MAGIC) */}
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={() =>
                handleStatusUpdate(
                  selectedItem.maintenanceId,
                  selectedItem.status
                )
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <MaintenanceFormDialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
        />
      </Card>
    </Grid>
  );
}