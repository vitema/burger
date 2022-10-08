import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
