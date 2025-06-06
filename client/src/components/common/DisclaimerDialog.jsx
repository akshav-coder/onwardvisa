import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DisclaimerDialog = ({ open, onClose, onConfirm }) => {
  // Prevent closing on backdrop click or escape key
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#b26a00",
          background: "#fff8e1",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        <WarningAmberIcon sx={{ color: "#ff9800", fontSize: 32 }} />
        Important Notice
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#fff8e1",
        }}
      >
        <DialogContentText
          sx={{
            color: "#b26a00",
            fontWeight: 500,
            fontSize: 18,
            mb: 1,
          }}
        >
          This service is currently <b>under development</b> and not intended
          for public use.
          <br />
          <span style={{ color: "#d84315", fontWeight: 700, fontSize: 18 }}>
            The tickets you download here are for revision/testing purposes only
            and are not intended for public use.
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          background: "#fff8e1",
        }}
      >
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: "#ff9800",
            color: "#fff",
            fontWeight: 700,
            "&:hover": { background: "#e65100" },
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisclaimerDialog;
