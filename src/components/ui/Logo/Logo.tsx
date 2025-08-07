import s from "./Logo.module.scss";
import LogoIcon from '../../../assets/icons/icon-logo.png';
import LogoIconText from '../../../assets/icons/icon-logo-text.svg';


type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`${s.logo_wrapper} ${className || ''}`}>
      <img src={LogoIcon} className={s.logo__icon} alt="Marusya logo icon" />
      <img src={LogoIconText} className={s.logo__iconText} alt="Marusya logo text" />
    </div>
  );
}