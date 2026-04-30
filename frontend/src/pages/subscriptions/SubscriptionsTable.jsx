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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

import { assetsMock } from "../../components/dashboard/data/assetsMock";

export default function SubscriptionTable() {

  const navigate = useNavigate();

  const [data, setData] = React.useState(assetsMock);
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  const [selectedSub, setSelectedSub] = React.useState(null);
  const [editedSub, setEditedSub] = React.useState(null);

  // SORT STATES (ADDED)
  const [endDateSort, setEndDateSort] = React.useState("none");
  const [categorySort, setCategorySort] = React.useState("none");

  const filteredData = data
    .filter(item => item.type === "sub")
    .filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        (item.subscriptionType || "").toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter ? item.subscriptionType === typeFilter : true;

      return matchesSearch && matchesType;
    });

  // SORT LOGIC (CATEGORY + END DATE)
  const sortedData = [...filteredData].sort((a, b) => {

    // 1. CATEGORY SORT (primary if active)
    if (categorySort !== "none") {
      if (categorySort === "asc") {
        return a.category.localeCompare(b.category);
      }
      if (categorySort === "desc") {
        return b.category.localeCompare(a.category);
      }
    }

    // 2. END DATE SORT
    const dateA = new Date(a.subscriptionEndDate);
    const dateB = new Date(b.subscriptionEndDate);

    if (endDateSort === "asc") return dateA - dateB;
    if (endDateSort === "desc") return dateB - dateA;

    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpen = (sub) => {
    setSelectedSub(sub);
    setEditedSub(sub);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSub(null);
  };

  const handleSave = () => {
    const updated = data.map(item =>
      item.id === editedSub.id ? editedSub : item
    );
    setData(updated);
    handleClose();
  };

  const handleDelete = () => {
    const updated = data.filter(item => item.id !== selectedSub.id);
    setData(updated);
    handleClose();
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Subscriptions</Typography>
          </Box>

          <Box sx={{
            display: "flex",
            mb: 2,
            width: '100%',
            justifyContent: "space-between",
            alignItems: "center"
          }}>

            <Box>
              <TextField
                label="Search"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <TextField
                select
                label="Subscription Type"
                size="small"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quaterly</MenuItem>
                <MenuItem value="annual">Annual</MenuItem>
              </TextField>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate("/assetspages/add")}
            >
              Add Asset
            </Button>
          </Box>

          <Table sx={{
            '& th': { fontWeight: 'bold' },
            '& td, & th': { borderBottom: '1px solid #eee' }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>

                {/* CATEGORY SORT */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Category

                    <IconButton
                      size="small"
                      onClick={() =>
                        setCategorySort(prev =>
                          prev === "asc" ? "desc" : "asc"
                        )
                      }
                    >
                      {categorySort === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>Subscription Type</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Start Date</TableCell>

                {/* END DATE SORT */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    End Date

                    <IconButton
                      size="small"
                      onClick={() =>
                        setEndDateSort(prev =>
                          prev === "asc" ? "desc" : "asc"
                        )
                      }
                    >
                      {endDateSort === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>Action</TableCell>
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
                    <TableCell>{sub.subscriptionType}</TableCell>
                    <TableCell>{sub.subscriptionCost}</TableCell>
                    <TableCell>{sub.subscriptionStartDate}</TableCell>
                    <TableCell>{sub.subscriptionEndDate}</TableCell>

                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>

                      <IconButton color="error" onClick={() => handleDelete()}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No subscriptions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </CardContent>

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

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit Subscription</DialogTitle>

          <DialogContent>
            {editedSub && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                  label="Name"
                  value={editedSub.name}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, name: e.target.value })
                  }
                />
                <TextField
                  label="Category"
                  value={editedSub.category}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, category: e.target.value })
                  }
                />
                <TextField
                  label="Status"
                  value={editedSub.status}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, status: e.target.value })
                  }
                />
                <TextField
                  label="Assigned To"
                  value={editedSub.assignedTo}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, assignedTo: e.target.value })
                  }
                />
                <TextField
                  label="Subscription Type"
                  value={editedSub.subscriptionType}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, subscriptionType: e.target.value })
                  }
                />
                <TextField
                  label="Cost"
                  value={editedSub.subscriptionCost}
                  onChange={(e) =>
                    setEditedSub({ ...editedSub, subscriptionCost: e.target.value })
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