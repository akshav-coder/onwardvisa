// routes/amadeusRoutes.js
const express = require("express");
const Amadeus = require("amadeus");
require("dotenv").config();

const router = express.Router();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// searching the cities in input
router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// listing the hotels in the city
router.get("/hotels", async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate } = req.query;

    console.log("Hotel offers response:");

    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode,
    });

    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/amadeus/auto-book
router.post("/auto-book", async (req, res) => {
  try {
    console.log("[AUTO-BOOK] Incoming body:", req.body);
    const { place } = req.body;
    const cityCode = place;
    console.log("[AUTO-BOOK] Using cityCode:", cityCode);
    // List hotels in the city
    const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
    });
    if (!hotelsList.data || hotelsList.data.length === 0) {
      console.log("[AUTO-BOOK] No hotels found for city:", cityCode);
      return res.status(404).json({ error: "No hotels found for this city." });
    }
    // Take the first hotel and return as booked
    console.log("[AUTO-BOOK] Hotels found:", hotelsList.data[0]);
    const bookedHotel = hotelsList.data[0];
    res.json({ bookedHotel });
  } catch (err) {
    console.error("[AUTO-BOOK] Error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;
