import {
  AddPackageProps,
  AddSubServiceProps,
  Booking,
  BookingProps,
  MainService,
  MainServiceProps,
  Package,
  Service,
} from "@/types"
import { apiSlice } from "./api"


const ServicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    AddMainService: builder.mutation<
      void,
      MainServiceProps
    >({
      query: arg => ({
        url: "/homepage",
        method: "POST",
        body: JSON.stringify(arg),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    ToggleBookingStateToDone: builder.mutation<
      void,
      { id: string, isCompleted: boolean }
    >({
      query: arg => ({
        url: `/bookings/complete/${arg.id}`,
        method: "POST",
        body: JSON.stringify(arg),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    UpdateMainService: builder.mutation<
      void,
      { arg: Partial<MainServiceProps>; id: string }
    >({
      query: arg => ({
        url: `/homepage/${arg.id}`,
        method: "PUT",
        body: JSON.stringify(arg.arg),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices"],
    }),
    DeleteMainService: builder.mutation<
      void,
      { id: string }
    >({
      query: arg => ({
        url: `/homepage/${arg.id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["mainServices"],
    }),
    GetServiceByID: builder.query<
      MainService,
      { id: string }
    >({
      query: arg => ({
        url: `/homepage/${arg.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    GetAllBookings: builder.query<
      { bookings: Booking[]; count: number },
      any
    >({
      query: () => ({
        url: `/bookings`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    GetAllBendingBookings: builder.query<
      { appointments: Booking[]; count: number },
      any
    >({
      query: () => ({
        url: `/bookings`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    GetAllReservedDates: builder.query<{ dates: string[] }, any>({
      query: () => ({
        url: `/bookings/dates`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    DeleteBooking: builder.mutation<
      void,
      { id: string }
    >({
      query: arg => ({
        url: `/bookings/${arg.id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["mainServices"],
    }),
    GetAllMainServices: builder.query<
      { mainServices: MainService[]; count: number },
      any
    >({
      query: () => ({
        url: `/homepage`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices"],
    }),
    GetSubServices: builder.query<
      { packages: Service[]; count: number },
      { id: string }
    >({
      query: args => ({
        url: `/packages/belongto/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices", "subServices"],
    }),
    AddSubService: builder.mutation<
      { services: Service[]; count: number },
      { service: AddSubServiceProps }
    >({
      query: args => ({
        url: `/packages`,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(args.service),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices", "subServices"],
    }),
    DeleteSubService: builder.mutation<any, { id: string }>(
      {
        query: args => ({
          url: `/packages/${args.id}`,
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }),
        invalidatesTags: ["mainServices", "subServices"],
      }
    ),
    UpdateSubService: builder.mutation<
      any,
      { id: string; props: Partial<Service> }
    >({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["mainServices", "subServices"],
    }),
    AddPackage: builder.mutation<
      any,
      { id: string; props: AddPackageProps }
    >({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    GetSubServiceByID: builder.query<
      { packages: Service[], count: number},
      { id: string }
    >({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["mainServices", "subServices"],
    }),
    GetSubServicePackages: builder.query<
      { packages: Package[]; count: number },
      { id: string }
    >({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    GetPackageByID: builder.query<{ packages:Package[]; count: number}, { id: string }>({
      query: args => ({
        url: `/packages/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    GetPackageByBelongTo: builder.query<Package, { id: string }>({
      query: args => ({
        url: `/packages/belongto/${args.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    DeletePackage: builder.mutation<any, { id: string }>({
      query: args => ({
        url: `/packages/deletePackage/${args.id}`,
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    UpdatePackage: builder.mutation<
      any,
      { id: string; props: Partial<AddPackageProps> }
    >({
      query: args => ({
        url: `/packages/updatePackage/${args.id}`,
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(args.props),
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
    AddBooking: builder.mutation<any, BookingProps>({
      query: args => ({
        url: `/bookings`,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      }),
      invalidatesTags: [
        "mainServices",
        "subServices",
        "package",
      ],
    }),
  }),
})

export const {
  useAddMainServiceMutation,
  useUpdateMainServiceMutation,
  useGetServiceByIDQuery,
  useGetAllMainServicesQuery,
  useDeleteMainServiceMutation,
  useGetAllBookingsQuery,
  useToggleBookingStateToDoneMutation,
  useGetAllBendingBookingsQuery,
  useDeleteBookingMutation,
  useGetSubServicesQuery,
  useAddSubServiceMutation,
  useDeleteSubServiceMutation,
  useGetSubServiceByIDQuery,
  useGetSubServicePackagesQuery,
  useUpdateSubServiceMutation,
  useAddPackageMutation,
  useDeletePackageMutation,
  useGetPackageByIDQuery,
  useUpdatePackageMutation,
  useAddBookingMutation,
  useGetAllReservedDatesQuery,
  useGetPackageByBelongToQuery
} = ServicesApiSlice
