import { useState } from "react";
import LoginForm, { type LoginData } from "./LoginForm/LoginForm";
import RegisterForm, {
  type RegisterDataForAuth,
} from "./RegisterForm/RegisterForm";
import s from "./AuthForm.module.scss";

type AuthFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: LoginData) => void;
  onRegister: (data: RegisterDataForAuth) => void; // ⬅️ объект, не (email, password)
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
            onSwitchToRegister={() => setIsLogin(false)}
            onLogin={onLogin}
          />
        ) : (
          <RegisterForm
            onRegister={onRegister} // ⬅️ тип теперь совпадает
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
