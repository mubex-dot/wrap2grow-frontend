import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../pages/auth/authSlice";
import { authApiSlice } from "./authApiSlice";
import { wrapGrowApiSlice } from "./wrapGrowApiSlice";

const store = configureStore({
  reducer: {
    [wrapGrowApiSlice.reducerPath]: wrapGrowApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(wrapGrowApiSlice.middleware)
      .concat(authApiSlice.middleware), // caching middlewares
  devTools: true, // developer tools middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
