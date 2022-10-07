import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import { ingredientType } from "../../utils/types";

const IngredientDetails = ({ item, onClick }) => {
  return (
    <div>
      <img src={item.image} alt={item.name} />
      <p>{item.name} </p>
      <p>{item.description} </p>
    </div>
  );
};

// BurgerIngredient.propTypes = {
//   item: ingredientType.isRequired
// };

export default IngredientDetails;
