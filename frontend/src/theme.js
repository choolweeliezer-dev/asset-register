import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#3b82f6", // clean blue (modern SaaS style)
      },

      background:{
        default: mode === "dark" ? "#0b1220" : "#f6f8fc",
        paper: mode === "dark" ? "#111827" : "#ffffff",
      },

      text: {
        primary: mode === "dark" ? "#e5e7eb" : "#111827",
        secondary: mode === "dark" ? "#9ca3af" : "#6b7280",
      },
    },

    typography: {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",

      h4: {
        fontWeight: 700,
        letterSpacing: -0.5,
      },

      h5: {
        fontWeight: 700,
        letterSpacing: -0.5,
      },

      h6: {
        fontWeight: 600,
      },

      body1: {
        fontSize: '0.9rem',
        lineHeight: 1.6,
      },

      body2: {
        fontSize: '0.8rem',
        lineHeight: 1.5,
      },
    },

     shape: {
      borderRadius: 12, 
    },


    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(0,0,0,0.4)"
                : "0 8px 24px rgba(0,0,0,0.06)",
          },
        },
      },
      
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            fontSize: '0.85rem',
            color: mode === "dark" ? "#e5e7eb" : "#374151",
          },
          body: {
            fontSize: '0.85rem',
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
          },
        },
      },
    },
  });