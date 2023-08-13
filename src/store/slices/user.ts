import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "~/types/IUser"
import { useAppSelector } from "../hooks"
import { RootState } from "../store"

interface UserState {
  user: IUser | null
  isAuth: boolean
}

const initialState: UserState = {
  user: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { setUser, setIsAuth } = userSlice.actions

export const useSelectUser = () => {
  return useAppSelector((state: RootState) => state.userInfo)
}

export default userSlice.reducer
