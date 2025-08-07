import { useEffect, useState } from "react";
import { getTopMovies } from "../../../services/movieService";
import type { Movie } from "../../../types/movie";
import MovieCard from "../../../components/MovieCard/MovieCard";
import s from "./TopMovies.module.scss";

const TopMovies = () => {
  const [list, setList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopMovies()
      .then(setList)
      .catch(() => setError("Не удалось загрузить фильмы"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={s.status}>Загрузка...</div>;
  if (error) return <div className={s.status}>{error}</div>;

  return (
    <section className={s.top}>
      <h2 className={s.top__title}>Топ 10 фильмов</h2>
      <div className={s.top__grid}>
        {list.slice(0, 10).map((m, i) => (
          <MovieCard key={m.id} movie={m} rank={i + 1} showRank={true}/>
        ))}
      </div>
    </section>
  );
};

export default TopMovies;