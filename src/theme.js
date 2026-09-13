import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  h4: { fontWeight: 700, fontVariantNumeric: "tabular-nums" },
  h5: { fontWeight: 600 },
  button: { textTransform: "none", fontWeight: 600 },
};

const shape = { borderRadius: 10 };

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#F4F7F5",
    },
    primary: {
      main: "#2d7255",
      light: "#2D6A4F",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#0F1B14",
      secondary: "#6B7C74",
    },
    divider: "#E1E8E4",
  },
  typography,
  shape,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#0F1B14",
          borderBottom: "1px solid #E1E8E4",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#F4F7F5",
          borderRight: "1px solid #E1E8E4",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E1E8E4",
          boxShadow: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#124246",
      paper: "#122A3D",
    },
    primary: {
      main: "#52B788",
      light: "#74C69D",
      contrastText: "#0B1E2D",
    },
    text: {
      primary: "#E8F0EC",
      secondary: "#8FA69C",
    },
    divider: "#1E3A4F",
  },
  typography,
  shape,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B1E2D",
          color: "#E8F0EC",
          borderBottom: "1px solid #1E3A4F",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#122A3D",
          borderRight: "1px solid #1E3A4F",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #1E3A4F",
          boxShadow: "none",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: "#1E3A4F",
        },
      },
    },
  },
});