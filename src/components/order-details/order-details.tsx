import { FC } from "react";
import styles from "./order-details.module.css";

import status1Img from "./images/status1.png";
import status2Img from "./images/status2.webp";

import { IOrder } from "../../types/order-types";

const getStatusImgPath = (status: number): string => {
  switch (status) {
    case 1:
      return status1Img;
    case 2:
      return status2Img;
    default:
      return "";
  }
};

interface OrderDetailsProps{
  orderData: IOrder;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderData }) => {
  return (
    <div className={styles.box}>
      <p className="text text_type_digits-large mt-10">{orderData.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className={styles.statusImg}
        src={getStatusImgPath(orderData.status.value)}
        alt={orderData.status.text}
      />
      <p className="text text_type_digits-small">{orderData.status.text}</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        {orderData.status.description}
      </p>
    </div>
  );
};

export default OrderDetails;
