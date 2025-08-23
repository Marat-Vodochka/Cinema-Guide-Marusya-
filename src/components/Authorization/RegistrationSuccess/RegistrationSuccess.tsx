import type { FC } from "react";
import s from "./RegistrationSuccess.module.scss";
import LogoBlack from "../../../assets/icons/icon-logo-black.svg";

type RegistrationSuccessProps = {
  onLoginClick: () => void;
};

const RegistrationSuccess: FC<RegistrationSuccessProps> = ({
  onLoginClick,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.logo_wrapper}>
        <img src={LogoBlack} alt="Marusya logo" />
      </div>
      <h2 className={s.title}>Registration complete</h2>
      <p className={s.text}>Use your email to log in</p>
      <button className={s.button} onClick={onLoginClick}>
        Log in
      </button>
    </div>
  );
};

export default RegistrationSuccess;
