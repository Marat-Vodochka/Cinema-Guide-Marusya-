export interface Movie {
  id: number;
  title: string;
  plot: string;
  tmdbRating: number;
  backdropUrl: string;
  posterUrl: string;
  genres: string[];
  director?: string;
  cast?: string[];
  releaseDate: string,
  runtime: number
}