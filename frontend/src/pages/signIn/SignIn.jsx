import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";
//import { useEffect } from "react";

export default function SignIn() {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
          const response = await loginUser({
            email: email.trim(),
            password,
          });

          console.log("LOGIN RESPONSE:", response.data);

          const token = response.data?.token;

          if (!token) {
            throw new Error("No token found in response");
          }
                navigate("/assetspages/dash", { replace: true });

        } catch (err) {
          console.error("Login error:", err);

          if (err.response?.status === 401) {
            setError("Invalid email or password");
          } else {
            setError("An error occurred during login");
          }
        } finally {
          setLoading(false);
        }
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
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Enter your credentials to continue
            </Typography>

            <Box>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: 600,
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}