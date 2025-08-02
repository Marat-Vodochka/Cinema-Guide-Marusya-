import { useEffect, useState } from "react";
import { getRandomMovie } from "../../../services/movieService";
import type { Movie } from "../../../types/movie";
import s from "./Hero.module.scss";

import IconHeart from "../../../assets/icons/icon-fav.svg?react";
import IconRefresh from "../../../assets/icons/icon-refresh.svg?react";

import Button from "../../../components/ui/Button/Button";

const Hero = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = () => {
    getRandomMovie().then(setMovie);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) return <div className={s.hero__loading}>Загрузка...</div>;

  const releaseYear = movie.releaseDate?.slice(0, 4) || "—";
  const duration =
    movie.runtime && movie.runtime > 0
      ? `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`
      : "";

  return (
    <section
      className={s.hero}
    >
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
            <Button className={`${s.hero__btn} ${s['hero__btn--primary']}`}>
              Трейлер
            </Button>
            <div className={s.buttonsRow}>
              <Button className={`${s.hero__btn} ${s.btnAbout}`}>О фильме</Button>
              <Button className={s.hero__iconbtn} aria-label="В избранное">
                <IconHeart />
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
    </section>
  );
};

export default Hero;