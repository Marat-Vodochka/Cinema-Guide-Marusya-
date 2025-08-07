import type { FC } from "react";
import s from "./RegistrationSuccess.module.scss";
import LogoBlack from "../../../assets/icons/icon-logo-black.svg";

type RegistrationSuccessProps = {
  onLoginClick: () => void;
};

const RegistrationSuccess: FC<RegistrationSuccessProps> = ({ onLoginClick }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.logo_wrapper}>
        <img src={LogoBlack} alt="Marusya logo" />
      </div>
      <h2 className={s.title}>Регистрация завершена</h2>
      <p className={s.text}>Используйте вашу электронную почту для входа</p>
      <button className={s.button} onClick={onLoginClick}>
        Войти
      </button>
    </div>
  );
};

export default RegistrationSuccess;