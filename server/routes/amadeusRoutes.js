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

// POST /api/amadeus/auto-book
router.post("/auto-book", async (req, res) => {
  try {
    console.log("[AUTO-BOOK] Incoming body:", req.body);
    const { place, adults, checkInDate, checkOutDate } = req.body;
    const cityCode = place;
    console.log("[AUTO-BOOK] Using cityCode:", cityCode);
    // 2. List hotels in the city
    const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
    });
    if (!hotelsList.data || hotelsList.data.length === 0) {
      console.log("[AUTO-BOOK] No hotels found for city:", cityCode);
      return res.status(404).json({ error: "No hotels found for this city." });
    }
    let foundOffer = null;
    let foundHotelId = null;
    for (const hotel of hotelsList.data) {
      try {
        console.log(`[AUTO-BOOK] Trying hotelId: ${hotel.hotelId}`);
        const pricingResponse = await amadeus.shopping.hotelOffersSearch.get({
          hotelIds: hotel.hotelId,
          adults,
          checkInDate,
          checkOutDate,
        });
        if (
          pricingResponse.data &&
          pricingResponse.data.length > 0 &&
          pricingResponse.data[0].offers &&
          pricingResponse.data[0].offers.length > 0
        ) {
          foundOffer = pricingResponse.data[0].offers[0];
          foundHotelId = hotel.hotelId;
          break;
        }
      } catch (err) {
        // Log and continue to next hotel
        console.log(
          `[AUTO-BOOK] No offers for hotelId: ${hotel.hotelId}`,
          err?.description || err?.message || err
        );
      }
    }
    if (!foundOffer) {
      console.log(
        "[AUTO-BOOK] No hotel offers found for any hotel in city:",
        cityCode
      );
      return res
        .status(404)
        .json({ error: "No hotel offers found for any hotel in this city." });
    }
    // 4. Book the first available offer
    const bookingPayload = {
      data: {
        type: "hotel-order",
        guests: [
          {
            tid: 1,
            title: "MR",
            firstName: "BOB",
            lastName: "SMITH",
            phone: "+33679278416",
            email: "bob.smith@email.com",
          },
        ],
        travelAgent: {
          contact: {
            email: "bob.smith@email.com",
          },
        },
        roomAssociations: [
          {
            guestReferences: [
              {
                guestReference: "1",
              },
            ],
            hotelOfferId: foundOffer.id,
          },
        ],
        payment: {
          method: "CREDIT_CARD",
          paymentCard: {
            paymentCardInfo: {
              vendorCode: "VI",
              cardNumber: "4151289722471370",
              expiryDate: "2026-08",
              holderName: "BOB SMITH",
            },
          },
        },
      },
    };
    console.log("[AUTO-BOOK] Booking payload:", bookingPayload);
    const bookingResponse = await amadeus.booking.hotelOrders.post(
      bookingPayload
    );
    console.log("[AUTO-BOOK] Booking response:", bookingResponse);
    res.json(JSON.parse(bookingResponse.body));
  } catch (err) {
    console.error("[AUTO-BOOK] Error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

module.exports = router;
