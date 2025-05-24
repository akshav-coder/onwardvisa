import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useLoginUserMutation, useSubmitFormMutation } = authApi;
