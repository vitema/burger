import ReactDOM from "react-dom";
import { FC, PropsWithChildren } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import useKeyDown from "../../hooks/useKeyDown";

const modalRoot = document.getElementById("modal");

interface ModalProps {
  header: string;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  header,
  onClose,
  children,
}) => {
  useKeyDown("Escape", onClose);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <div className={styles.modal}>
          <div onClick={onClose} className={styles.headerBox}>
            <div className={styles.headerText}>
              <p className="text text_type_main-large">{header}</p>
            </div>
            <span className={styles.icon}>
              <CloseIcon type="primary" />
            </span>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    )
  );
};

export default Modal;
