import React, { useState } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import { SnackbarContext } from "../../hooks/SnackbarContext";

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success", "error", "warning", "info"
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Slide}
        sx={{
          "& .MuiSnackbarContent-root": {
            boxShadow: 6,
            borderRadius: 2,
            background: "rgba(30, 41, 59, 0.95)",
            color: "#fff",
          },
        }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          elevation={8}
          sx={{
            width: "100%",
            fontWeight: 600,
            letterSpacing: 0.5,
            boxShadow: 6,
            borderRadius: 3,
            background:
              snackbar.severity === "success"
                ? "linear-gradient(90deg, #bbf7d0 0%, #4ade80 100%)"
                : snackbar.severity === "error"
                ? "linear-gradient(90deg, #fecaca 0%, #f87171 100%)"
                : snackbar.severity === "warning"
                ? "linear-gradient(90deg, #fef9c3 0%, #facc15 100%)"
                : "linear-gradient(90deg, #dbeafe 0%, #60a5fa 100%)",
            color:
              snackbar.severity === "warning"
                ? "#92400e"
                : snackbar.severity === "success"
                ? "#166534"
                : snackbar.severity === "error"
                ? "#991b1b"
                : "#1e40af",
            border: "none",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
