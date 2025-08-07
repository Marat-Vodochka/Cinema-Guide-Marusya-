// src/components/ui/FormField/FormField.tsx
import type { InputHTMLAttributes, ReactNode } from "react";
import s from "./FormField.module.scss";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  error?: boolean;
};

const FormField: React.FC<FormFieldProps>= ({ icon, error, ...inputProps }) => {
  return (
    <div className={`${s.inputWrapper} ${error ? s.inputWrapperError : ""}`}>
      <span className={s.icon}>{icon}</span>
      <input {...inputProps} className={s.input} />
    </div>
  );
};

export default FormField;