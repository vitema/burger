import React, { useEffect, useRef, createRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

import { IIngredient } from "../../types/ingredients-types";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState<string>();

  const { data, ingredientsFailed } = useAppSelector((store) => ({
    data: store.ingredients.items,
    ingredientsFailed: store.ingredients.ingredientsFailed,
  }));

  const refs = useRef<any>(Object.keys(availableTypes).map(() => createRef()));

  const changeTab = (key: string, index: number): void => {
    setCurrent(key);
    refs.current[index].current.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useAppDispatch();

  const selectItem = (item: IIngredient): void => {
    dispatch({ type: SET_INGREDIENT, item });
  };

  useEffect(() => {
    setCurrent(bunType);
  }, []);

  return (
    <div className={styles.box}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key, index) => (
          <Tab
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
                    .filter((x: IIngredient) => x.type === key)
                    .map((item: IIngredient) => (
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
      {ingredientsFailed && (
        <p className="text text_type_main-medium p-6">
          Ошибка при получении ингредиентов
        </p>
      )}
    </div>
  );
};
export default BurgerIngredients;
