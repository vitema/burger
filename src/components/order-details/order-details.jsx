import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { ingredientType } from "../../utils/types";
import status1Img from "./images/status1.png";

const getStatusImgPath = (status) => {
  switch (status) {
    case 1:
      return status1Img ;
    default:
      return "";
  }
};

const OrderDetails = ({ orderData }) => {
  return (
    <div className={styles.box}>
      <p className="text text_type_digits-large mt-10">{orderData.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className={styles.statusImg}
        src={getStatusImgPath(orderData.status.value)}
        alt={orderData.status.text}
      />
      <p className="text text_type_digits-small">{orderData.status.text}</p>
      <p className="text text_type_main-default text_color_inactive mt-2">{orderData.status.description}</p>
    </div>
  );
};

// BurgerIngredient.propTypes = {
//   item: ingredientType.isRequired
// };

export default OrderDetails;
