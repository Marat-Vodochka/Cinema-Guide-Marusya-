import { useState } from "react";
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

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogin = async (data?: LoginData) => {
    if (!data) return;
    try {
      await login(data);
      const profile = await fetchMe();
      setUser(profile);
      closeAuthModal();
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleRegister = async ({ email, password }: RegisterDataForAuth) => {
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
            }}
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
          <RegistrationSuccess onLoginClick={() => setAuthMode("login")} />
        )}
      </Modal>
    </div>
  );
};

export default BaseLayout;
