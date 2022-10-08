import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import { ingredientType } from "../../utils/types";

const IngredientDetails = ({ item, onClick }) => {
  return (
    <div className={styles.box}>
      <img src={item.image_large} alt={item.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name} </p>
      <div className={styles.componentsRow}>
        <div className={styles.componentsColumn}>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
        </div>
        <div className={styles.componentsColumn}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
        </div>
        <div className={styles.componentsColumn}>
          <p className="text text_type_main-small text_color_inactive">Хиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
        </div>
        <div className={styles.componentsColumn}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

// BurgerIngredient.propTypes = {
//   item: ingredientType.isRequired
// };

export default IngredientDetails;