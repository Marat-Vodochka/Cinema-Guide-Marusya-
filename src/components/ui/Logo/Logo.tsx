import s from "./Logo.module.scss";
import LogoIcon from '../../../assets/icons/icon-logo.png';
import LogoIconText from '../../../assets/icons/icon-logo-text.svg';

export default function Logo() {
  return (
    <div className={s.logo_wrapper}>
      <img src={LogoIcon} className={s.logo__icon} alt="Marusya logo icon" />
      <img src={LogoIconText} className={s.logo__iconText} alt="Marusya logo text" />
    </div>
  );
}