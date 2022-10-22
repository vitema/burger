import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { bunType } from "../../constants/constants";

import { useDrag } from "react-dnd/dist/hooks";

const BurgerIngredient = ({ item, onClick }) => {
  // drag
  // Получаем реф для каждого элемента, который можно перетащить,
  // opacity - возвращается из функции collect
  const [{ opacity }, dragRef] = useDrag({
    // Указываем тип получаемых элементов, чтобы dnd понимал,
    // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
    // Элементы и контейнеры с разными типами не будут взаимодействовать
    type: item.type == bunType ? "ingredient" : "component",
    // Тут мы положим данные о нашем ингредиенте,
    // которые dnd будет передавать в качестве аргумента во внутренние колбэки
    item: { ...item },
    // Метод collect агрегириует информацию, полученную из мониторов
    // и возвращает ее в объекте, первым аргументом нашего хукка
    collect: (monitor) => ({
      // Зададим прозрачность перетаскиваемому элементу для красоты
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li
      className={styles.column}
      onClick={onClick}
      style={{ opacity }}
      ref={dragRef}
    >
      <div className={styles.imgBox}>
        <img src={item.image} alt={item.name} />
        {item.count > 0 && <Counter count={item.count} size="default" />}
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
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
