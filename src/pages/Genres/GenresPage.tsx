import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./GenresPage.module.scss";

// Images for genres mapping
const genreImages: Record<string, string> = {
  drama: new URL("../../assets/images/genre/genre-drama.jpg", import.meta.url)
    .href,
  comedy: new URL("../../assets/images/genre/genre-comedy.jpg", import.meta.url)
    .href,
  detective: new URL(
    "../../assets/images/genre/genre-detective.jpg",
    import.meta.url
  ).href,
  family: new URL("../../assets/images/genre/genre-family.jpg", import.meta.url)
    .href,
  history: new URL(
    "../../assets/images/genre/genre-history.jpg",
    import.meta.url
  ).href,
  thriller: new URL(
    "../../assets/images/genre/genre-thriller.jpg",
    import.meta.url
  ).href,
  fantasy: new URL(
    "../../assets/images/genre/genre-fantasy.jpg",
    import.meta.url
  ).href,
  adventure: new URL(
    "../../assets/images/genre/genre-adventure.jpg",
    import.meta.url
  ).href,
  horror: new URL("../../assets/images/genre/genre-horror.jpg", import.meta.url)
    .href,
  scifi: new URL("../../assets/images/genre/genre-scifi.jpg", import.meta.url)
    .href,
  mystery: new URL(
    "../../assets/images/genre/genre-mystery.jpg",
    import.meta.url
  ).href,
  romance: new URL(
    "../../assets/images/genre/genre-romance.jpg",
    import.meta.url
  ).href,
  music: new URL("../../assets/images/genre/genre-music.jpg", import.meta.url)
    .href,
  crime: new URL("../../assets/images/genre/genre-crime.jpg", import.meta.url)
    .href,
  "tv-movie": new URL(
    "../../assets/images/genre/genre-tv-movie.jpg",
    import.meta.url
  ).href,
  documentary: new URL(
    "../../assets/images/genre/genre-documentary.jpg",
    import.meta.url
  ).href,
  action: new URL("../../assets/images/genre/genre-action.jpg", import.meta.url)
    .href,
  western: new URL(
    "../../assets/images/genre/genre-western.jpg",
    import.meta.url
  ).href,
  animation: new URL(
    "../../assets/images/genre/genre-animation.jpg",
    import.meta.url
  ).href,
  war: new URL("../../assets/images/genre/genre-war.jpg", import.meta.url).href,
  "stand-up": new URL(
    "../../assets/images/genre/genre-stand-up.jpg",
    import.meta.url
  ).href,
};

type Genre = {
  name: string;
  image: string;
};

const GenresPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cinemaguide.skillbox.cc/movie/genres")
      .then((res) => res.json())
      .then((data) => {
        const genresWithImages = data.map((genre: string) => ({
          name: genre.charAt(0).toUpperCase() + genre.slice(1),
          image:
            genreImages[genre.toLowerCase()] ||
            new URL(
              "../../assets/images/genre/genre-fantasy.jpg",
              import.meta.url
            ).href,
        }));
        setGenres(genresWithImages);
      })
      .catch(() => setGenres([]));
  }, []);

  const handleGenreClick = (genre: string) => {
    navigate(`/movies?genre=${genre.toLowerCase()}`);
  };

  return (
    <div className={s.container}>
      <div className={s.genresWrapper}>
        <h1 className={s.title}>Genres</h1>
        <div className={s.cards}>
          {genres.map((genre) => (
            <div
              key={genre.name}
              className={s.card}
              onClick={() => handleGenreClick(genre.name)}
            >
              <img src={genre.image} alt={genre.name} className={s.cardImage} />
              <div className={s.cardName}>{genre.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
