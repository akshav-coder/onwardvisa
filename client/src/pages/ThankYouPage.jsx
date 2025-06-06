import { Box, Typography, Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.info;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ef 0%, #b6c6e6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 4,
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          background: "rgba(255,255,255,0.97)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(90deg, #3a5ba0 0%, #7bb0e7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "Playfair Display, serif",
            mb: 2,
          }}
        >
          🎉 Thank You for Your Booking!
        </Typography>
        <Typography
          variant="subtitle1"
          mb={4}
          sx={{
            color: "#3a4a6a",
            fontSize: 20,
            fontFamily: "Lora, serif",
            fontWeight: 500,
          }}
        >
          We have received your booking details. Safe travels!
        </Typography>
        {info && (
          <Box sx={{ textAlign: "left", mb: 4, mx: "auto", maxWidth: 400 }}>
            {Object.entries(info).map(([key, val]) =>
              typeof val === "string" || typeof val === "number" ? (
                <Typography
                  key={key}
                  sx={{
                    fontFamily: "Lora, serif",
                    color: "#2d3e5e",
                    fontSize: 17,
                    mb: 0.5,
                  }}
                >
                  <strong style={{ color: "#3a5ba0" }}>
                    {key.replace(/([A-Z])/g, " $1")}:{" "}
                  </strong>
                  {val}
                </Typography>
              ) : null
            )}
          </Box>
        )}
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            background: "linear-gradient(90deg, #3a5ba0 0%, #7bb0e7 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 3,
            boxShadow: "0 4px 16px 0 rgba(58,91,160,0.15)",
            "&:hover": {
              background: "linear-gradient(90deg, #2d3e5e 0%, #b6c6e6 100%)",
            },
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default ThankYouPage;
