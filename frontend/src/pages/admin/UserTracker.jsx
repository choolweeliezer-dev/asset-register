import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function UserTracker() {
  // dummy data for now (we’ll replace with API later)
  const rows = [
    {
      userCode: "U001",
      fullName: "John Doe",
      action: "Logged in",
    },
    {
      userCode: "U002",
      fullName: "Jane Smith",
      action: "Created asset",
    },
    {
      userCode: "U003",
      fullName: "Mike Johnson",
      action: "Deleted asset",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* TITLE */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        User Tracker
      </Typography>

      {/* CONTAINER */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Table>

              {/* HEADER */}
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    User Code
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Full Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* BODY */}
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.userCode}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </Paper>

        </CardContent>
      </Card>
    </Box>
  );
}