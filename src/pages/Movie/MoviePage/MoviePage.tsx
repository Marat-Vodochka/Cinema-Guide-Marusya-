import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../../../components/MovieCard/MovieCard";
import s from "./MoviePage.module.scss";

const MoviesPage = () => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (genre) {
      const limit = isMobile ? 5 : 10; // 5 на мобильных, 10 на десктопе
      fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&limit=${limit}&page=${page}&sort=rating`)
        .then(res => res.json())
        .then(data => {
          if (data.length < limit) setHasMore(false);
          setMovies(prev => page === 1 ? data : [...prev, ...data]);
        });
    }
  }, [genre, page, isMobile]);

  const handleShowMore = () => setPage(prev => prev + 1);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.headerRow}>
          <button className={s.backBtn} onClick={() => navigate(-1)} aria-label="Назад">
            &lt;
          </button>
          <h1 className={s.title}>{genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : ''}</h1>
        </div>
        <div className={s.cards}>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              fullWidth={true}
            />
          ))}
        </div>
        {hasMore && (
          <button className={s.showMoreBtn} onClick={handleShowMore}>
            Показать ещё
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;