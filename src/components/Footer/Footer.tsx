import React from "react";
import s from "./Footer.module.scss"
import VKIcon from "../../assets/icons/icon-vk.svg";
import YouTubeIcon from "../../assets/icons/icon-youtube.svg";
import OKIcon from "../../assets/icons/icon-ok.svg";
import TelegramIcon from "../../assets/icons//icon-telegram.svg";


type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => (
  <footer className={`${s.footer} ${className}`}>
    <div className={s.footer__socials}>
      <a href="#" target="_blank" rel="noreferrer" className={s.link}>
        <img src={VKIcon} alt="VK"/>
      </a>
      <a href="#" target="_blank" rel="noreferrer" className={s.link}>
        <img src={YouTubeIcon} alt="You Tube"/>
      </a>
      <a href="#" target="_blank" rel="noreferrer" className={s.link}>
        <img src={OKIcon} alt="Odnoklassniki"/>
      </a>
      <a href="#" target="_blank" rel="noreferrer" className={s.link}>
        <img src={TelegramIcon} alt="Telegram"/>
      </a>
    </div>
  </footer>
);

export default Footer;