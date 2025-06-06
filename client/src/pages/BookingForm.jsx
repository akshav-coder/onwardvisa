import React, { useState } from "react";
import "./BookingForm.css";
import { useSubmitFormMutation } from "../services/authApi";
import { useSnackbar } from "../components/common/SnackbarProvider";

const BookingForm = () => {
  const [bookingType, setBookingType] = useState("flight");
  const [tripType, setTripType] = useState("oneway");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    // Flight Info
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    multiCity: [{ from: "", to: "", date: "" }],
    // Hotel Info
    hotelName: "",
    destinationCountry: "",
  });

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const showSnackbar = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    e.preventDefault();
    const payload = {
      ...formData,
      type: bookingType,
      tripType,
    };

    try {
      const response = await submitForm(payload).unwrap(); // unwrap gets the actual response
      console.log("Form submitted successfully:", response);
      showSnackbar("Booking submitted successfully!", "success");
      // Optionally, reset form or redirect user here
    } catch (error) {
      console.error("Submission failed:", error);
      showSnackbar("Booking submission failed. Please try again.", "error");
    }
  };

  return (
    <div className="booking-container">
      <h2 className="form-title">Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="bookingType">Booking Type</label>
          <select
            id="bookingType"
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
          >
            <option value="flight">Flight</option>
            <option value="hotel">Hotel</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {(bookingType === "flight" || bookingType === "both") && (
          <div className="form-section">
            <h3>Flight Booking</h3>
            <div className="form-group">
              <label htmlFor="tripType">Trip Type</label>
              <select
                id="tripType"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="oneway">One Way</option>
                <option value="roundtrip">Round Trip</option>
                <option value="multicity">Multi City</option>
              </select>
            </div>
            {tripType === "multicity" ? (
              <>
                {formData.multiCity.map((leg, i) => (
                  <div key={i} className="multi-city-group">
                    <div className="form-group">
                      <label>From</label>
                      <input
                        type="text"
                        placeholder="Departure City"
                        value={leg.from}
                        onChange={(e) =>
                          handleMultiCityChange(i, "from", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>To</label>
                      <input
                        type="text"
                        placeholder="Arrival City"
                        value={leg.to}
                        onChange={(e) =>
                          handleMultiCityChange(i, "to", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={leg.date}
                        onChange={(e) =>
                          handleMultiCityChange(i, "date", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={addCity}
                >
                  Add City
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <input
                    id="from"
                    type="text"
                    name="from"
                    placeholder="Departure City"
                    value={formData.from}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <input
                    id="to"
                    type="text"
                    name="to"
                    placeholder="Arrival City"
                    value={formData.to}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="departureDate">Departure Date</label>
                  <input
                    id="departureDate"
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                  />
                </div>
                {tripType === "roundtrip" && (
                  <div className="form-group">
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                      id="returnDate"
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="travelers">Travelers</label>
                  <input
                    id="travelers"
                    type="number"
                    name="travelers"
                    min={1}
                    value={formData.travelers}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {(bookingType === "hotel" || bookingType === "both") && (
          <div className="form-section">
            <h3>Hotel Booking</h3>
            <div className="form-group">
              <label htmlFor="hotelName">Hotel Name</label>
              <input
                id="hotelName"
                type="text"
                name="hotelName"
                placeholder="Hotel Name"
                value={formData.hotelName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="destinationCountry">Destination Country</label>
              <input
                id="destinationCountry"
                type="text"
                name="destinationCountry"
                placeholder="Country"
                value={formData.destinationCountry}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
