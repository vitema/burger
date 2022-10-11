import { useContext, useState, useEffect } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

import useModal from "../../hooks/useModal";

import { IngridientsContext } from "../services/ingridientsContext";

import { apiUrl } from "../constants/constants";

const BurgerConstructor = () => {
  const data = useContext(IngridientsContext);

  const [state, setState] = useState({
    order: {
      number: null,
      status: {
        value: 1,
        text: "Ваш заказ начали готовить",
        description: "Дождитесь готовности на орбитальной станции",
      },
    },
    loading: true,
    error: "",
  });

  const [currentData, setCurentData] = useState(null);

  useEffect(() => {
    /*temporary imitation different items */
    const bunType = "bun";
    const bun = data.filter((x) => x.type == bunType)[
      Math.floor(Math.random() * 2)
    ];
    const components = data
      .filter((x) => x.type !== bunType)
      .slice(0, Math.floor(Math.random() * 4 + 1));

    /*************************************************/
    setCurentData({ bun: bun, components: components });
    debugger;
  }, []);

  const getOrderData = async () => {
    try {
      setState({ ...state, loading: true });
      const allData = [currentData.bun, currentData.components];
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

      setState({
        ...state,
        loading: false,
        error: "",
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
      setState({ ...state, error: error });
    }
  };

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  const getSum = () => {
    return (
      currentData.components.reduce((sum, item) => sum + item.price, 0) +
      currentData.bun.price * 2
    );
  };

  return (
    <div className={styles.box}>
      {currentData && (
        <>
          <div className="pl-6 pr-6 pb-2">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${currentData.bun.name} (верх)`}
              price={currentData.bun.price}
              thumbnail={currentData.bun.image}
            />
          </div>
          <div className={styles.itemsBox}>
            {currentData.components.map((item) => (
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
              text={`${currentData.bun.name}  (низ)`}
              price={currentData.bun.price}
              thumbnail={currentData.bun.image}
            />
          </div>

          <div className={styles.footerBox}>
            <span className="text text_type_digits-default p-2">
              {getSum()}{" "}
            </span>
            <span className="pr-8">
              <CurrencyIcon type="primary" />
            </span>
            <Button
              type= "primary"
              size="large"
              htmlType="button"
              //onClick={getOrderData}
              onClick={getOrderData}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
      {state.error && <p>При оформление заказа произошла ошибка.</p>}

      {modalVisible && (
        <Modal header="" onClose={handleCloseModal}>
          <OrderDetails orderData={state.order} />
        </Modal>
      )}
    </div>
  );
};

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientType).isRequired,
// };

export default BurgerConstructor;
