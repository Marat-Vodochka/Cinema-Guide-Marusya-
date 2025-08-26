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

  // show auth error
  const [authError, setAuthError] = useState<string | null>(null);

  const openAuthModal = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Auto-close modal as soon as user appears (iOS fixes)
  useEffect(() => {
    if (user && isAuthModalOpen) {
      setIsAuthModalOpen(false);
      setAuthMode("login");
      setAuthError(null);
    }
  }, [user, isAuthModalOpen]);

  const handleLogin = async (_data: LoginData) => {
    void _data;
    setAuthError(null);
    try {
      const profile = await fetchMe();
      setUser(profile);
      closeAuthModal();
    } catch (e) {
      console.error("Login error:", e);
      setAuthError(
        "Couldn’t log in. Please check your credentials or try a different browser."
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
      console.error("Error auto-login after registration:", error);
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
            externalError={authError}
            onClose={closeAuthModal} //close after successful login
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
