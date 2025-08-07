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
  releaseDate: string;
  runtime: number;
  language?: string;
  languages?: string[];
  budget?: string;
  revenue?: string;
  production?: string;
  awardsSummary?: string;
  trailerUrl?: string;
  trailerYoutubeId?: string;
  relaseYear?: number;
  countriesOfOrigin?: string[];
  originalTitle?: string;
  homepage?: string;
}