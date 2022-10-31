import React, { useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  Link
} from "react-router-dom";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { getIngredients } from "../../services/actions/ingredients";
import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";



const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState();
  // const [selectedItem, selectItem] = React.useState(null);
  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  const { data, ingredientsFailed } = useSelector((store) => ({
    data: store.ingredients.items,
    ingredientsFailed: store.ingredients.ingredientsFailed,
  }));

  const refs = useRef(Object.keys(availableTypes).map(() => createRef()));

  const changeTab = (key, index) => {
    setCurrent(key);
    refs.current[index].current.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();

  const selectItem = (item) => {
    dispatch({ type: SET_INGREDIENT, item });
  };

  useEffect(() => {
    dispatch(getIngredients());
    setCurrent(bunType);
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsFailed) {
      handleOpenModal();
    }
  }, [ingredientsFailed]);

  const location = useLocation();

  return (
    <div className={styles.box}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key, index) => (
          <Tab
            class="mt-5"
            key={key}
            value={key}
            active={current === key}
            onClick={(key) => changeTab(key, index)}
          >
            {availableTypes[key]}
          </Tab>
        ))}
      </div>

      {data && data.length > 0 && (
        <div className={styles.ingridientsBox}>
          {Object.keys(availableTypes).map((key, index) => (
            <div key={index} ref={refs.current[index]}>
              <IngredientsGroup groupType={key} setCurrent={setCurrent}>
                <ul className={styles.row}>
                  {data
                    .filter((x) => x.type == key)
                    .map((item) => (
                      
                        <Ingridient
                          key={item._id}
                          item={item}
                          onClick={() => {
                            selectItem(item);
                          }}
                        />
                      
                    ))}
                </ul>
              </IngredientsGroup>
            </div>
          ))}
        </div>
      )}

      {modalVisible && (
        <Modal
          header={ingredientsFailed ? "" : "Детали ингридиента"}
          onClose={handleCloseModal}
        >
          {ingredientsFailed ? (
            <p className="text text_type_main-medium">
              При получении данных произошла ошибка
            </p>
          ) : (
            <IngredientDetails />
          )}
        </Modal>
      )}
    </div>
  );
};
export default BurgerIngredients;
