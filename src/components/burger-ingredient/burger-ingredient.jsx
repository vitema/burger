import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientType } from "../../utils/types";

const BurgerIngredient = ({ item, onClick }) => {
  //todo remove after realize drag&drop method
  const testBunId = "60666c42cc7b410027a1a9b1";
  const [count, setCount] = React.useState(item._id === testBunId ? 1 : 0);


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
  item: ingredientType.isRequired
};

export default BurgerIngredient;
