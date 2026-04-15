import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',

    h5: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontSize: '0.9rem',
    },

    body2: {
      fontSize: '0.8rem',
    },
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#374151',
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
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;