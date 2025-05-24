import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import "./HowItWorks.css";
import step_1 from "../../assets/step_1.svg";
import step_2 from "../../assets/step_2.svg";
import step_3 from "../../assets/step_3.svg";

const steps = [
  {
    title: "Fill Your Trip Details",
    description: "Tell us your travel route and document needs.",
    number: "1",
    image: step_1, // Replace with actual path
  },
  {
    title: "Pay Securely",
    description:
      "Pay with Razorpay. All major cards, UPI, netbanking accepted.",
    number: "2",
    image: step_2,
  },
  {
    title: "Download Instantly",
    description:
      "Get your ticket, hotel, and cover letter via dashboard + email.",
    number: "3",
    image: step_3,
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 10, px: 2 }}>
      <Typography
        variant="button"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "24px",
          px: 2,
          py: 0.5,
          fontWeight: 600,
          mb: 4,
          display: "inline-block",
        }}
      >
        How it works
      </Typography>

      <Box className="howitworks-row">
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`howitworks-card howitworks-card-${index}`}
            sx={{
              width: 250,
              height: 300,
              position: "relative",

              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: "16px", fontWeight: 600 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: "20px", fontWeight: 600 }}
                >
                  {step.number}
                </Typography>
              </Stack>
              <Typography sx={{ mb: 1, fontSize: "14px" }}>
                {step.description}
              </Typography>
            </Box>

            <Box
              component="img"
              src={step.image}
              alt={step.title}
              sx={{
                maxHeight: 150,

                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HowItWorks;
