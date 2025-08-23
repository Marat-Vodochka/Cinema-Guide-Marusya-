import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Authorization/LoginForm/LoginForm";
import RegisterForm from "../components/Authorization/RegisterForm/RegisterForm";
import RegistrationSuccess from "../components/Authorization/RegistrationSuccess/RegistrationSuccess";
import s from "./BaseLayout.module.scss";
import { login, fetchMe } from "../services/User";
import type { LoginData } from "../components/Authorization/LoginForm/LoginForm";
import type { User } from "../services/User";

type RegisterDataForAuth = {
  email: string;
  password: string;
  name?: string;
};

const BaseLayout = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "success">(
    "login"
  );
  const [user, setUser] = useState<User | null>(null);

  // показываем явную ошибку авторизации в модалке
  const [authError, setAuthError] = useState<string | null>(null);

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  // ⤵️ Авто-закрытие модалки как только пользователь появился (фиксы для iOS)
  useEffect(() => {
    if (user && isAuthModalOpen) {
      setIsAuthModalOpen(false);
      setAuthMode("login");
      setAuthError(null);
    }
  }, [user, isAuthModalOpen]);

  // возвращаем void в пропсы (оборачиваем при передаче), принимаем LoginData
  const handleLogin = async (_data: LoginData) => {
    void _data; // намеренно не используем
    setAuthError(null);
    try {
      const profile = await fetchMe();
      setUser(profile);
      closeAuthModal(); // обычное закрытие (дополнено авто-закрытием через useEffect)
    } catch (e) {
      console.error("Login error:", e);
      setAuthError(
        "Не удалось войти. Проверь данные или попробуй другой браузер."
      );
    }
  };

  const handleRegister = async ({ email, password }: RegisterDataForAuth) => {
    setAuthError(null);
    try {
      await login({ email, password });
      const profile = await fetchMe();
      setUser(profile);
      setAuthMode("success");
    } catch (error) {
      console.error("Ошибка автологина после регистрации:", error);
      setAuthMode("success");
    }
  };

  return (
    <div className={s.wrapper}>
      <Header onLoginClick={() => openAuthModal("login")} user={user} />
      <main>
        <Outlet />
      </main>
      <Footer className={s["app-wrapper"]} />
      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        {authMode === "login" && (
          <LoginForm
            onLogin={(data) => {
              void handleLogin(data);
            }} // обёртка -> возвращаем void
            onSwitchToRegister={() => setAuthMode("register")}
            externalError={authError}
            onClose={closeAuthModal} // ⤵️ закрываем сразу из формы после успеха
          />
        )}
        {authMode === "register" && (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
        {authMode === "success" && (
          <RegistrationSuccess onLoginClick={() => setAuthMode("login")} />
        )}
      </Modal>
    </div>
  );
};

export default BaseLayout;
