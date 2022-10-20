import { useContext, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { apiUrl, bunType } from "../../constants/constants";
import { request } from "../../utils/request";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../services/actions/order";

const BurgerConstructor = () => {

  //todo отработать стейты получения ордера - лоадинг ошибки
  const ingredientsData = useSelector((store) => store.constructorIngredients);
  const orderData = useSelector((store) => store.order);

  console.log(orderData);

  const isDataValid = () => {
    return ingredientsData && ingredientsData.components && ingredientsData.bun;
  };

  const [requestState, setRequestState] = useState({
    loading: true,
    error: "",
  });

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  const dispatch = useDispatch();

  const getOrderData = async () => {
   
    const allData = [...ingredientsData.components, ingredientsData.bun];
    const ids = allData.map((item) => item._id);
    const postData = { ingredients: ids };
    dispatch(getOrder(postData));
    handleOpenModal();
  };

  const getSum = () => {
    if (!isDataValid()) {
      return 0;
    }

    return (
      ingredientsData.components.reduce((sum, item) => sum + item.price, 0) +
      ingredientsData.bun.price * 2
    );
  };

  return (
    <div className={styles.box}>
      {isDataValid() && (
        <>
          <div className="pl-6 pr-6 pb-2">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${ingredientsData.bun.name} (верх)`}
              price={ingredientsData.bun.price}
              thumbnail={ingredientsData.bun.image}
            />
          </div>
          <div className={styles.itemsBox}>
            {ingredientsData.components.map((item) => (
              <div className={styles.ingridientItem} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
          </div>
          <div className="pl-6 pr-6">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${ingredientsData.bun.name}  (низ)`}
              price={ingredientsData.bun.price}
              thumbnail={ingredientsData.bun.image}
            />
          </div>

          <div className={styles.footerBox}>
            <span className="text text_type_digits-default p-2">
              {getSum()}
            </span>
            <span className="pr-8">
              <CurrencyIcon type="primary" />
            </span>
            {!orderData.order ? (
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={getOrderData}
              >
                Оформить заказ
              </Button>
            ) : (
              <p className="text text_type_main-small">
                Номер заказа : {orderData.order.number}
              </p>
            )}
          </div>
        </>
      )}
      {requestState.error && <p>При оформление заказа произошла ошибка.</p>}

      {modalVisible && orderData.order && (
        <Modal header="" onClose={handleCloseModal}>
          <OrderDetails orderData={orderData.order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
