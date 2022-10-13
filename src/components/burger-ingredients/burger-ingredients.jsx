import React, { useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingridient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { availableTypes, bunType } from "../../constants/constants";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState("bun");
  const [selectedItem, selectItem] = React.useState(null);

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  /*todo remove after realize drag&drop 
 temporary imitation add random items to constructor */
  useEffect(() => {
    const bun = props.data.filter((x) => x.type == bunType)[
      Math.floor(Math.random() * 2)
    ];
    const components = props.data
      .filter((x) => x.type !== bunType)
      .slice(0, Math.floor(Math.random() * 4 + 2));
    props.addIngredients([...components, bun]);
  }, []);

  /*************************************************/

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
                    onClick={() => {
                      handleOpenModal();
                      selectItem(item);
                      props.addIngredient(item);
                    }}
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
  data: PropTypes.arrayOf(ingredientType).isRequired,
  addIngredient: PropTypes.func.isRequired,
  addIngredients: PropTypes.func,
};

export default BurgerIngredients;
