import React, { useState } from "react";
import type { FC } from "react";
import s from "../RegisterForm/RegisterForm.module.scss";
import LogoBlack from "../../../assets/icons/icon-marusya-dark.svg";
import EmailIcon from "../../../assets/icons/icon-email.svg?react";
import UserIcon from "../../../assets/icons/icon-user.svg?react";
import PasswordIcon from "../../../assets/icons/icon-password.svg?react";
import FormField from "../../ui/FormField/FormField";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../services/User";

type RegisterData = {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

export type RegisterDataForAuth = {
  email: string;
  password: string;
  name?: string;
};

type RegisterFormProps = {
  onRegister: (data: RegisterDataForAuth) => void;
  onSwitchToLogin: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({
  onRegister,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    surname: false,
    password: false,
    confirmPassword: false,
  });

  const mutation = useMutation<void, Error, RegisterData>({
    mutationFn: registerUser,
    onSuccess: () => {
      // Автовход после регистрации — передаём объект
      onRegister({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    },
    onError: (error: Error) => {
      alert(error.message || "Registration error");
    },
  });

  const validate = () => {
    const newErrors = {
      email: formData.email.trim() === "",
      name: formData.name.trim() === "",
      surname: formData.surname.trim() === "",
      password: formData.password.trim() === "",
      confirmPassword:
        formData.confirmPassword.trim() === "" ||
        formData.confirmPassword !== formData.password,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (field: keyof RegisterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Отправляем на API всю форму — как и раньше
    mutation.mutate(formData);
  };

  return (
    <form className={s.form} onSubmit={submitHandler}>
      <div className={s.logo_wrapper}>
        <img src={LogoBlack} alt="Marusya logo black" />
      </div>
      <h2 className={s.formTitle}>Register</h2>
      <div className={s.inputContainer}>
        <FormField
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          icon={<EmailIcon />}
        />
        <FormField
          type="text"
          placeholder="First Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          icon={<UserIcon />}
        />
        <FormField
          type="text"
          placeholder="Last Name"
          value={formData.surname}
          onChange={(e) => handleChange("surname", e.target.value)}
          error={errors.surname}
          icon={<UserIcon />}
        />
        <FormField
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          icon={<PasswordIcon />}
        />
        <FormField
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          icon={<PasswordIcon />}
        />
      </div>

      {mutation.isError && (
        <div className={s.errorMessage}>
          {(mutation.error as Error)?.message}
        </div>
      )}

      <button
        type="submit"
        className={s.button}
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? "Creating..." : "Create Account"}
      </button>

      <p onClick={onSwitchToLogin} className={s.registerText}>
        I have an account
      </p>
    </form>
  );
};

export default RegisterForm;
