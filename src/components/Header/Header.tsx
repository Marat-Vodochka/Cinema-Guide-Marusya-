import { useState, useEffect, useRef } from "react";
import s from "./Header.module.scss";
import Logo from "../ui/Logo/Logo";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { getMovieByTitle } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchModal from "../SearchModal/SearchModal";
import { useUser } from "../Authorization/UserContext";

import IconGenres from "../../assets/icons/mobile-icon-genres.svg?react";
import IconSearch from "../../assets/icons/icon-search.svg?react";
import IconProfile from "../../assets/icons/mobile-icon-user.svg?react";

type User = {
  surname: string;
};

type HeaderProps = {
  onLoginClick: () => void;
  user?: User | null;
};

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      getMovieByTitle(query)
        .then((movies) => {
          setResults(movies.slice(0, 5));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className={s.header}>
        <div className={s.container}>
          <Link to="/">
            <Logo />
          </Link>
          {!isMobile && (
            <>
              <div className={s.navBlock}>
                <nav className={s.nav}>
                  <NavLink to="/" className={s.link}>
                    Home
                  </NavLink>
                  <NavLink to="/genres" className={s.link}>
                    Genres
                  </NavLink>
                  <div className={s.searchWrapper}>
                    <input
                      ref={inputRef}
                      className={s.searchInput}
                      type="text"
                      placeholder="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && <div className={s.loading}>Loading...</div>}
                    {results.length > 0 && (
                      <ul className={s.dropdown} ref={dropdownRef}>
                        {results.map((movie) => (
                          <li
                            key={movie.id}
                            className={s.dropdownItem}
                            onClick={() => {
                              handleSearchSelect(movie);
                              setResults([]);
                            }}
                          >
                            <div className={s.itemPoster}>
                              <img src={movie.posterUrl} alt={movie.title} />
                            </div>
                            <div className={s.itemInfo}>
                              <div className={s.itemRow}>
                                <div className={s.ratingWrap}>
                                  <span className={s.ratingStar}>★</span>
                                  <span className={s.ratingValue}>
                                    {movie.tmdbRating
                                      ? Number(movie.tmdbRating).toFixed(1)
                                      : ""}
                                  </span>
                                </div>
                                <span className={s.year}>
                                  {movie.releaseDate?.slice(0, 4)}
                                </span>
                                <span className={s.genre}>
                                  {movie.genres?.join(", ")}
                                </span>
                                <span className={s.runtime}>
                                  {movie.runtime ? `${movie.runtime} min` : ""}
                                </span>
                              </div>
                              <div className={s.title}>{movie.title}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </nav>
              </div>
              {user ? (
                <Link to="/account" className={s.userName}>
                  {user.surname}
                </Link>
              ) : (
                <Button className={s.loginButton} onClick={onLoginClick}>
                  Sign In
                </Button>
              )}
            </>
          )}

          {isMobile && (
            <div className={s.mobileIcons}>
              <NavLink
                to="/genres"
                aria-label="Genres"
                className={s.iconButton}
              >
                <IconGenres />
              </NavLink>
              <button
                aria-label="Search"
                className={s.iconButton}
                onClick={() => setIsSearchModalOpen(true)}
              >
                <IconSearch />
              </button>
              {user ? (
                <NavLink
                  to="/account"
                  aria-label="Profile"
                  className={s.iconButton}
                >
                  <IconProfile />
                </NavLink>
              ) : (
                <button
                  aria-label="Profile"
                  className={s.iconButton}
                  onClick={onLoginClick}
                >
                  <IconProfile />
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelect={handleSearchSelect}
      />
    </>
  );
};

export default Header;
