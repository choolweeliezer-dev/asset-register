import React from "react";
import { Box, Typography } from "@mui/material";
import SideNav from "./SideNav";

export default function Footer({isMobile}) {
    const sideNavWidth = 240;
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        position: "fixed",
        bottom: 16,
        left: isMobile ? 16 : sideNavWidth + 16,
        right: 16,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        px: 3,
        py: 1.5,

        borderRadius: 3,
        zIndex: 1300,

        background: "linear-gradient(90deg, #0f172a, #3b82f6, #a855f7)",
        backdropFilter: "blur(10px)",

        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      })}
    >
      {/* LEFT */}
      <Typography variant="body2">
        © {new Date().getFullYear()} Tylersoft 
      </Typography>

      {/* RIGHT */}
      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        v1.0.0
      </Typography>
    </Box>
  );
}