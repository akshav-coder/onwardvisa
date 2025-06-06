const mongoose = require("mongoose");

const multiCitySchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    date: String,
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema({
  fullName: String,
  email: String,

  type: {
    type: String,
    enum: ["flight", "hotel", "both"],
    required: true,
  },

  // Flight Details
  tripType: {
    type: String,
    enum: ["oneway", "roundtrip", "multicity"],
  },
  from: String,
  to: String,
  departureDate: String,
  returnDate: String,
  travelers: Number,

  multiCity: [multiCitySchema],

  // Hotel Details
  hotelName: String,
  checkInDate: String,
  checkOutDate: String,
  adults: Number,

  // Common
  destinationCountry: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
