import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.20.10.10:5176/api",
  }),
  tagTypes: ["mainServices", "subServices", "package"],
  endpoints: () => ({}),
})
