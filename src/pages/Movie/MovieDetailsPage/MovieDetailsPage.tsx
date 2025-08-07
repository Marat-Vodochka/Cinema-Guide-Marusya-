import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.scss";
import { getMovieById } from "../../../services/movieService";
import type { Movie } from "../../../types/movie";
import Button from "../../../components/ui/Button/Button";
import IconFavorite from "../../../assets/icons/icon-fav.svg?react";
import IconFavoriteActive from "../../../assets/icons/icon-favorite-active.svg?react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../../../services/movieService";
import TrailerModal from "../../../components/ui/TrailerModal/TrailerModal";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId)
        .then(setMovie)
        .finally(() => setLoading(false));
      // Проверка, есть ли фильм в избранном
      getFavorites().then(favs => {
        setIsFavorite(favs.some(m => String(m.id) === String(movieId)));
      });
    }
  }, [movieId]);

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  const toggleFavorite = async () => {
    if (!movie) return;
    if (isFavorite) {
      await removeFromFavorites(movie.id);
      setIsFavorite(false);
    } else {
      await addToFavorites(movie.id);
      setIsFavorite(true);
    }
  };

  if (loading) return <div className={s.status}>Загрузка...</div>;
  if (!movie) return <div className={s.status}>Фильм не найден</div>;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.info}>
          <div className={s.topInfo}>
            <span className={s.rating}>
              {movie.tmdbRating ? Number(movie.tmdbRating).toFixed(1) : "N/A"}
            </span>
            <span className={s.year}>{movie.releaseDate?.slice(0, 4)}</span>
            <span className={s.genres}>{movie.genres?.join(", ")}</span>
            <span className={s.runtime}>
              {Math.floor(movie.runtime / 60)} ч {movie.runtime % 60} мин
            </span>
          </div>
          <h1 className={s.title}>{movie.title}</h1>
          <p className={s.plot}>{movie.plot}</p>
          <div className={s.actions}>
            <Button className={s.trailerBtn} onClick={handleTrailerClick}>
              Трейлер
            </Button>
            <button
              className={s.favoriteBtn}
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <IconFavoriteActive className={`${s.favoriteIcon} ${isFavorite ? s.favoriteIconActive : ""}`} />
              ) : (
                <IconFavorite
                  className={`${s.favoriteIcon} ${isFavorite ? s.favoriteIconActive : ""}`}
                />
              )}
            </button>
          </div>
        </div>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className={s.poster}
        />
      </div>
      <div className={s.detailsSection}>
        <h2 className={s.sectionTitle}>О фильме</h2>
        <div className={s.detailsGrid}>
          <div className={s.detailRow}>
            <span className={s.label}>Язык оригинала</span>
            <span className={s.value}>
              {movie.language || movie.languages?.join(", ")}
            </span>
          </div>
          <div className={s.detailRow}>
            <span className={s.label}>Бюджет</span>
            <span className={s.value}>{movie.budget}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.label}>Выручка</span>
            <span className={s.value}>{movie.revenue}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.label}>Режиссёр</span>
            <span className={s.value}>{movie.director}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.label}>Продакшен</span>
            <span className={s.value}>{movie.production}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.label}>Награды</span>
            <span className={s.value}>{movie.awardsSummary}</span>
          </div>
        </div>
      </div>
      {isTrailerOpen && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerUrl={movie.trailerUrl || `https://www.youtube.com/embed/${movie.trailerYoutubeId}`}
          movieTitle={movie.title}
        />
      )}
    </div>
  );
};

export default MovieDetailsPage;