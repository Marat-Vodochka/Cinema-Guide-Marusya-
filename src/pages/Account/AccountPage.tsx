import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./AccountPage.module.scss";
import type { Movie } from "../../types/movie";

import IconUser from "../../assets/icons/icon-user.svg?react";
import IconMail from "../../assets/icons/icon-email.svg?react";
import IconFav from "../../assets/icons/icon-fav.svg?react";
import IconClose from "../../assets/icons/icon-close.svg?react";

// ✅ Redux + RTK Query
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
  useLogoutMutation,
} from "../../features/auth/authApi";
import { logoutLocally } from "../../features/auth/authSlice";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // пользователь из Redux
  const user = useAppSelector((s) => s.auth.user);

  // избранное через RTK Query (тип: Movie[])
  const { data: favs = [], isLoading: favLoading } = useGetFavoritesQuery();

  const [removeFav] = useRemoveFavoriteMutation();
  const [doLogout] = useLogoutMutation();

  // локальный стейт для мгновенного удаления карточки
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"favorites" | "settings">(
    "favorites"
  );

  useEffect(() => {
    setFavoriteMovies(favs);
    setLoading(favLoading);
  }, [favs, favLoading]);

  const handleLogout = async () => {
    try {
      await doLogout().unwrap(); // серверная сессия
    } catch {
      // игнорируем — локально всё равно разлогинимся
    } finally {
      dispatch(logoutLocally());
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.status}>Loading...</div>
        </div>
      </div>
    );

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>My Account</h1>

        <div className={s.tabs}>
          <button
            className={activeTab === "favorites" ? s.tabActive : s.tab}
            onClick={() => setActiveTab("favorites")}
          >
            <IconFav className={s.tabIcon} />
            <span className={s.tabText}>Favorite Movies</span>
            <span className={s.tabTextMobile}>Favorites</span>
          </button>
          <button
            className={activeTab === "settings" ? s.tabActive : s.tab}
            onClick={() => setActiveTab("settings")}
          >
            <IconUser className={s.tabIcon} />
            <span className={s.tabText}>Account Settings</span>
            <span className={s.tabTextMobile}>Settings</span>
          </button>
        </div>

        {activeTab === "settings" && (
          <div className={s.userInfo}>
            <div className={s.infoRow}>
              <div className={s.avatar}>
                {(user?.name ?? user?.email ?? "U").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className={s.label}>Full Name</div>
                <div className={s.value}>
                  {(user?.name || "") +
                    (user?.surname ? ` ${user?.surname}` : "")}
                </div>
              </div>
            </div>
            <div className={s.infoRow}>
              <div className={s.avatar}>
                <IconMail className={s.icon} />
              </div>
              <div>
                <div className={s.label}>Email Address</div>
                <div className={s.value}>{user?.email}</div>
              </div>
            </div>
            <button className={s.logoutBtn} onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className={s.favoritesContainer}>
            <div className={s.favoritesGrid}>
              {favoriteMovies.map((movie) => (
                <div className={s.card} key={movie.id}>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className={s.cardImage}
                  />
                  <button
                    className={s.removeBtn}
                    onClick={async () => {
                      try {
                        await removeFav(String(movie.id)).unwrap();
                        setFavoriteMovies((prev) =>
                          prev.filter((m) => m.id !== movie.id)
                        );
                      } catch {
                        // можно показать уведомление об ошибке
                      }
                    }}
                    aria-label="Remove from favorites"
                  >
                    <IconClose className={s.removeIcon} />
                  </button>
                </div>
              ))}
              {favoriteMovies.length === 0 && (
                <div className={s.status}>No favorites yet</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
