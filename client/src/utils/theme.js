import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0052cc", // Deep sky blue from the CTA button
      },
      secondary: {
        main: "#4bb3fd", // Soft sky tone from the background
      },
      background: {
        default: "#ffffff", // White background for the site
        paper: "#f2f6fc", // Light card background
      },
      text: {
        primary: "#1a1a1a", // Default dark text
        secondary: "#4a4a4a", // Subtle grey
      },
    },
    typography: {
      fontFamily: "Manrope, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 8,
          },
          outlined: {
            color: "#0052cc",
            borderColor: "#0052cc",
            "&:hover": {
              backgroundColor: "#e6f0ff",
            },
          },
          contained: {
            backgroundColor: "#0052cc",
            "&:hover": {
              backgroundColor: "#003f99",
            },
          },
        },
      },
    },
  });
