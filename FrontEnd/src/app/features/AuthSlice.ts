import { RootState } from "@/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  isOpen: boolean
  token: string | null  // Add token to the state
}

const initialState: InitialState = {
  isOpen: false,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload  // Store token in the state
    },
  },
})

export const { toggleAuth, setToken } = authSlice.actions
export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth.isOpen
export const tokenSelector = (state: RootState) => state.auth.token
