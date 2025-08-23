// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginCredentials, RegisterPayload, User } from "./types";
import type { Movie } from "../../types/movie";

const BASE_URL =
  (import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE
    : "/api") ?? "/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // cookie/session
  }),
  endpoints: (builder) => ({
    // auth
    login: builder.mutation<void, LoginCredentials>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "GET" }),
    }),
    register: builder.mutation<void, RegisterPayload>({
      query: (body) => ({ url: "/user", method: "POST", body }),
    }),
    fetchMe: builder.query<User, void>({
      query: () => ({ url: "/profile", method: "GET" }),
    }),

    // favorites
    // GET /favorites -> Movie[]
    getFavorites: builder.query<Movie[], void>({
      query: () => ({ url: "/favorites", method: "GET" }),
    }),

    // POST /favorites (form-urlencoded: id=...) -> User (с обновлённым favorites)
    addFavorite: builder.mutation<User, string | number>({
      query: (id) => ({
        url: "/favorites",
        method: "POST",
        body: new URLSearchParams({ id: String(id) }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
    }),

    // DELETE /favorites/{movieId} -> User (с обновлённым favorites)
    removeFavorite: builder.mutation<User, string | number>({
      query: (movieId) => ({ url: `/favorites/${movieId}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useFetchMeQuery,
  useLazyFetchMeQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = authApi;
