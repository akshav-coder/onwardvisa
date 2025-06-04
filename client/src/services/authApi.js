import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    submitForm: builder.mutation({
      query: (formData) => ({
        url: "/tickets/submit",
        method: "POST",
        body: formData,
      }),
    }),

    // 🔍 City search
    searchCity: builder.query({
      query: (keyword) => `/amadeus/search?keyword=${keyword}`,
    }),

    // 🏨 Hotel listings
    getHotels: builder.query({
      query: ({ cityCode, checkInDate, checkOutDate }) =>
        `/amadeus/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
    }),

    // 📦 Hotel offers
    getOffers: builder.query({
      query: ({ hotelId, adults, checkInDate, checkOutDate }) =>
        `/amadeus/offers?hotelId=${hotelId}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
    }),

    // ✅ Confirm offer
    confirmOffer: builder.query({
      query: (offerId) => `/amadeus/offer?offerId=${offerId}`,
    }),

    // 🧾 Book hotel
    bookHotel: builder.mutation({
      query: ({ offerId, data }) => ({
        url: `/amadeus/booking?offerId=${offerId}`,
        method: "POST",
        body: data,
      }),
    }),

    // 🤖 Auto book hotel
    autoBookHotel: builder.mutation({
      query: ({ place, adults, checkInDate, checkOutDate }) => ({
        url: "/amadeus/auto-book",
        method: "POST",
        body: { place, adults, checkInDate, checkOutDate },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSubmitFormMutation,
  useSearchCityQuery,
  useGetHotelsQuery,
  useGetOffersQuery,
  useConfirmOfferQuery,
  useBookHotelMutation,
  useAutoBookHotelMutation,
} = authApi;
