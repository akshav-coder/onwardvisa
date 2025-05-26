import React, { useState } from "react";
import { Flight, Hotel, SyncAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Tabs,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useSubmitFormMutation } from "../../services/authApi";
import ProjectTitle from "./ProjectTitle";

const buttonStyles = {
  backgroundColor: "white",
  color: "#3B3B3B",
  fontWeight: 400,
  borderRadius: "8px 8px 0px 0px",
  px: 8,
};

const FormPage = () => {
  const [bookingType, setBookingType] = useState("flight");
  const [tripType, setTripType] = useState("roundtrip");
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    multiCity: [{ from: "", to: "", date: "" }],
    hotelName: "",
    destinationCountry: "",
  });
  const [typedText, setTypedText] = React.useState("");
  const fullText = "Minutes";

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const handleBookingType = (type) => {
    setBookingType(type);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    const tabToTripType = ["roundtrip", "oneway", "multicity"];
    setTripType(tabToTripType[newValue]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiCityChange = (index, field, value) => {
    const updated = [...formData.multiCity];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, multiCity: updated }));
  };

  const addCity = () => {
    setFormData((prev) => ({
      ...prev,
      multiCity: [...prev.multiCity, { from: "", to: "", date: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    console.log("Submitting form with data:");
    e.preventDefault();
    const payload = {
      ...formData,
      type: bookingType,
      tripType,
    };
    console.log("Submitting: ", payload);
    alert("Booking submitted successfully!");

    try {
      const response = await submitForm(payload).unwrap(); // unwrap gets the actual response
      console.log("Form submitted successfully:", response);
      alert("Booking submitted successfully!");
      // Optionally, reset form or redirect user here
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Booking submission failed. Please try again.");
    }
  };

  React.useEffect(() => {
    let current = 0;
    let forward = true;
    let timeout;
    function type() {
      if (forward) {
        setTypedText(fullText.slice(0, current + 1));
        if (current < fullText.length - 1) {
          current++;
          timeout = setTimeout(type, 150);
        } else {
          forward = false;
          timeout = setTimeout(type, 1200);
        }
      } else {
        setTypedText(fullText.slice(0, current));
        if (current > 0) {
          current--;
          timeout = setTimeout(type, 80);
        } else {
          forward = true;
          timeout = setTimeout(type, 400);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          mt: 15,
          mb: 40,
          color: "white",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "34px", fontWeight: 800 }}>
          Get Embassy-Approved Travel
        </Typography>
        <Typography sx={{ fontSize: "34px", fontWeight: 800, mb: 2 }}>
          Documents in{" "}
          <span
            style={{
              borderRight: "2px solid #fff",
              paddingRight: 2,
              whiteSpace: "nowrap",
            }}
          >
            {typedText}
          </span>
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          Real flight tickets (with verifiable PNRs), hotel booking vouchers,
          and
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 3 }}>
          visa cover letters — trusted by 20,000+ travelers worldwide.
        </Typography>

        <Button variant="contained" size="large">
          Get My Travel Docs
        </Button>
      </Box>
      {/* ticket form */}
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          my: { xs: 2, md: 4 },
          mx: "auto",
          width: "100%",
          maxWidth: 1600,
          borderRadius: 2,
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              ...buttonStyles,
              px: { xs: 2, sm: 8 },
              width: { xs: "100%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              backgroundColor:
                bookingType === "flight"
                  ? "#AEBEFF"
                  : buttonStyles.backgroundColor,
              color: bookingType === "flight" ? "#0052cc" : buttonStyles.color,
              "&:hover": {
                color: "#0052cc",
                backgroundColor:
                  bookingType === "flight"
                    ? "#AEBEFF"
                    : buttonStyles.backgroundColor,
              },
            }}
            startIcon={<Flight />}
            onClick={() => handleBookingType("flight")}
          >
            Flight
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              ...buttonStyles,
              px: { xs: 2, sm: 8 },
              width: { xs: "100%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              backgroundColor:
                bookingType === "hotel"
                  ? "#AEBEFF"
                  : buttonStyles.backgroundColor,
              color: bookingType === "hotel" ? "#0052cc" : buttonStyles.color,
              "&:hover": {
                color: "#0052cc",
                backgroundColor:
                  bookingType === "hotel"
                    ? "#AEBEFF"
                    : buttonStyles.backgroundColor,
              },
            }}
            startIcon={<Hotel />}
            onClick={() => handleBookingType("hotel")}
          >
            Hotel
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              ...buttonStyles,
              px: { xs: 2, sm: 8 },
              width: { xs: "100%", sm: "auto" },
              mb: { xs: 1, sm: 0 },
              backgroundColor:
                bookingType === "both"
                  ? "#AEBEFF"
                  : buttonStyles.backgroundColor,
              color: bookingType === "both" ? "#0052cc" : buttonStyles.color,
              "&:hover": {
                color: "#0052cc",
                backgroundColor:
                  bookingType === "both"
                    ? "#AEBEFF"
                    : buttonStyles.backgroundColor,
              },
            }}
            startIcon={<SyncAlt />}
            onClick={() => handleBookingType("both")}
          >
            Both
          </Button>
        </Stack>

        <Box
          sx={{
            backgroundColor: "white",
            p: { xs: 1, sm: 3 },
            position: "relative",
            pb: 7,
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Tabs only for Flight or Both */}
            {(bookingType === "flight" || bookingType === "both") && (
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                sx={{ mb: 2 }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Round Trip" />
                <Tab label="One Way" />
                <Tab label="Multi City" />
              </Tabs>
            )}

            {/* Flight Booking Section */}
            {(bookingType === "flight" || bookingType === "both") && (
              <>
                <Typography variant="h6" mt={3} gutterBottom>
                  Flight Booking
                </Typography>
                {tripType === "multicity" ? (
                  <>
                    {formData.multiCity.map((leg, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <TextField
                          label="From"
                          value={leg.from}
                          onChange={(e) =>
                            handleMultiCityChange(i, "from", e.target.value)
                          }
                          fullWidth
                        />
                        <TextField
                          label="To"
                          value={leg.to}
                          onChange={(e) =>
                            handleMultiCityChange(i, "to", e.target.value)
                          }
                          fullWidth
                        />
                        <TextField
                          type="date"
                          label="Date"
                          InputLabelProps={{ shrink: true }}
                          value={leg.date}
                          onChange={(e) =>
                            handleMultiCityChange(i, "date", e.target.value)
                          }
                          fullWidth
                        />
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={addCity}
                      sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                      Add City
                    </Button>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      alignItems: { sm: "center" },
                      mb: 2,
                    }}
                  >
                    <TextField
                      label="From"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="To"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="Departure Date"
                      type="date"
                      name="departureDate"
                      InputLabelProps={{ shrink: true }}
                      value={formData.departureDate}
                      onChange={handleChange}
                      fullWidth
                    />
                    {tripType === "roundtrip" && (
                      <TextField
                        label="Return Date"
                        type="date"
                        name="returnDate"
                        InputLabelProps={{ shrink: true }}
                        value={formData.returnDate}
                        onChange={handleChange}
                        fullWidth
                      />
                    )}
                    <TextField
                      label="Travelers"
                      type="number"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                      fullWidth
                    />
                  </Box>
                )}
              </>
            )}

            {/* Hotel Booking Section */}
            {(bookingType === "hotel" || bookingType === "both") && (
              <>
                <Typography variant="h6" mt={4} gutterBottom>
                  Hotel Booking
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    alignItems: { sm: "center" },
                    mb: 2,
                  }}
                >
                  <TextField
                    label="Hotel Name"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Destination Country"
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -18,
                zIndex: 2,
                px: { xs: 1, sm: 0 },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: { xs: 2, sm: 6 },
                  boxShadow: 3,
                  width: { xs: "100%", sm: "auto" },
                }}
                color="primary"
                size="large"
              >
                Continue to checkout
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;
