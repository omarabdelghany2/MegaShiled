import { API } from "@/utils/server";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";  // Import the RootState to access the token

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API.apiV1}`,
    prepareHeaders: (headers, { getState }) => {
      // Access token from Redux store
      const token = (getState() as RootState).auth.token;
      
      // If token exists, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      // Set default content type
      // headers.set("Content-type", "application/json");
      
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["mainServices", "subServices", "package"],
  endpoints: () => ({}),
});
