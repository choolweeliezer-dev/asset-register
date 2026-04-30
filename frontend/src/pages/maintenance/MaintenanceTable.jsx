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
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { maintenanceHis } from "../../components/dashboard/data/maintenanceMock";
import MaintenanceFormDialog from "./maintenanceForm";


export default function MaintenanceTable() {

  const [data, setData] = React.useState(maintenanceHis);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [formOpen, setFormOpen] = React.useState(false);

  // SORT STATE
  const [dateSort, setDateSort] = React.useState("none");

  // FILTER
  const filteredData = data.filter(item =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // SORT
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateSort === "asc") return dateA - dateB;
    if (dateSort === "desc") return dateB - dateA;

    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>

          {/* HEADER */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Maintenance History</Typography>
          </Box>

          {/* SEARCH + BUTTON */}
          <Box
            sx={{
              display: "flex",
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
          <Table
            sx={{
              "& th": { fontWeight: "bold" },
              "& td, & th": { borderBottom: "1px solid #eee" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                {/* DATE SORT */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Date
                    <IconButton
                      size="small"
                      onClick={() =>
                        setDateSort(prev =>
                          prev === "asc" ? "desc" : "asc"
                        )
                      }
                    >
                      {dateSort === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>Asset</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        transform: "scale(1.01)",
                      },
                    }}
                    onClick={() => handleOpen(item)}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.asset}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.engineer}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No maintenance records found
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

        {/* DIALOG (VIEW DETAILS) */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Maintenance Details</DialogTitle>

          <DialogContent>
            {selectedItem && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField label="Asset" value={selectedItem.asset} InputProps={{ readOnly: true }} />
                <TextField label="Location" value={selectedItem.location} InputProps={{ readOnly: true }} />
                <TextField label="Engineer" value={selectedItem.engineer} InputProps={{ readOnly: true }} />
                <TextField label="Status" value={selectedItem.status} InputProps={{ readOnly: true }} />
                <TextField label="Date" value={selectedItem.date} InputProps={{ readOnly: true }} />
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        {/**Sumbit Report Dialog */}
        <MaintenanceFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}/>

      </Card>
    </Grid>
  );
}