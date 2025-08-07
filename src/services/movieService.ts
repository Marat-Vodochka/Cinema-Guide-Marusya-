import api from "./api";
import type { Movie } from "../types/movie";


export const getTopMovies = async () => {
  const res = await api.get<Movie[]>("/movie/top10");
  return res.data;
};

export const getRandomMovie = async () => {
  const res = await api.get<Movie>("/movie/random");
  return res.data;
};

export async function getMovieById(id: string) {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const movie = await res.json();
  return movie;
}

export async function addToFavorites(movieId: number | string) {
  await api.post("/favorites", { id: String(movieId) }, { withCredentials: true });
}

export async function removeFromFavorites(movieId: number | string) {
  await api.delete(`/favorites/${movieId}`, { withCredentials: true });
}

export async function getFavorites() {
  const res = await api.get<Movie[]>("/favorites", { withCredentials: true });
  return res.data;
}

export async function getMovieByTitle(title: string) {
  const res = await api.get(`/movie?title=${encodeURIComponent(title)}&count=5`);
  return res.data;
}