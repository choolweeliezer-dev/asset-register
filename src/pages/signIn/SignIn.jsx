import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
 const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(isAdmin ? "Admin login" : "User login");

    navigate("/assetspages/dash");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >

      {/* CENTERED LOGIN */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Card
          sx={{
            width: 400,
            maxWidth: "100%",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            
            {/* TITLE *
            <Typography variant="h5" gutterBottom>
              {isAdmin ? "Admin Sign In" : "Sign In"}
            </Typography> */}

            <Typography variant="h5" gutterBottom>Sign In</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Enter your credentials to continue
            </Typography>

            {/* FORM */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            </Box>

            {/* ADMIN SWITCH *
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsAdmin((prev) => !prev)}
                sx={{ fontSize: "0.75rem" }}
              >
                {isAdmin ? "User Login" : "Admin"}
              </Link>
            </Box> */}

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}