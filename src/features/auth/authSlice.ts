import type { PayloadAction } from "@reduxjs/toolkit";
import  { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  favorites: string[]; // список ID избранных фильмов
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (state.user && !state.user.favorites.includes(action.payload)) {
        state.user.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.favorites = state.user.favorites.filter(id => id !== action.payload);
      }
    },
  },
});

export const { loginSuccess, logout, addFavorite, removeFavorite } = authSlice.actions;

export default authSlice.reducer;