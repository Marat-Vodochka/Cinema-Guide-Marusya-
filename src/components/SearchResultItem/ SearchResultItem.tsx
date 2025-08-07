import styles from "./SearchResultItem.module.scss";
import type { Movie } from "../../types/movie";

type Props = {
  movie: Movie;
  onClick: () => void;
};

const formatRuntime = (runtime?: number) => {
  if (!runtime) return "";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours ? `${hours} ч ` : ""}${minutes ? `${minutes} мин` : ""}`;
};

const SearchResultItem = ({ movie, onClick }: Props) => (
  <div className={styles.card} onClick={onClick}>
    <div className={styles.poster}>
      <img src={movie.posterUrl} alt={movie.title} />
    </div>
    <div className={styles.info}>
      <div className={styles.row}>
        {movie.tmdbRating && (
          <span className={styles.rating}>★ {movie.tmdbRating}</span>
        )}
        <span className={styles.year}>
          {movie.releaseDate?.slice(0, 4)}
        </span>
        {movie.genres?.length > 0 && (
          <span className={styles.genre}>{movie.genres.join(", ")}</span>
        )}
        <span className={styles.runtime}>{formatRuntime(movie.runtime)}</span>
      </div>
      <div className={styles.title}>{movie.title}</div>
    </div>
  </div>
);

export default SearchResultItem;