import type { FC } from "react";
import type { Movie } from "../../types/movie";
import s from "./MovieCard.module.scss";
import { useNavigate } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
  onAddFavorite?: () => void;
  rank?: number;
  showRank?: boolean;
  fullWidth?: boolean; // Добавить
};

const MovieCard: FC<MovieCardProps> = ({ movie, rank, showRank, onAddFavorite, fullWidth }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={`${s.card} ${fullWidth ? s.cardFullWidth : ''}`} onClick={handleClick}>
      {showRank && rank && (
        <span className={s.card__rank}>{rank}</span>
      )}
      <div className={s.card__inner}>
        <img
          src={movie.posterUrl}
          loading="lazy"
          alt={movie.title}
          className={s.card__image}
        />
      </div>
      {onAddFavorite && (
        <button onClick={onAddFavorite}>В избранное</button>
      )}
    </div>
  );
};

export default MovieCard;