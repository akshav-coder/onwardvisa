import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useAutoBookHotelMutation } from "../../services/authApi";
import { useSubmitTicketFormMutation } from "../../services/apiSlice";
import { useSnackbar } from "../../hooks/useSnackbar";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingType = location.state?.bookingType;
  const bookingInfo = location.state?.payload || {};

  const [guests, setGuests] = useState([
    {
      title: "MR",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  ]);

  const [payment, setPayment] = useState({
    vendorCode: "VI",
    cardNumber: "",
    expiryDate: "",
    holderName: "",
  });

  const [errors, setErrors] = useState({});
  const [autoBookHotel, { isLoading: isAutoLoading }] =
    useAutoBookHotelMutation();
  const [submitTicketForm, { isLoading: isFlightLoading }] =
    useSubmitTicketFormMutation();
  const showSnackbar = useSnackbar();

  const handleGuestChange = (index, e) => {
    const { name, value } = e.target;
    setGuests((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const addGuest = () => {
    setGuests((prev) => [
      ...prev,
      {
        title: "MR",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const removeGuest = (index) => {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    guests.forEach((guest, idx) => {
      if (!guest.firstName)
        newErrors[`guest_${idx}_firstName`] = "First name required";
      if (!guest.lastName)
        newErrors[`guest_${idx}_lastName`] = "Last name required";
      if (!guest.phone) newErrors[`guest_${idx}_phone`] = "Phone required";
      if (!guest.email) newErrors[`guest_${idx}_email`] = "Email required";
    });

    if (!payment.cardNumber) newErrors.cardNumber = "Card number required";
    if (!payment.expiryDate) newErrors.expiryDate = "Expiry required";
    if (!payment.holderName) newErrors.holderName = "Cardholder name required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...bookingInfo,
      guests,
      payment,
    };

    try {
      if (bookingType === "hotel") {
        await autoBookHotel(payload).unwrap();
        showSnackbar("Hotel booked successfully!", "success");
        navigate("/");
      } else if (bookingType === "flight" || bookingType === "both") {
        await submitTicketForm(payload).unwrap();
        showSnackbar("Flight booked successfully!", "success");
        navigate("/");
      }
    } catch (err) {
      showSnackbar(
        bookingType === "hotel"
          ? "Hotel booking failed."
          : "Flight booking failed.",
        "error"
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, p: 3 }}>
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          ✈️ Final Step: Secure Your Booking
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Add guest details for each traveler in your group.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          👤 Guest Information
        </Typography>

        {guests.map((guest, index) => (
          <Box key={index} sx={{ mb: 4, position: "relative" }}>
            <Typography fontWeight="medium" gutterBottom>
              Guest {index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Title"
                  name="title"
                  value={guest.title}
                  onChange={(e) => handleGuestChange(index, e)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="MR">Mr</MenuItem>
                  <MenuItem value="MS">Ms</MenuItem>
                  <MenuItem value="MRS">Mrs</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={guest.firstName}
                  onChange={(e) => handleGuestChange(index, e)}
                  error={!!errors[`guest_${index}_firstName`]}
                  helperText={errors[`guest_${index}_firstName`]}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={guest.lastName}
                  onChange={(e) => handleGuestChange(index, e)}
                  error={!!errors[`guest_${index}_lastName`]}
                  helperText={errors[`guest_${index}_lastName`]}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={guest.phone}
                  onChange={(e) => handleGuestChange(index, e)}
                  error={!!errors[`guest_${index}_phone`]}
                  helperText={errors[`guest_${index}_phone`]}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={guest.email}
                  onChange={(e) => handleGuestChange(index, e)}
                  error={!!errors[`guest_${index}_email`]}
                  helperText={errors[`guest_${index}_email`]}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>

            {guests.length > 1 && (
              <IconButton
                onClick={() => removeGuest(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "error.main",
                }}
              >
                <RemoveCircle />
              </IconButton>
            )}
          </Box>
        ))}

        <Box mb={4}>
          <Button
            variant="outlined"
            onClick={addGuest}
            startIcon={<AddCircle />}
          >
            Add Another Guest
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          💳 Payment Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Card Type"
              name="vendorCode"
              value={payment.vendorCode}
              onChange={handlePaymentChange}
              fullWidth
              size="small"
            >
              <MenuItem value="VI">Visa</MenuItem>
              <MenuItem value="MC">MasterCard</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Card Number"
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              fullWidth
              size="small"
              autoComplete="cc-number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiry (YYYY-MM)"
              name="expiryDate"
              value={payment.expiryDate}
              onChange={handlePaymentChange}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
              fullWidth
              autoComplete="cc-exp"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cardholder Name"
              name="holderName"
              value={payment.holderName}
              onChange={handlePaymentChange}
              error={!!errors.holderName}
              helperText={errors.holderName}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <Box mt={5} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isAutoLoading || isFlightLoading}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: 2,
              boxShadow: 2,
              textTransform: "none",
            }}
          >
            {isAutoLoading || isFlightLoading
              ? "Booking..."
              : "✅ Confirm & Book"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutPage;
