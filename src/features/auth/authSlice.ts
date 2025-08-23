// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthStatus } from "./types";
import { authApi } from "./authApi";

type AuthState = {
  user: User | null;
  status: AuthStatus;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logoutLocally(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMe
      .addMatcher(authApi.endpoints.fetchMe.matchPending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addMatcher(
        authApi.endpoints.fetchMe.matchFulfilled,
        (s, { payload }) => {
          s.status = "succeeded";
          s.user = payload;
        }
      )
      .addMatcher(authApi.endpoints.fetchMe.matchRejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message ?? "Failed to fetch user";
        s.user = null;
      })

      // login/register/logout
      .addMatcher(authApi.endpoints.login.matchPending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (s) => {
        s.status = "succeeded";
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message ?? "Login failed";
      })
      .addMatcher(authApi.endpoints.register.matchPending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (s) => {
        s.status = "succeeded";
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message ?? "Registration failed";
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (s) => {
        s.user = null;
      })

      // favorites: add / remove -> сервер возвращает User с обновлённым favorites
      .addMatcher(authApi.endpoints.addFavorite.matchPending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addMatcher(
        authApi.endpoints.addFavorite.matchFulfilled,
        (s, { payload }) => {
          s.status = "succeeded";
          // сливаем на случай, если на клиенте были дополнительные поля в user
          s.user = { ...(s.user ?? {}), ...payload };
        }
      )
      .addMatcher(authApi.endpoints.addFavorite.matchRejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message ?? "Failed to add favorite";
      })
      .addMatcher(authApi.endpoints.removeFavorite.matchPending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addMatcher(
        authApi.endpoints.removeFavorite.matchFulfilled,
        (s, { payload }) => {
          s.status = "succeeded";
          s.user = { ...(s.user ?? {}), ...payload };
        }
      )
      .addMatcher(authApi.endpoints.removeFavorite.matchRejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message ?? "Failed to remove favorite";
      });
  },
});

export const { setUser, logoutLocally } = authSlice.actions;
export default authSlice.reducer;
