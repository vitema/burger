import styles from "./order-details.module.css";
import { orderType } from "../../utils/types";
import status1Img from "./images/status1.png";

const getStatusImgPath = (status) => {
  switch (status) {
    case 1:
      return status1Img;
    default:
      return "";
  }
};

const OrderDetails = ({ orderData }) => {
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

OrderDetails.propTypes = {
  orderData: orderType.isRequired,
};

export default OrderDetails;
