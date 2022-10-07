import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";


const Modal = ({ children, header, onClose, modalRoot }) => {
  let modalRoot1 = document.getElementById("ingridientsBox"); //todo юзать через пропс или ref передать родительский элемент

  const [domReady, setDomReady] = React.useState(false);

  React.useEffect(() => {
    setDomReady(true);
    // modalRoot1=document.getElementById("ingridientsBox");
  });

  return (
    domReady &&
    modalRoot.current &&
    ReactDOM.createPortal(
      <>
      
        <div className={styles.modal}>
          <header onClick={onClose} className={styles.headerBox}>
            <div className={styles.headerText}>
              <p className="text text_type_main-large">{header}</p>
            </div>
            <span className={styles.icon} ><CloseIcon type="primary" /></span>
          </header>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot.current
    )
  );
};

export default Modal;
