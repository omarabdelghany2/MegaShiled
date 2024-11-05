import { LoginInfo, RegisterInfo, User, Verfiy } from "@/types"
import { apiSlice } from "./api"

const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<{ user: User }, any>({
      query: () => ({
        url: "/users/me",
        credentials: "include",
      }),
    }),
    login: builder.mutation<{ user: User }, LoginInfo>({
      query: info => ({
        url: "/dash/login",
        method: "POST",
        body: JSON.stringify(info),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "package",
        "subServices",
      ],
    }),
    register: builder.mutation<
      { user: User },
      RegisterInfo
    >({
      query: info => ({
        url: "/dash/register",
        method: "POST",
        body: JSON.stringify(info),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    verfiy: builder.mutation<
      { message: string },
      Verfiy
    >({
      query: info => ({
        url: "/homepage/ValidateToken",
        method: "POST",
        body: JSON.stringify(info),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
})

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerfiyMutation
} = authApi
