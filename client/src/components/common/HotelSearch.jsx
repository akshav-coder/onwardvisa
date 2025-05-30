import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  useSearchCityQuery,
  useGetHotelsQuery,
  useGetOffersQuery,
  useConfirmOfferQuery,
  useBookHotelMutation,
} from "../../services/authApi";

const HotelSearch = () => {
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Search city
  const { data: cityData } = useSearchCityQuery(cityInput, {
    skip: !cityInput,
  });

  const cityOptions =
    cityData?.data?.map((item) => ({
      label: item.address.cityName,
      code: item.address.cityCode,
    })) || [];

  // Get hotels
  const { data: hotelData, isLoading: hotelLoading } = useGetHotelsQuery(
    {
      cityCode: selectedCity?.code,
      checkInDate,
      checkOutDate,
    },
    {
      skip: !selectedCity || !checkInDate || !checkOutDate,
    }
  );

  const hotels = hotelData?.data || [];

  console.log("Hotels data:", hotels);

  // Get offers
  const { data: offerData, isLoading: offerLoading } = useGetOffersQuery(
    {
      hotelId: selectedHotel?.hotelId,
      adults: 1,
      checkInDate,
      checkOutDate,
    },
    {
      skip: !selectedHotel || !checkInDate || !checkOutDate,
    }
  );

  const offers = offerData?.data?.offers || [];

  // Confirm offer
  const { data: confirmedOffer } = useConfirmOfferQuery(selectedOffer?.id, {
    skip: !selectedOffer,
  });

  // Book hotel
  const [bookHotel, { isLoading: booking }] = useBookHotelMutation();

  const handleBook = async () => {
    const response = await bookHotel({
      offerId: selectedOffer.id,
      data: {
        guests: [
          {
            name: { title: "MR", firstName: "John", lastName: "Doe" },
            contact: { phone: "+1234567890", email: "john@example.com" },
          },
        ],
        payments: [
          {
            method: "creditCard",
            card: {
              vendorCode: "VI",
              cardNumber: "4111111111111111",
              expiryDate: "2026-01",
            },
          },
        ],
      },
    });
    console.log("Booking response:", response);
    alert("Hotel booked successfully!");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Hotel Booking
      </Typography>

      {/* City Search */}
      <Autocomplete
        options={cityOptions}
        onInputChange={(e, val) => setCityInput(val)}
        onChange={(e, val) => setSelectedCity(val)}
        renderInput={(params) => (
          <TextField {...params} label="City" fullWidth margin="normal" />
        )}
      />

      {/* Dates */}
      <TextField
        label="Check In"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <TextField
        label="Check Out"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />

      {/* Hotel List */}
      {hotelLoading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        hotels.map((hotel) => (
          <Box
            key={hotel?.hotelId}
            onClick={() => setSelectedHotel(hotel)}
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor:
                selectedHotel?.hotelId === hotel.hotelId
                  ? "#e3f2fd"
                  : "#f9f9f9",
              cursor: "pointer",
            }}
          >
            <Typography variant="subtitle1">{hotel.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {hotel.address?.lines?.join(", ") ||
                hotel.address?.cityName ||
                hotel.name}
              , {hotel.address?.cityName}
            </Typography>
          </Box>
        ))
      )}

      {/* Offers */}
      {selectedHotel && (
        <>
          <Typography variant="h6" mt={3}>
            Offers
          </Typography>
          {offerLoading ? (
            <CircularProgress />
          ) : offers.length === 0 ? (
            <Typography>No offers found</Typography>
          ) : (
            <List>
              {offers.map((offer) => (
                <React.Fragment key={offer.id}>
                  <ListItem
                    button
                    selected={selectedOffer?.id === offer.id}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <ListItemText
                      primary={`${
                        offer.room.description.text.split("\n")[0]
                      } - ${offer.price.total} ${offer.price.currency}`}
                      secondary={offer.room.typeEstimated.category}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </>
      )}

      {/* Confirm + Book */}
      {selectedOffer && confirmedOffer?.offers && (
        <Box mt={3}>
          <Typography color="green">
            Offer confirmed. You can now book it.
          </Typography>
          <Button
            onClick={handleBook}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={booking}
          >
            {booking ? "Booking..." : "Book Hotel"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HotelSearch;
