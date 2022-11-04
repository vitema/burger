import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import useKeyDown from "../../hooks/useKeyDown";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({ children, header, onClose }) => {
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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
