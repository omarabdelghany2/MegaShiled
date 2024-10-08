import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://41.44.208.217:5176/api",
  }),
  tagTypes: ["mainServices", "subServices", "package"],
  endpoints: () => ({}),
})
