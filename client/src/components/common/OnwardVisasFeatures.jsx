import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import why_choose from "../../assets/why_choose.jpg";

const featuresTopRight = [
  {
    title: "Real PNR Flight Tickets",
    desc: "Booked through official SRDV APIs and verifiable by airlines.",
    index: "01",
  },
  {
    title: "Embassy-Compliant Hotel Vouchers",
    desc: "Approved formats with real property details and confirmation numbers.",
    index: "02",
  },
];

const featuresBottom = [
  {
    title: "AI-Powered Visa Cover Letters",
    desc: "Auto-generated and customized per country — saves hours of manual writing.",
    index: "03",
  },
  {
    title: "Refund or Reissue Guarantee",
    desc: "Mistake in your doc or visa denied? We’ll fix it or refund — no hassle.",
    index: "04",
  },
  {
    title: "Instant Delivery",
    desc: "No waiting. Download your documents right after payment.",
    index: "05",
  },
];

const OnwardVisasSection = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container sx={{ minHeight: { xs: 0, md: 700 } }}>
        {/* 1st grid */}
        <Grid
          item
          size={{ xs: 12, md: 3 }}
          sx={{ display: "flex", minHeight: { xs: 180, md: 400 } }}
        >
          <Box
            sx={{
              flex: 1,
              position: "relative",
              minHeight: { xs: 180, md: 400 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Background Image with Opacity */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${why_choose})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
                zIndex: 1,
                borderRadius: { xs: 2, md: 0 },
              }}
            />

            {/* Centered Text */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#1e2ebf",
                  fontSize: { xs: 18, sm: 22, md: 24 },
                }}
              >
                Why 20,000+ Travelers
                <br />
                Trust OnwardVisas
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 2nd grid */}
        <Grid item size={{ xs: 12, md: 9 }}>
          <Grid container sx={{ height: "100%" }}>
            {featuresTopRight.map((item) => (
              <Grid key={item.index} item size={{ xs: 12, sm: 6, md: 6 }}>
                <Box
                  sx={{
                    p: { xs: 2, sm: 2 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    borderRight: {
                      md: ["01", "03", "04"].includes(item.index)
                        ? "1px solid #808080"
                        : "none",
                      xs: "none",
                    },
                    borderBottom: {
                      xs: "1px solid #808080",
                      md: "1px solid #808080",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 18 } }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: 13, sm: 15 } }}
                  >
                    {item.desc}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.secondary",
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      textAlign: "left",
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    ({item.index})
                  </Typography>
                </Box>
              </Grid>
            ))}
            {featuresBottom.map((item) => (
              <Grid key={item.index} item size={{ xs: 12, sm: 4, md: 4 }}>
                <Box
                  sx={{
                    p: { xs: 1, sm: 2 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    borderRight: {
                      md: ["01", "03", "04"].includes(item.index)
                        ? "1px solid #808080"
                        : "none",
                      xs: "none",
                    },
                    borderBottom: { xs: "1px solid #808080", md: "none" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 18 } }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: 13, sm: 15 } }}
                  >
                    {item.desc}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.secondary",
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      textAlign: "left",
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    ({item.index})
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnwardVisasSection;
