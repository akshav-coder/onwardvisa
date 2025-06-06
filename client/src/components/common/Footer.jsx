import { ArrowUpward } from "@mui/icons-material";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        color: "#333",
        pt: 8,
        pb: 4,
        position: "relative",
      }}
    >
      {/* Centered Slogan */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 500, fontSize: { xs: 18, sm: 22, md: 24 }, mb: 6 }}
      >
        Visas Made Simple. Journeys Made Possible.
      </Typography>

      {/* Centered Links */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: "wrap", mb: 4 }}
      >
        {[
          "Privacy Policy",
          "Refund Policy",
          "Terms & Condition",
          "Contact support",
        ].map((text, i) => (
          <Link
            key={i}
            href="#"
            underline="hover"
            color="inherit"
            sx={{ fontSize: { xs: 14, md: 16 } }}
          >
            {text}
          </Link>
        ))}
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: 2, md: 8 }, mb: 2, mt: 15 }}
      >
        {/* Bottom section */}
        <Typography variant="body2" align="center" sx={{ fontSize: 14 }}>
          © 2025 onwardvisa. All rights reserved
        </Typography>

        {/* Back to Top Button - Bottom Right */}
        <Box
          sx={{
            right: { xs: 16, md: 40 },
            bottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 14 }}>Go Back to top</Typography>
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ border: "1px solid #333", color: "#333", p: 0.5 }}
          >
            <ArrowUpward fontSize="small" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
