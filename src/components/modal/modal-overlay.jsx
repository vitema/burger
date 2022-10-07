import styles from "./modal.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
