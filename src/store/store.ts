import { configureStore } from "@reduxjs/toolkit"
import { user } from "./slices"

const store = configureStore({
  reducer: {
    userInfo: user,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
