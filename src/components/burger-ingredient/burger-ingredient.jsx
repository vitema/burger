import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

const BurgerIngredient = ({ item, onClick }) => {
  //todo modify after realize add item to constructor
  const [count, setCount] = React.useState(Math.floor(Math.random() * 2));

  return (
    <li className={styles.column} onClick={onClick}>
      <div className={styles.imgBox}>
        <img src={item.image} alt={item.name} />
        {count > 0 && <Counter count={count} size="default" />}
      </div>

      <div className={styles.priceBox}>
        <span className="text text_type_digits-default mt-1 mb-1 pr-2">
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={styles.textBox}>
        <p className="text text_type_main-small">{item.name}</p>
      </div>
    </li>
  );
};

BurgerIngredient.propTypes = {
  item: ingredientType.isRequired,
  onClick : PropTypes.func.isRequired
};

export default BurgerIngredient;
