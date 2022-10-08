import React from "react";
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

const BurgerConstructor = (props) => {
  const bun = props.data.filter((x) => x.type == "bun")[0];
  const ingridients = props.data.filter((x) => x.type !== "bun");

  const getSum = () => {
    return (
      ingridients.reduce((sum, item) => sum + item.price, 0) + bun.price * 2
    );
  };

  const getOrderData = () => {
    return {
      number: "034536",
      status: {
        value: 1,
        text: "Ваш заказ начали готовить",
        description: "Дождитесь готовности на орбитальной станции",
      },
    };
  };

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div className={styles.box}>
      <div className="pl-6 pr-6 pb-2">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.itemsBox}>
        {ingridients.map((item) => (
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
          text={`${bun.name}  (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.footerBox}>
        <span className="text text_type_digits-default p-2">{getSum()} </span>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>

      {modalVisible && (
        <Modal header="" onClose={handleCloseModal}>
          <OrderDetails orderData={getOrderData()} />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerConstructor;
