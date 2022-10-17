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
import { IngridientsContext } from "../../services/ingriedientsContext";
import { apiUrl, bunType } from "../../constants/constants";

const BurgerConstructor = () => {
  const currentData = useContext(IngridientsContext);

  const getIngredientsData = () => {
    const bun = currentData.filter((x) => x.type == bunType)[0];
    const components = currentData.filter((x) => x.type != bunType);

    return {
      bun: bun,
      components: components,
    };
  };

  const ingredientsData = getIngredientsData();

  const [requestState, setRequestState] = useState({
    loading: true,
    error: "",
  });

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();
  const [orderData, setOrderData] = useState(null);

  const getOrderData = async () => {
    try {
      setRequestState({ ...requestState, loading: true });
      const allData = [...ingredientsData.components, ingredientsData.bun];
      const ids = allData.map((item) => item._id);
      const postData = { ingredients: ids };

      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
      }

      const data = await res.json();

      setRequestState({
        ...requestState,
        loading: false,
        error: "",
      });

      setOrderData({
        order: {
          number: data.order.number + "",
          status: {
            value: 1,
            text: "Ваш заказ начали готовить",
            description: "Дождитесь готовности на орбитальной станции",
          },
        },
      });

      handleOpenModal();
    } catch (error) {
      setRequestState({ ...requestState, error: error });
    }
  };

  const getSum = () => {
    return (
      ingredientsData.components.reduce((sum, item) => sum + item.price, 0) +
      ingredientsData.bun.price * 2
    );
  };

  return (
    <div className={styles.box}>
      {currentData.length > 0 && (
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
            {!orderData ? (
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

      {modalVisible && (
        <Modal header="" onClose={handleCloseModal}>
          <OrderDetails orderData={orderData.order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
