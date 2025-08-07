import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Authorization/LoginForm/LoginForm";
import RegisterForm from "../components/Authorization/RegisterForm/RegisterForm";
import RegistrationSuccess from "../components/Authorization/RegistrationSuccess/RegistrationSuccess";
import s from "./BaseLayout.module.scss";
import { login, fetchMe } from '../services/User';
import type { LoginData } from "../components/Authorization/LoginForm/LoginForm";
import type { User } from '../services/User'; 

const BaseLayout = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "success">("login");
  const [user, setUser] = useState<User | null>(null);

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogin = async (data: LoginData) => {
    try {
      await login(data);
      const profile = await fetchMe();
      setUser(profile);
      closeAuthModal();
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      // После успешной регистрации сразу логинимся
      await login({ email, password });
      
      // Получаем профиль пользователя
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
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode("register")}
          />
        )}
        {authMode === "register" && (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
        {authMode === "success" && (
          <RegistrationSuccess
            onLoginClick={() => setAuthMode("login")}
          />
        )}
      </Modal>
    </div>
  );
};

export default BaseLayout;