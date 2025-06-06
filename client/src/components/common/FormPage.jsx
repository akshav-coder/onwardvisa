import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Tabs,
  Tab,
  TextField,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Flight, Hotel, SyncAlt } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useSubmitTicketFormMutation } from "../../services/apiSlice";
import flightImage from "../../assets/flight.png";
import {
  useAutoBookHotelMutation,
  useSearchCityQuery,
} from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import DisclaimerDialog from "./DisclaimerDialog";

dayjs.extend(isSameOrBefore);

// --- Animation Keyframes ---
const animationDuration = "3s";

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideFadeOutB = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    z-index: 2;
  }
  20% { z-index: 4; }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(-350px);
    z-index: 4;
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(-600px);
    z-index: 4;
  }
`;

const slideInC = keyframes`
  from {
    transform: translateX(-50%) translateY(0);
  }
  to {
    transform: translateX(-50%) translateY(-1000px);
  }
`;

// --- Button Styles ---
const buttonStyles = {
  backgroundColor: "white",
  color: "#3B3B3B",
  fontWeight: 400,
  borderRadius: "8px 8px 0px 0px",
  px: 8,
};

// --- BookingTypeButtons Component ---
const BookingTypeButtons = ({
  bookingType,
  handleBookingType,
  buttonStyles,
}) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
    {["flight", "hotel", "both"].map((type) => (
      <Button
        key={type}
        variant="contained"
        disableElevation
        sx={{
          ...buttonStyles,
          px: { xs: 2, sm: 8 },
          width: { xs: "100%", sm: "auto" },
          mb: { xs: 1, sm: 0 },
          backgroundColor:
            bookingType === type ? "#AEBEFF" : buttonStyles.backgroundColor,
          color: bookingType === type ? "#0052cc" : buttonStyles.color,
          "&:hover": {
            color: "#0052cc",
            backgroundColor:
              bookingType === type ? "#AEBEFF" : buttonStyles.backgroundColor,
          },
        }}
        startIcon={
          type === "flight" ? (
            <Flight />
          ) : type === "hotel" ? (
            <Hotel />
          ) : (
            <SyncAlt />
          )
        }
        onClick={() => handleBookingType(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    ))}
  </Stack>
);

// --- FlightBookingForm Component ---
const FlightBookingForm = ({
  tripType,
  tabIndex,
  handleTabChange,
  formData,
  handleChange,
  errors,
  handleMultiCityChange,
  addCity,
  today, // <-- add today as a prop
}) => (
  <>
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
              onChange={(e) => handleMultiCityChange(i, "from", e.target.value)}
              fullWidth
              error={!!errors[`multiCity[${i}].from`]}
              helperText={errors[`multiCity[${i}].from`]}
            />
            <TextField
              label="To"
              value={leg.to}
              onChange={(e) => handleMultiCityChange(i, "to", e.target.value)}
              fullWidth
              error={!!errors[`multiCity[${i}].to`]}
              helperText={errors[`multiCity[${i}].to`]}
            />
            <TextField
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              value={leg.date}
              onChange={(e) => handleMultiCityChange(i, "date", e.target.value)}
              fullWidth
              error={!!errors[`multiCity[${i}].date`]}
              helperText={errors[`multiCity[${i}].date`]}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addCity}>
          Add City
        </Button>
      </>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
          alignItems: "flex-start",
        }}
      >
        <TextField
          label="From"
          name="from"
          value={formData.from}
          onChange={handleChange}
          fullWidth
          error={!!errors.from}
          helperText={errors.from}
        />
        <TextField
          label="To"
          name="to"
          value={formData.to}
          onChange={handleChange}
          fullWidth
          error={!!errors.to}
          helperText={errors.to}
        />
        <TextField
          label="Departure Date"
          type="date"
          name="departureDate"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }}
          value={formData.departureDate}
          onChange={handleChange}
          fullWidth
          error={!!errors.departureDate}
          helperText={errors.departureDate}
        />
        {tripType === "roundtrip" && (
          <TextField
            label="Return Date"
            type="date"
            name="returnDate"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: dayjs(formData.departureDate)
                .add(1, "day")
                .format("YYYY-MM-DD"),
            }}
            value={formData.returnDate}
            onChange={handleChange}
            fullWidth
            error={!!errors.returnDate}
            helperText={errors.returnDate}
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
          error={!!errors.travelers}
          helperText={errors.travelers}
        />
      </Box>
    )}
  </>
);

// --- HotelBookingForm Component ---
const HotelBookingForm = ({
  cityOptions,
  selectedCity,
  setCityInput,
  setSelectedCity,
  setFormData,
  formData,
  errors,
  setErrors,
  handleChange,
  today, // <-- add today as a prop
}) => (
  <>
    <Typography variant="h6" mt={4} gutterBottom>
      Hotel Booking
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { sm: "flex-start" },
        mb: 2,
      }}
    >
      <Autocomplete
        options={cityOptions}
        value={selectedCity}
        onInputChange={(e, val) => setCityInput(val)}
        onChange={(e, val) => {
          setSelectedCity(val);
          setFormData((prev) => ({
            ...prev,
            destinationCountry: val?.code || "",
          }));
          if (errors.destinationCountry) {
            setErrors((prev) => ({
              ...prev,
              destinationCountry: "",
            }));
          }
        }}
        fullWidth
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Destination City"
            fullWidth
            error={!!errors.destinationCountry}
            helperText={errors.destinationCountry}
          />
        )}
      />
      <TextField
        label="Check In"
        type="date"
        name="checkInDate"
        value={formData.checkInDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: today }}
        fullWidth
        error={!!errors.checkInDate}
        helperText={errors.checkInDate}
      />
      <TextField
        label="Check Out"
        type="date"
        name="checkOutDate"
        value={formData.checkOutDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: dayjs(formData.checkInDate).add(1, "day").format("YYYY-MM-DD"),
        }}
        fullWidth
        error={!!errors.checkOutDate}
        helperText={errors.checkOutDate}
      />
      <TextField
        label="Adults"
        type="number"
        name="adults"
        value={formData.adults}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        fullWidth
        error={!!errors.adults}
        helperText={errors.adults}
      />
    </Box>
  </>
);

// --- Main Component ---
const FormPage = () => {
  const [cityInput, setCityInput] = useState("");
  const [bookingType, setBookingType] = useState("flight");
  const [selectedCity, setSelectedCity] = useState(null);
  const [tripType, setTripType] = useState("roundtrip");
  const [tabIndex, setTabIndex] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);
  const [cFinalTransform, setCFinalTransform] = useState(
    "translateX(-50%) translateY(0)"
  );
  const [typedText, setTypedText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const fullText = "Minutes";
  const [autoBookHotel, { isAutoLoading, data, error }] =
    useAutoBookHotelMutation();
  const navigate = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");

  const { data: cityData } = useSearchCityQuery(cityInput, {
    skip: !cityInput,
  });

  const cityOptions =
    cityData?.data?.map((item) => ({
      label: item.address.cityName,
      code: item.address.cityCode,
    })) || [];

  const initialFormData = {
    from: "",
    to: "",
    departureDate: today,
    returnDate: "",
    travelers: 1,
    multiCity: [{ from: "", to: "", date: today }],
    hotelName: "",
    destinationCountry: "",
    checkInDate: today,
    checkOutDate: "",
    adults: 1,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({}); // New state for validation errors

  const [submitTicketForm, { isLoading }] = useSubmitTicketFormMutation();

  const handleBookingType = (type) => {
    setBookingType(type);
    setFormData(initialFormData); // Clear the form when booking type changes
    setErrors({}); // Clear errors when booking type changes
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    const types = ["roundtrip", "oneway", "multicity"];
    setTripType(types[newValue]);
    setErrors({}); // Clear errors when trip type changes
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the specific field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMultiCityChange = (index, field, value) => {
    const updated = [...formData.multiCity];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, multiCity: updated }));
    // Clear errors for multi-city fields
    setErrors((prev) => ({
      ...prev,
      [`multiCity[${index}].${field}`]: "",
    }));
  };

  const addCity = () => {
    setFormData((prev) => ({
      ...prev,
      multiCity: [...prev.multiCity, { from: "", to: "", date: "" }],
    }));
  };

  // --- Validation Logic ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (bookingType === "flight" || bookingType === "both") {
      if (tripType === "multicity") {
        formData.multiCity.forEach((leg, index) => {
          if (!leg.from) {
            newErrors[`multiCity[${index}].from`] = "From is required";
            isValid = false;
          }
          if (!leg.to) {
            newErrors[`multiCity[${index}].to`] = "To is required";
            isValid = false;
          }
          if (!leg.date) {
            newErrors[`multiCity[${index}].date`] = "Date is required";
            isValid = false;
          } else if (dayjs(leg.date).isBefore(dayjs(), "day")) {
            newErrors[`multiCity[${index}].date`] =
              "Date cannot be in the past";
            isValid = false;
          }
        });
      } else {
        if (!formData.from) {
          newErrors.from = "From is required";
          isValid = false;
        }
        if (!formData.to) {
          newErrors.to = "To is required";
          isValid = false;
        }
        if (!formData.departureDate) {
          newErrors.departureDate = "Departure Date is required";
          isValid = false;
        } else if (dayjs(formData.departureDate).isBefore(dayjs(), "day")) {
          newErrors.departureDate = "Departure Date cannot be in the past";
          isValid = false;
        }
        if (tripType === "roundtrip" && !formData.returnDate) {
          newErrors.returnDate = "Return Date is required";
          isValid = false;
        } else if (
          tripType === "roundtrip" &&
          dayjs(formData.returnDate).isSameOrBefore(
            dayjs(formData.departureDate),
            "day"
          )
        ) {
          newErrors.returnDate = "Return Date must be after Departure Date";
          isValid = false;
        }
        if (formData.travelers < 1) {
          newErrors.travelers = "Number of travelers must be at least 1";
          isValid = false;
        }
      }
    }

    if (bookingType === "hotel" || bookingType === "both") {
      if (!formData.checkInDate) {
        newErrors.checkInDate = "Check-in Date is required";
        isValid = false;
      } else if (dayjs(formData.checkInDate).isBefore(dayjs(), "day")) {
        newErrors.checkInDate = "Check-in cannot be in the past";
        isValid = false;
      }
      if (!formData.checkOutDate) {
        newErrors.checkOutDate = "Check-out Date is required";
        isValid = false;
      } else if (
        dayjs(formData.checkOutDate).isSameOrBefore(
          dayjs(formData.checkInDate),
          "day"
        )
      ) {
        newErrors.checkOutDate = "Check-out must be after Check-in";
        isValid = false;
      }
      if (formData.adults < 1) {
        newErrors.adults = "At least 1 adult required";
        isValid = false;
      }
      if (!formData.destinationCountry) {
        newErrors.destinationCountry = "Destination Country is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (bookingType === "hotel") {
        // Only send hotel fields
        const payload = {
          place: formData.destinationCountry,
          adults: formData.adults,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
        };
        navigate("/checkout", { state: { bookingType: "hotel", payload } });
        return;
      } else if (bookingType === "flight") {
        let payload = {};
        if (tripType === "multicity") {
          payload = {
            multiCity: formData.multiCity,
            travelers: formData.travelers,
          };
        } else if (tripType === "roundtrip") {
          payload = {
            from: formData.from,
            to: formData.to,
            departureDate: formData.departureDate,
            returnDate: formData.returnDate,
            travelers: formData.travelers,
          };
        } else if (tripType === "oneway") {
          payload = {
            from: formData.from,
            to: formData.to,
            departureDate: formData.departureDate,
            travelers: formData.travelers,
          };
        }
        payload.type = bookingType;
        payload.tripType = tripType;
        navigate("/checkout", { state: { bookingType, payload } });
        return;
      } else if (bookingType === "both") {
        // Send both hotel and flight fields
        let flightPayload = {};
        if (tripType === "multicity") {
          flightPayload = {
            multiCity: formData.multiCity,
            travelers: formData.travelers,
          };
        } else if (tripType === "roundtrip") {
          flightPayload = {
            from: formData.from,
            to: formData.to,
            departureDate: formData.departureDate,
            returnDate: formData.returnDate,
            travelers: formData.travelers,
          };
        } else if (tripType === "oneway") {
          flightPayload = {
            from: formData.from,
            to: formData.to,
            departureDate: formData.departureDate,
            travelers: formData.travelers,
          };
        }
        flightPayload.type = "flight";
        flightPayload.tripType = tripType;
        const hotelPayload = {
          place: formData.destinationCountry,
          adults: formData.adults,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
        };
        navigate("/checkout", {
          state: {
            bookingType,
            payload: { flight: flightPayload, hotel: hotelPayload },
          },
        });
        return;
      }
    } else {
      console.log("Form has validation errors.");
    }
  };

  const handleAnimationStart = () => {
    if (!animationActive) {
      setAnimationActive(true);
      setCFinalTransform("translateX(-50%) translateY(0)");

      setTimeout(() => {
        setAnimationActive(false);
        setCFinalTransform("translateX(-50%) translateY(-1000px)");
      }, parseFloat(animationDuration) * 1000);
    }
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogConfirm = () => {
    handleSubmit({ preventDefault: () => {} });
    setDialogOpen(false);
  };

  useEffect(() => {
    let current = 0;
    let forward = true;
    let timeout;
    const type = () => {
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
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "1200px",
          mx: "auto",
          overflow: "hidden",
        }}
      >
        {/* Box A */}
        {(animationActive ||
          cFinalTransform === "translateX(-50%) translateY(0)") && (
          <Box
            sx={{
              mt: 15,
              mb: 20,
              color: "white",
              mx: "auto",
              textAlign: "center",
              position: "absolute",
              width: "100%",
              top: 0,
              left: 0,
              transform: "translateX(0)",
              zIndex: 3,
              animation: animationActive
                ? `${fadeOut} ${animationDuration} forwards linear`
                : "none",
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
              Real flight tickets (with verifiable PNRs), hotel booking
              vouchers, and
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 3 }}>
              visa cover letters — trusted by 20,000+ travelers worldwide.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleAnimationStart}
            >
              Get My Travel Docs
            </Button>
          </Box>
        )}

        {/* Box B */}
        {(animationActive ||
          cFinalTransform === "translateX(-50%) translateY(0)") && (
          <Box
            sx={{
              background: `url(${flightImage}) center top no-repeat`,
              mx: "auto",
              width: "280px",
              height: "330px",
              position: "absolute",
              top: "450px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              animation: animationActive
                ? `${slideFadeOutB} ${animationDuration} forwards linear`
                : "none",
            }}
          />
        )}

        {/* Box C */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            my: { xs: 2, md: 2 },
            mx: "auto",
            width: "100%",
            maxWidth: 1200,
            borderRadius: 2,
            position: "absolute",
            top: "1300px",
            left: "50%",
            animation: animationActive
              ? `${slideInC} ${animationDuration} forwards linear`
              : "none",
            transform: cFinalTransform,
            zIndex: 1,
          }}
        >
          {/* Booking Type Buttons */}
          <BookingTypeButtons
            bookingType={bookingType}
            handleBookingType={handleBookingType}
            buttonStyles={buttonStyles}
          />
          {/* Form Content */}
          <Box
            sx={{
              backgroundColor: "white",
              p: { xs: 1, sm: 3 },
              position: "relative",
              pb: 7,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <form onSubmit={handleSubmit}>
              {(bookingType === "flight" || bookingType === "both") && (
                <FlightBookingForm
                  tripType={tripType}
                  tabIndex={tabIndex}
                  handleTabChange={handleTabChange}
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                  handleMultiCityChange={handleMultiCityChange}
                  addCity={addCity}
                  today={today} // <-- pass today as a prop
                />
              )}
              {(bookingType === "hotel" || bookingType === "both") && (
                <HotelBookingForm
                  cityOptions={cityOptions}
                  selectedCity={selectedCity}
                  setCityInput={setCityInput}
                  setSelectedCity={setSelectedCity}
                  setFormData={setFormData}
                  formData={formData}
                  errors={errors}
                  setErrors={setErrors}
                  handleChange={handleChange}
                  today={today} // <-- pass today as a prop
                />
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
                  type="button"
                  variant="contained"
                  sx={{
                    px: { xs: 2, sm: 6 },
                    boxShadow: 3,
                    width: { xs: "100%", sm: "auto" },
                  }}
                  color="primary"
                  size="large"
                  disabled={isLoading}
                  onClick={handleDialogOpen}
                >
                  {isLoading ? "Submitting..." : "Continue to checkout"}
                </Button>
                <DisclaimerDialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  onConfirm={handleDialogConfirm}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;
