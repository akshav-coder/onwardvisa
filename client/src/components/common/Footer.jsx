import { ArrowUpward } from "@mui/icons-material";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#102781", color: "#fff" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{
          px: { xs: 2, sm: 4, md: 10 },
          pt: { xs: 4, md: 10 },
          gap: { xs: 4, md: 0 },
        }}
      >
        <Box sx={{ color: "#fff", mb: { xs: 2, md: 0 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              mb: 1,
              fontSize: { xs: 22, sm: 28, md: 32 },
            }}
          >
            Visas Made Simple
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, fontSize: { xs: 22, sm: 28, md: 32 } }}
          >
            Journeys Made Possible.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "#fff",
            underline: "hover",
            alignItems: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Link
            href="#"
            color="inherit"
            underline="hover"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          >
            Refund Policy
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          >
            Terms & Condition
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          >
            Contact support
          </Link>
        </Box>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{
          mt: { xs: 3, md: 5 },
          p: { xs: 2, md: 3 },
          borderTop: "1px solid #fff",
          gap: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: 12, md: 14 } }}>
          @ 2025 onwardvisa. All rights reserved
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
            Go Back to top
          </Typography>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              color: "#fff",
              border: "1px solid #fff",
              p: { xs: 0.5, md: 1 },
            }}
          >
            <ArrowUpward />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
