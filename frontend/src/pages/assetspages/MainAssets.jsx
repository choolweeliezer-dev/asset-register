import React from "react";
//import { useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAssetSummary, updateAsset, deleteAsset, getAssetById } from "../../api/assetApi";
import AddAssetDialog from "./AddAssetForm";
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

export default function MainAssets() {

  //const navigate = useNavigate();
  const queryClient = useQueryClient();

  // =========================
  // REACT QUERY
  // =========================
  const MAIN_CATEGORY_ID = 3;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assets", "main"],
    queryFn: () => getAssetSummary(MAIN_CATEGORY_ID),
  });

  const data = response?.data || [];

  // ========================= 
  // MUTATIONS 
  // =========================
  const updateMutation = useMutation({ 
    mutationFn: ({ id, data }) => updateAsset(id, data), 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["assets", "main"] }); 
      setOpen(false); }, });

  const deleteMutation = useMutation({ 
    mutationFn: deleteAsset, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["assets", "main"] }); 
    }, 
  });


  // =========================
  // FILTER STATE
  // =========================
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("");

  // =========================
  // PAGINATION
  // =========================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // =========================
  // DIALOG STATE
  // =========================
  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [assetDetail, setAssetDetail] = React.useState(null);
  const [formOpen, setFormOpen] = React.useState(false);

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography>Loading Main Assets...</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography color="error">
              Failed to load Main Assets
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredData = data.filter(item => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter ? item.status === statusFilter : true;

    const matchesLocation =
      locationFilter ? item.location === locationFilter : true;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // =========================
  // PAGINATION
  // =========================
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // =========================
  // HANDLERS
  // =========================
  const handleOpen = async (summary) => {
      const res = await getAssetById(summary.id);
      setAssetDetail(res.data);
      setSelectedAsset(summary);
      setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
    setAssetDetail(null);
    setSelectedAsset(null);
  };

  // =========================
  // UPDATE — goes through mutation (not raw updateAsset)
  // =========================
  const handleSave = () => {
    if (!assetDetail) return;

    const payload = {
      general: assetDetail.general,
      technical: assetDetail.technical,
      financial: assetDetail.financial,
      maintenance: assetDetail.maintenance,
    };
    // FIX: was calling updateAsset directly, bypassing the mutation entirely.
    // The mutation handles onSuccess (cache invalidation) and onError for us.
    updateMutation.mutate(
      { id: assetDetail.general.id, data: payload },
      {
        onSuccess: () => alert("Asset updated successfully"), 
        onError: (err) => 
          alert(err.response?.data?.message || "Failed to update asset"),
      }
    );
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this asset?")) return;
    deleteMutation.mutate(id,{
      onSuccess: () => alert("Asset deleted"), 
      onError: () => alert("Failed to delete asset"),
    });
  };

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Main Assets</Typography>
          </Box>

          <Box sx={{
            display: "flex",
            mb: 2,
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
                label="Status"
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 200 }}
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
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="HQ">HQ</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </TextField>
            </Box>

            <Button
              variant="contained"
              onClick={() => setFormOpen(true)}
            >
              Add Asset
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Next Maintenance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((sub) => (
                <TableRow key={sub.id} hover onClick={() => handleOpen(sub)}>
                  <TableCell>{sub.assetCode}</TableCell>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.category}</TableCell>
                  <TableCell>{sub.serialNumber}</TableCell>
                  <TableCell>{sub.location}</TableCell>
                  <TableCell>{sub.status}</TableCell>
                  <TableCell>{sub.assignedTo}</TableCell>
                  <TableCell>{sub.nextMaintenance}</TableCell>

                  <TableCell>
                    <IconButton color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(sub);
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(sub.id);
                    }} >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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

          {/* DIALOG */}
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>EDIT ASSET</DialogTitle>
          
                    <DialogContent>
                      {assetDetail && (
                        <Box sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          mt: 1,
                          alignItems: "center",
                        }}>
          
                          {/* GENERAL */}
                          <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Box sx={{ width: "75%" }}>
                              <Box sx={{
                                backgroundColor: "#e0e0e0",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                mb: 2,
                                textAlign: "center",
                              }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  General Information
                                </Typography>
                              </Box>
          
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <TextField fullWidth label="Asset Code"
                                    value={assetDetail.general.assetCode}
                                    disabled
                                  />
                                </Grid>
          
                                <Grid item xs={6}>
                                  <TextField fullWidth label="Name"
                                    value={assetDetail.general.name}
                                    onChange={(e) =>
                                      setAssetDetail({
                                        ...assetDetail,
                                        general: { ...assetDetail.general, name: e.target.value }
                                      })
                                    }
                                  />
                                </Grid>
          
                                <Grid item xs={6}>
                                  <TextField fullWidth label="Type"
                                    value={assetDetail.general.assetType || ""}
                                    onChange={(e) =>
                                      setAssetDetail({
                                        ...assetDetail,
                                        general: { ...assetDetail.general, assetType: e.target.value }
                                      })
                                    }
                                  />
                                </Grid>
          
                                <Grid item xs={6}>
                                  <TextField fullWidth label="Location"
                                    value={assetDetail.general.location || ""}
                                    onChange={(e) =>
                                      setAssetDetail({
                                        ...assetDetail,
                                        general: { ...assetDetail.general, location: e.target.value }
                                      })
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
          
                          {/* TECHNICAL */}
                          {(assetDetail.technical?.os || assetDetail.technical?.ipAddress) && (
                            <Box>
                              <Box sx={{
                                backgroundColor: "#e0e0e0",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                mb: 2,
                                textAlign: "center",
                              }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Technical
                                </Typography>
                              </Box>
          
                              <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={6}>
                                  <TextField fullWidth label="Operating System"
                                    value={assetDetail.technical.os || ""}
                                    onChange={(e) =>
                                      setAssetDetail({
                                        ...assetDetail,
                                        technical: { ...assetDetail.technical, os: e.target.value }
                                      })
                                    }
                                  />
                                </Grid>
          
                                <Grid item xs={6}>
                                  <TextField fullWidth label="IP Address"
                                    value={assetDetail.technical.ipAddress || ""}
                                    onChange={(e) =>
                                      setAssetDetail({
                                        ...assetDetail,
                                        technical: { ...assetDetail.technical, ipAddress: e.target.value }
                                      })
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          )}
          
                          {/* FINANCIAL */}
                          <Box>
                            <Box sx={{
                              backgroundColor: "#e0e0e0",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              mb: 2,
                              textAlign: "center",
                            }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Financial
                              </Typography>
                            </Box>
          
                            <Grid container spacing={2} justifyContent="center">
                              <Grid item xs={6}>
                                <TextField fullWidth label="Purchase Cost"
                                  value={assetDetail.financial.purchaseCost || ""}
                                  onChange={(e) =>
                                    setAssetDetail({
                                      ...assetDetail,
                                      financial: { ...assetDetail.financial, purchaseCost: e.target.value }
                                    })
                                  }
                                />
                              </Grid>
          
                              <Grid item xs={6}>
                                <TextField fullWidth label="Purchase Date"
                                  value={assetDetail.financial.purchaseDate || ""}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </Box>
          
                          {/* MAINTENANCE */}
                          <Box>
                            <Box sx={{
                              backgroundColor: "#e0e0e0",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              mb: 2,
                              textAlign: "center",
                            }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Maintenance
                              </Typography>
                            </Box>
          
                            <Grid container spacing={2} justifyContent="center">
                              <Grid item xs={6}>
                                <TextField fullWidth label="Next Maintenance"
                                  value={assetDetail.maintenance.nextMaintenance || ""}
                                  onChange={(e) =>
                                    setAssetDetail({
                                      ...assetDetail,
                                      maintenance: { ...assetDetail.maintenance, nextMaintenance: e.target.value }
                                    })
                                  }
                                />
                              </Grid>
          
                              <Grid item xs={6}>
                                <TextField fullWidth label="Last Maintenance"
                                  value={assetDetail.maintenance.lastMaintenance || ""}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </Box>
          
                          {/* AUDIT */}
                          <Box>
                            <Box sx={{
                              backgroundColor: "#e0e0e0",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              mb: 2,
                              textAlign: "center",
                            }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Audit Info
                              </Typography>
                            </Box>
          
                            <Grid container spacing={2} justifyContent="center">
                              <Grid item xs={6}>
                                <TextField fullWidth label="Created At"
                                  value={assetDetail.audit.createdAt || ""}
                                  disabled
                                />
                              </Grid>
          
                              <Grid item xs={6}>
                                <TextField fullWidth label="Updated At"
                                  value={assetDetail.audit.updatedAt || ""}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </Box>
          
                        </Box>
                      )}
                    </DialogContent>
          
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? "Saving..." : "Save Changes"}
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/**Sumbit Report Dialog */}
                                  <AddAssetDialog
                                  open={formOpen}
                                  onClose={() => setFormOpen(false)}/>
      </Card>
    </Grid>
  );
}