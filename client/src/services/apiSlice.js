import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    submitTicketForm: builder.mutation({
      query: (formData) => ({
        url: "/tickets/submit",
        method: "POST",
        body: formData,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useSubmitTicketFormMutation } = apiSlice;
