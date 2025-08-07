import { useEffect } from "react";
import type { ReactNode } from "react";
import s from "./Modal.module.scss";
import CloseIcon from "../../assets/icons/icon-close.svg?react"; 

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEsc);
    } else {
      document.body.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={s.modal} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={s.closeButton} onClick={onClose} type="button">
  <CloseIcon />
</button>
      </div>
    </div>
  );
};

export default Modal;;