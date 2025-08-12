import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./AccountPage.module.scss";
import api from "../../services/api";
import type { Movie } from "../../types/movie";
import { useUser } from "../../components/Authorization/UserContext";
import IconUser from "../../assets/icons/icon-user.svg?react";
import IconMail from "../../assets/icons/icon-email.svg?react";
import IconFav from "../../assets/icons/icon-fav.svg?react";
import IconClose from "../../assets/icons/icon-close.svg?react";
import { removeFromFavorites } from "../../services/movieService";
import { logout } from "../../services/User";

const AccountPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"favorites" | "settings">(
    "favorites"
  );

  useEffect(() => {
    api
      .get("/favorites")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFavoriteMovies(res.data);
        } else {
          setFavoriteMovies([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
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
                {user?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <div>
                <div className={s.label}>Full Name</div>
                <div className={s.value}>
                  {user?.name} {user?.surname}
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
                    onClick={() => {
                      removeFromFavorites(movie.id).then(() => {
                        setFavoriteMovies(
                          favoriteMovies.filter((m) => m.id !== movie.id)
                        );
                      });
                    }}
                    aria-label="Remove from favorites"
                  >
                    <IconClose className={s.removeIcon} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
