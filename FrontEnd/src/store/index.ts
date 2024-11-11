import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "@/app/api/api"
import authReducer from "@/app/features/AuthSlice"
import productReducer from "@/app/features/ProductSlice"
import bookingCartReducer from "@/app/features/BookingCartSlice"
import menuReducer from "@/app/features/MenuSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
    bookingCart: bookingCartReducer,
    menu: menuReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
