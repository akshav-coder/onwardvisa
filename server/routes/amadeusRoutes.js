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

// selected hotel offers
router.get("/offers", async (req, res) => {
  try {
    const { hotelId, adults, checkInDate, checkOutDate } = req.query;
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelId,
      adults,
      checkInDate,
      checkOutDate,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/amadeus/offer?offerId=ABC123
router.get("/offer", async (req, res) => {
  try {
    const { offerId } = req.query;
    const response = await amadeus.shopping.hotelOffer(offerId).get();
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/amadeus/booking?offerId=ABC123
router.post("/booking", async (req, res) => {
  try {
    const { offerId } = req.query;
    const { guests, payments } = req.body;
    const response = await amadeus.booking.hotelOrders.post(
      JSON.stringify({
        data: { offerId, guests, payments },
      })
    );
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
