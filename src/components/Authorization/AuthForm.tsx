import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: LoginData) => void;    // объект с email и password
  onRegister: (data: RegisterData) => void;  // объект с name, email, password
};

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const switchToLogin = () => setAuthMode("login");
  const switchToRegister = () => setAuthMode("register");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {authMode === "login" && (
        <LoginForm onLogin={onLogin} onSwitchToRegister={switchToRegister} />
      )}
      {authMode === "register" && (
  <RegisterForm
    onRegister={(name, email, password) =>
      onRegister({ name, email, password })
    }
    onSwitchToLogin={switchToLogin}
  />
)}
    </Modal>
  );
};

export default AuthModal;