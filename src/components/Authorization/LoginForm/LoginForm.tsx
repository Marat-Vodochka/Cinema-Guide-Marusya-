import React, { useState } from "react";
import type { FC } from "react";
import s from "../LoginForm/LoginForm.module.scss";
import LogoBlack from '../../../assets/icons/icon-logo-black.svg';
import EmailIcon from '../../../assets/icons/icon-email.svg?react';
import PasswordIcon from '../../../assets/icons/icon-password.svg?react';
import FormField from "../../ui/FormField/FormField";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/User";
import { useUser } from "../../Authorization/UserContext";
import { fetchMe } from "../../../services/User";

export type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSwitchToRegister: () => void;
  onLogin: (data: LoginData) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSwitchToRegister, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const { setUser } = useUser();

  const loginMutation = useMutation<void, Error, LoginData>({
    mutationFn: login,
    onSuccess: async () => {
      const user = await fetchMe();
      setUser(user);
      onLogin({ email, password });
    },
    onError: (error) => {
      console.error("Ошибка входа:", error.message);
      // Можно добавить UI уведомление об ошибке
    }
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = email.trim() === "";
    const passwordError = password.trim() === "";

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    loginMutation.mutate({ email, password });
  };

  return (
    <form className={s.form} onSubmit={submitHandler}>
      <div className={s.logo_wrapper}>
        <img src={LogoBlack} alt="Marusya logo black" />
      </div>
      <div className={s.inputContainer}>
        <FormField
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<EmailIcon />}
        />
        <FormField
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<PasswordIcon />}
        />
      </div>

      {loginMutation.isError && (
        <div className={s.errorMessage}>
          {loginMutation.error?.message}
        </div>
      )}

      <button
        type="submit"
        className={s.button}
        disabled={loginMutation.status === "pending"}
      >
        {loginMutation.status === "pending" ? "Вход..." : "Войти"}
      </button>

      <p onClick={onSwitchToRegister} className={s.registerText}>
        Регистрация
      </p>
    </form>
  );
};

export default LoginForm;