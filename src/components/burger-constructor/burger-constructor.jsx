import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import uuid from "react-uuid";

import { isAuth } from "../../utils/isAuth";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

import {
  bunType,
  dndIngredientsAccept,
  dndComponentsAccept,
} from "../../constants/constants";

import useModal from "../../hooks/useModal";

import { getOrder, CLEAR_ORDER } from "../../services/actions/order";
import {
  ADD_INGREDIENT,
  MOVE_COMPONENT,
  CLEAR_INGREDIENTS,
} from "../../services/actions/constructor";

import {
  DECREMENT_COUNT,
  INCREMENT_COUNT,
  CLEAR_COUNTS,
} from "../../services/actions/ingredients";

import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import BurgerComponent from "../burger-component/burger-component";

const BurgerConstructor = () => {
  const ingredientsData = useSelector((store) => store.constructorIngredients);
  const orderData = useSelector((store) => store.order);

  const isDataValid = () => {
    return ingredientsData && ingredientsData.components && ingredientsData.bun;
  };

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  const dispatch = useDispatch();

  const history = useHistory();
  const getOrderData = () => {
    if (!isAuth()) {
      history.replace({ pathname: "/login" });
      return;
    }

    const allData = [...ingredientsData.components, ingredientsData.bun];
    const ids = allData.map((item) => item._id);
    const postData = { ingredients: ids };
    dispatch(getOrder(postData));
    handleOpenModal();
  };

  const closeOrder = () => {
    handleCloseModal();
    if (!orderData.orderFailed) {
      dispatch({ type: CLEAR_INGREDIENTS });
      dispatch({ type: CLEAR_COUNTS });
      dispatch({ type: CLEAR_ORDER });
    }
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

  // drop
  // Получаем реф, который мы пробросим в наш контейнер
  // чтобы библиотека могла манипулировать его состоянием
  const [{}, dropTargerRef] = useDrop({
    // Такой тип как у перетаскиваемого ингредиента
    accept: dndIngredientsAccept,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    // Тут просто добавляем перемещенный ингредиент в заказ
    // выполняем диспатч в стор, в момент "бросания" ингредиента
    drop(item) {
      if (item.type == bunType && ingredientsData.bun) {
        dispatch({
          type: DECREMENT_COUNT,
          id: ingredientsData.bun._id,
        });
      }

      dispatch({
        type: ADD_INGREDIENT,
        item: {
          ...item,
          // Сделаем небольшой хак и добавим уникальный айдишник
          // чтобы дублирующиеся ингредиенты в бургере не скакали при перетаскивании
          // так как реакт будет менять ингредиенты местами с учетом key
          // и именно в key мы будем пробрасывать наш dragId
          // используем библиотеку uuid
          dragId: uuid(),
        },
      });

      dispatch({
        type: INCREMENT_COUNT,
        id: item._id,
      });
    },
  });

  const [{}, dropComponentRef] = useDrop({
    // Такой тип как у перетаскиваемого ингредиента
    accept: dndComponentsAccept,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    // Тут просто добавляем перемещенный ингредиент в заказ
    // выполняем диспатч в стор, в момент "бросания" ингредиента
    drop(item) {
      if (item.type == bunType && ingredientsData.bun) {
        dispatch({
          type: DECREMENT_COUNT,
          id: ingredientsData.bun._id,
        });
      }

      dispatch({
        type: ADD_INGREDIENT,
        item: {
          ...item,
          // Сделаем небольшой хак и добавим уникальный айдишник
          // чтобы дублирующиеся ингредиенты в бургере не скакали при перетаскивании
          // так как реакт будет менять ингредиенты местами с учетом key
          // и именно в key мы будем пробрасывать наш dragId
          // используем библиотеку uuid
          dragId: uuid(),
        },
      });

      dispatch({
        type: INCREMENT_COUNT,
        id: item._id,
      });
    },
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      // Получаем перетаскиваемый ингредиент
      const dragCard = ingredientsData.components[dragIndex];
      const newCards = [...ingredientsData.components];
      // Удаляем перетаскиваемый элемент из массива
      newCards.splice(dragIndex, 1);
      // Вставляем элемент на место того элемента,
      // над которым мы навели мышку с "перетаскиванием"
      // Тут просто создается новый массив, в котором изменен порядок наших элементов
      newCards.splice(hoverIndex, 0, dragCard);
      // В примере react-dnd используется библиотека immutability-helper
      // Которая позволяет описывать такую имутабельную логику более декларативно
      // Но для лучше понимания обновления массива,

      dispatch({
        type: MOVE_COMPONENT,
        components: newCards,
      });
    },
    [ingredientsData.components, dispatch]
  );

  return (
    <div ref={dropTargerRef} className={styles.box}>
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

          <div className={styles.itemsBox} ref={dropComponentRef}>
            {ingredientsData.components.map((item, index) => (
              <BurgerComponent
                key={item.dragId}
                index={index}
                item={item}
                moveCard={moveCard}
              />
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
            {(!orderData.order || orderData.orderFailed) && (
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={getOrderData}
              >
                Оформить заказ
              </Button>
            )}
          </div>
        </>
      )}
      {modalVisible && orderData.order && (
        <Modal header="" onClose={closeOrder}>
          <OrderDetails orderData={orderData.order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
