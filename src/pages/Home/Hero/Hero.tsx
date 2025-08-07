import { useEffect, useState } from "react";
import { getRandomMovie, addToFavorites, removeFromFavorites, getFavorites } from "../../../services/movieService";
import type { Movie } from "../../../types/movie";
import s from "./Hero.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import IconHeart from "../../../assets/icons/icon-fav.svg?react";
import IconRefresh from "../../../assets/icons/icon-refresh.svg?react";

import Button from "../../../components/ui/Button/Button";
import { useUser } from "../../../components/Authorization/UserContext";
import AuthModal from "../../../components/Authorization/AuthForm";
import TrailerModal from "../../../components/ui/TrailerModal/TrailerModal";

const Hero = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pendingFavoriteAction, setPendingFavoriteAction] = useState<"add" | "remove" | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchMovie = () => {
    getRandomMovie().then(setMovie);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    if (user && movie) {
      getFavorites().then(favs => {
        setIsFavorite(favs.some(f => f.id === movie.id));
      });
    } else {
      setIsFavorite(false);
    }
  }, [user, movie]);

  const handleFavoriteClick = () => {
    if (!user) {
      setPendingFavoriteAction(isFavorite ? "remove" : "add");
      setIsAuthOpen(true);
      return;
    }

    performFavoriteAction();
  };

  const performFavoriteAction = async () => {
    if (!movie) return;

    try {
      if (isFavorite) {
        await removeFromFavorites(movie.id);
        setIsFavorite(false);
        toast.success("Фильм удалён из избранного");
      } else {
        await addToFavorites(movie.id);
        setIsFavorite(true);
        toast.success("Фильм добавлен в избранное");
      }
    } catch (error) {
      toast.error("Ошибка при изменении избранного");
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    if (pendingFavoriteAction) {
      performFavoriteAction();
      setPendingFavoriteAction(null);
    }
  };

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  const handleAboutClick = () => {
    if (movie) {
      navigate(`/movie/${movie.id}`);
    }
  };

  if (!movie) return <div className={s.hero__loading}>Загрузка...</div>;

  const releaseYear = movie.releaseDate?.slice(0, 4) || "—";
  const duration =
    movie.runtime && movie.runtime > 0
      ? `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`
      : "";

  return (
    <section className={s.hero}>
      <div className={s.hero__content}>
        <div className={s.hero__info}>
          <div className={s.hero__wrapper}>
            <div className={s.hero__meta}>
              <span className={s.hero__rating}>★ {movie.tmdbRating}</span>
              <span className={s.hero__year}>{releaseYear}</span>
              <span className={s.hero__genres}>{movie.genres.join(", ")}</span>
              {duration && <span className={s.hero__duration}>{duration}</span>}
            </div>

            <h1 className={s.hero__title}>{movie.title}</h1>
            <p className={s.hero__description}>{movie.plot}</p>
          </div>

          <div className={s.hero__buttons}>
            <Button
              className={`${s.hero__btn} ${s["hero__btn--primary"]}`}
              onClick={handleTrailerClick}
            >
              Трейлер
            </Button>
            <div className={s.buttonsRow}>
              <Button className={`${s.hero__btn} ${s.btnAbout}`} onClick={handleAboutClick}>
                О фильме
              </Button>
              <Button
                className={s.hero__iconbtn}
                aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                onClick={handleFavoriteClick}
              >
                <IconHeart style={{ color: isFavorite ? "#B4A9FF" : "#fff" }} />
              </Button>
              <Button
                className={s.hero__iconbtn}
                aria-label="Обновить фильм"
                onClick={fetchMovie}
              >
                <IconRefresh />
              </Button>
            </div>
          </div>
        </div>

        <div className={s.hero__posterWrapper}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={s.hero__poster}
          />
        </div>
      </div>

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => {
            setIsAuthOpen(false);
            setPendingFavoriteAction(null);
          }}
          onLogin={handleAuthSuccess}
          onRegister={handleAuthSuccess}
        />
      )}

      {isTrailerOpen && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerUrl={movie.trailerUrl}
        />
      )}
    </section>
  );
};

export default Hero;