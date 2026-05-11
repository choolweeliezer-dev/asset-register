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

export const FormField = ({ label, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        fontWeight={600}
        color="text.secondary"
        sx={{ mb: 0.8 }}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
};

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
             {/* LOGO */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  //backgroundColor: '#fff',
                  padding: '6px 10px',
                  borderRadius: '10px',
                }}
              >
                <img
                  src="/tylerlogo.png"
                  alt="logo"
                  style={{ width: 250 }}
                />
              </Box>

            <Box sx={{ textAlign: "center", mt: 1, mb:3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                }}
              >
                Simplifying Lives Digitally
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1, textAlign: "center", fontWeight: 470 }}>
              Enter your credentials to continue
            </Typography>

            <Box>

              <FormField label="Email">
                <TextField
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>

              <FormField label="Password">
                <TextField
                  fullWidth
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>



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

            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  © 2026 TYLERSOFT-ELECTICS. All Rights Reserved.
                </Typography>
              </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}