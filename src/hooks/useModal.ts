import React from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return {modalVisible, handleOpenModal, handleCloseModal}
}

export default useModal;
