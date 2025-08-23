import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/Home/HomePage";
import LoginForm from "./components/Authorization/LoginForm/LoginForm";
import GenresPage from "./pages/Genres/GenresPage";
import MoviesPage from "./pages/Movie/MoviePage/MoviePage";
import MovieDetailsPage from "./pages/Movie/MovieDetailsPage/MovieDetailsPage";
import AccountPage from "./pages/Account/AccountPage";

import { useLazyFetchMeQuery } from "./features/auth/authApi";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/auth/authSlice";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleLoginClose = () => setIsLoginOpen(false);

  const dispatch = useAppDispatch();
  const [fetchMe] = useLazyFetchMeQuery();

  useEffect(() => {
    fetchMe()
      .unwrap()
      .then((me) => dispatch(setUser(me)))
      .catch(() => {});
  }, [dispatch, fetchMe]);

  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<div>Вход</div>} />
          <Route path="register" element={<div>Регистрация</div>} />
          <Route path="genres" element={<GenresPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>

      {isLoginOpen && (
        <LoginForm
          onLogin={handleLoginClose}
          onSwitchToRegister={handleLoginClose}
        />
      )}
    </>
  );
};

export default App;
