import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const plans = [
  {
    title: "Onward Flight Ticket",
    subtitle: "Perfect for One-way flight reservation",
    price: "₹699",
    features: [
      "Includes passenger name and travel date",
      "Instant download + email delivery",
      "Free one-time date change included",
    ],
    buttonColor: "outlined",
  },
  {
    title: "Onward + Return Flight Ticket",
    subtitle: "Two flight reservations (departure & return)",
    price: "₹1099",
    features: [
      "Shared as a formatted PDF",
      "Instant download + email delivery",
      "Free one-time date change included",
    ],
    buttonColor: "outlined",
  },
  {
    title: "Flight + Hotel Comb",
    subtitle: "Includes flight reservation + hotel booking document",
    price: "₹1399",
    features: [
      "Documents matched to your provided dates",
      "Instant download + email delivery",
      "Free one-time date change included",
    ],
    buttonColor: "outlined",
  },
];

const PricingSection = () => {
  return (
    <Box sx={{ py: 6, px: 3, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Pricing
      </Typography>
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Tailored Pricing solutions
      </Typography>

      <Grid container spacing={3} justifyContent="center" mt={4}>
        {plans.map((plan, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ minHeight: 48 }}
                >
                  {plan.subtitle}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }}>
                  {plan.price}
                </Typography>

                <Button variant={plan.buttonColor} fullWidth sx={{ mb: 2 }}>
                  Book Now
                </Button>
                <List dense alignItems="flex-start" sx={{ mt: 0 }}>
                  {plan.features.map((feature, i) => (
                    <ListItem
                      key={i}
                      sx={{ px: 0, py: 0, alignItems: "flex-start" }}
                    >
                      <ListItemIcon sx={{ minWidth: 28, mt: "2px" }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Important Note Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="subtitle1" fontWeight={600} color="primary">
          Important Note
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FlightTakeoffIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All documents are provided in downloadable format after order confirmation" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlightTakeoffIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="These documents are intended for visa application purposes only" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlightTakeoffIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Not valid for check-in, boarding, or actual accommodation" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlightTakeoffIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="For date change, contact support with your order ID" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default PricingSection;
