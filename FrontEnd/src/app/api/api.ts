import { API } from "@/utils/server"
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API.apiV1}`,
  }),
  tagTypes: ["mainServices", "subServices", "package"],
  endpoints: () => ({}),
})
