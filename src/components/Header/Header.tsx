import { useState, useEffect } from "react";
import s from "./Header.module.scss";
import Logo from "../ui/Logo/Logo";
import { NavLink } from "react-router-dom";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import Button from "../../components/ui/Button/Button";

import IconGenres from "../../assets/icons/mobile-icon-genres.svg?react";
import IconSearch from "../../assets/icons/icon-search.svg?react";
import IconProfile from "../../assets/icons/mobile-icon-user.svg?react";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />

        {!isMobile && (
          <>
            <nav className={s.nav}>
              <NavLink to="/" className={s.link}>Главная</NavLink>
              <NavLink to="/genres" className={s.link}>Жанры</NavLink>
            </nav>

            <SearchInput />

            <Button className={s.loginButton}>Войти</Button>
          </>
        )}

        {isMobile && (
          <div className={s.mobileIcons}>
            <NavLink to="/genres" aria-label="Жанры" className={s.iconButton}>
              <IconGenres />
            </NavLink>
            <NavLink to="/search" aria-label="Поиск" className={s.iconButton}>
              <IconSearch />
            </NavLink>
            <NavLink to="/profile" aria-label="Профиль" className={s.iconButton}>
              <IconProfile />
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;