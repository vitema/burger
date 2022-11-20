import React from "react";

const useModal = (): {
  modalVisible: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
} => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return { modalVisible, handleOpenModal, handleCloseModal };
};

export default useModal;
