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