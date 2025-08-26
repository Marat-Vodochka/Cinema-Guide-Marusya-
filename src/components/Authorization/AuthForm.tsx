import { useState } from "react";
import LoginForm, { type LoginData } from "./LoginForm/LoginForm";
import s from "./AuthForm.module.scss";
import { type RegisterDataForAuth } from "../../features/auth/types";
import RegisterForm from "./RegisterForm/RegisterForm";

type AuthFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: LoginData) => void;
  onRegister: (data: RegisterDataForAuth) => void;
};

const AuthForm = ({ isOpen, onClose, onLogin, onRegister }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          ×
        </button>

        {isLogin ? (
          <LoginForm
            onLogin={onLogin}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onRegister={onRegister}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
