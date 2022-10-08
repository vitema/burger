import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingridient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import IngredientDetails from "../ingridient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = (props) => {
  const availableTypes = {
    bun: "Булки",
    sauce: "Соус",
    main: "Начинки",
  };

  const [current, setCurrent] = React.useState("bun");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, selectItem] = React.useState(null);

  const handleOpenModal = (item) => {
    setModalVisible(true);
    selectItem(item);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.box}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key) => (
          <Tab
            class="mt-5"
            key={key}
            value={key}
            active={current === key}
            onClick={setCurrent}
          >
            {availableTypes[key]}
          </Tab>
        ))}
      </div>

      <div className={styles.ingridientsBox} id="ingridientsBox">
        {Object.keys(availableTypes).map((key, index) => (
          <React.Fragment key={index}>
            <p className="text text_type_main-medium mt-10">
              {availableTypes[key]}
            </p>
            <ul className={styles.row}>
              {props.data
                .filter((x) => x.type == key)
                .map((item) => (
                  <Ingridient
                    key={item._id}
                    item={item}
                    onClick={() => handleOpenModal(item)}
                  />
                ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
      {modalVisible && (
        <Modal header="Детали ингридиента" onClose={handleCloseModal}>
          <IngredientDetails item={selectedItem} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
