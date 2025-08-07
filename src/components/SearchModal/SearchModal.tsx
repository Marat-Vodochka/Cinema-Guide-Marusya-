import { useState, useEffect, useRef } from "react";
import s from "./SearchModal.module.scss";
import { getMovieByTitle } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import IconSearch from "../../assets/icons/icon-search.svg?react";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (movie: Movie) => void;
};

const SearchModal = ({ isOpen, onClose, onSelect }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setLoading(true);
      try {
        const movies = await getMovieByTitle(value);
        setResults(movies.slice(0, 10)); // Показываем больше результатов на мобильном
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    onSelect(movie);
    onClose();
    setQuery("");
    setResults([]);
  };

  const handleClose = () => {
    onClose();
    setQuery("");
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.searchHeader}>
          <IconSearch className={s.searchIcon} />
          <input
            ref={inputRef}
            className={s.searchInput}
            type="text"
            placeholder="Поиск"
            value={query}
            onChange={handleChange}
          />
          <button className={s.closeButton} onClick={handleClose}>
            ✕
          </button>
        </div>

        {loading && (
          <div className={s.loading}>Поиск...</div>
        )}

        {!loading && query.length > 2 && results.length === 0 && (
          <div className={s.noResults}>Ничего не найдено</div>
        )}

        {!loading && query.length <= 2 && (
          <div className={s.emptyState}>Введите название фильма</div>
        )}

        {results.length > 0 && (
          <div className={s.results}>
            {results.map(movie => (
              <div 
                key={movie.id} 
                className={s.resultItem}
                onClick={() => handleSelect(movie)}
              >
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className={s.poster}
                />
                <div className={s.info}>
                  <div className={s.topRow}>
                    <span className={s.rating}>
                      ★ {movie.tmdbRating ? Number(movie.tmdbRating).toFixed(1) : "N/A"}
                    </span>
                    <span className={s.year}>{movie.releaseDate?.slice(0, 4)}</span>
                    <span className={s.genre}>{movie.genres?.join(", ")}</span>
                    <span className={s.duration}>
                      {movie.runtime ? `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин` : ""}
                    </span>
                  </div>
                  <div className={s.title}>{movie.title}</div>
                  <div className={s.description}>{movie.plot}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;