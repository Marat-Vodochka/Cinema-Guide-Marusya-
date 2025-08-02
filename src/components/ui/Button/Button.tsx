import React from "react";
import s from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button className={`${s.button} ${className || ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;