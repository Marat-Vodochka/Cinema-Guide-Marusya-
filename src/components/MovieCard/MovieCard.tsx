import type { FC } from "react";
import type { Movie } from "../../types/movie";
import s from "./MovieCard.module.scss";

type MovieCardProps = {
  movie: Movie;
  rank: number;
};

const MovieCard: FC<MovieCardProps> = ({ movie, rank }) => {
  return (
    <div className={s.card}>
  <span className={s.card__rank}>{rank}</span>
  <div className={s.card__inner}>
    <img
      src={movie.posterUrl}
      loading="lazy"
      alt={movie.title}
      className={s.card__image}
    />
  </div>
</div>
  );
};

export default MovieCard;