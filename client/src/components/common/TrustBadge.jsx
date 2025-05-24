import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import download from "../../assets/download.svg";
import pnr from "../../assets/pnr.svg";
import price from "../../assets/price.svg";
import visa_approved from "../../assets/visa_approved.svg";

const TrustBadge = () => {
  return (
    <Box sx={{ backgroundColor: "#fefafa", p: { xs: 5, md: 15 } }}>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <img
              src={pnr}
              alt="Trust Badge"
              style={{ width: "97px", height: "97px" }}
            />
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Verifiable PNR
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Your ticket comes with a real, checkable PNR number that can be
              verified on the airline’s website.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <img
              src={visa_approved}
              alt="Trust Badge"
              style={{ width: "97px", height: "97px" }}
            />
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Embassy-Safe Formats
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              All documents are generated in formats accepted by embassies
              worldwide for visa applications.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <img
              src={download}
              alt="Trust Badge"
              style={{ width: "97px", height: "97px" }}
            />
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              Instant Download
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Receive your ticket in minutes via email—ready to download and use
              instantly.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 3, textAlign: "center" }}>
            <img
              src={price}
              alt="Trust Badge"
              style={{ width: "97px", height: "97px" }}
            />
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
              100% Refund Guarantee
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Didn’t get what you expected? We offer a full refund, no questions
              asked.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrustBadge;
