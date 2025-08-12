import s from "./Logo.module.scss";
import LogoIconText from "../../../assets/icons/icon-marusya.svg";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`${s.logo_wrapper} ${className || ""}`}>
      <img
        src={LogoIconText}
        className={s.logo__icon}
        alt="Marusya logo icon"
      />
    </div>
  );
}
