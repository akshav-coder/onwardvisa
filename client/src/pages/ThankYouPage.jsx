import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.info;
  return (
    <Box sx={{ textAlign: "center", mt: 8, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🎉 Thank You for Your Booking!
      </Typography>
      <Typography variant="subtitle1" mb={4}>
        We have received your booking details. Safe travels!
      </Typography>
      {info && (
        <Box sx={{ textAlign: "left", mb: 4, mx: "auto", maxWidth: 400 }}>
          {Object.entries(info).map(([key, val]) => (
            typeof val === "string" || typeof val === "number" ? (
              <Typography key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {val}
              </Typography>
            ) : null
          ))}
        </Box>
      )}
      <Button variant="contained" onClick={() => navigate("/")}>Back to Home</Button>
    </Box>
  );
};

export default ThankYouPage;

