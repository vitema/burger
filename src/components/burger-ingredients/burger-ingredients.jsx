import React, { useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { getIngredients } from "../../services/actions/ingredients";
import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState();

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
    </div>
  );
};
export default BurgerIngredients;
