import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { User } from "@/types/user.types";

interface UsersState {
  data: User | null;
  access_token: string;
  refresh_token: string;
}

const initialState: UsersState = {
  data: null,
  access_token: "",
  refresh_token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UsersState>) => {
      const { access_token, refresh_token, data } = action.payload;
      state.data = data;
      state.access_token = access_token;
      state.refresh_token = refresh_token;

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("access_token", JSON.stringify(access_token));
      localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
    },

    setAccessToken: (
      state,
      action: PayloadAction<{ access_token: string }>
    ) => {
      const { access_token } = action.payload;
      state.access_token = access_token;
      localStorage.setItem("access_token", JSON.stringify(access_token));
    },

    logout: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.data = null;
      localStorage.clear();
    },
  },
});

export const { login, setAccessToken, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.data;
export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.access_token;
export const selectCurrentRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
