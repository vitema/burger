import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { useHistory } from "react-router-dom";
import { RootState, AppDispatch } from "../../services/store";

import uuid from "react-uuid";
import { isAuth } from "../../utils/cookie";

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

import {
  IIngredientsAction,
  IConstructorAction,
  IIngredient,
  IConstructorState,
} from "../../types/ingredients-types";
import { IOrderAction } from "../../types/order-types";

const BurgerConstructor = () => {
  const ingredientsData = useSelector(
    (store: RootState) => store.constructorIngredients as IConstructorState
  );
  const orderData = useSelector((store: RootState) => store.order);

  const isDataValid = (): boolean => {
    return (
      (ingredientsData && ingredientsData.components && ingredientsData.bun) !=
      undefined
    );
  };

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const getOrderData = (): void => {
    if (!isAuth()) {
      history.replace({ pathname: "/login" });
      return;
    }

    if (ingredientsData.bun) {
      const allData = [...ingredientsData.components, ingredientsData.bun];
      const ids = allData.map((item) => item._id);
      const postData = { ingredients: ids };
      dispatch<any>(getOrder(postData));
      handleOpenModal();
    }
  };

  const closeOrder = (): void => {
    handleCloseModal();
    if (!orderData.orderFailed) {
      dispatch<IIngredientsAction>({
        type: CLEAR_INGREDIENTS,
        ingredients: [],
        id: "",
      });
      dispatch<IIngredientsAction>({
        type: CLEAR_COUNTS,
        ingredients: [],
        id: "",
      });
      dispatch<IOrderAction>({ type: CLEAR_ORDER, order: undefined });
    }
  };

  const getSum = (): number => {
    if (!isDataValid()) {
      return 0;
    }

    return (
      ingredientsData.components.reduce(
        (sum: number, item: IIngredient) => sum + item.price,
        0
      ) + (ingredientsData.bun ? ingredientsData.bun.price * 2 : 0)
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
    drop(item: any) {
      if (item.type === bunType && ingredientsData.bun) {
        dispatch<IIngredientsAction>({
          type: DECREMENT_COUNT,
          id: ingredientsData.bun._id,
          ingredients: [],
        });
      }

      dispatch<IConstructorAction>({
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
        components: [],
        id: "",
      });

      dispatch<IIngredientsAction>({
        type: INCREMENT_COUNT,
        id: item._id,
        ingredients: [],
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
    drop(item: any) {
      if (item.type === bunType && ingredientsData.bun) {
        dispatch<IIngredientsAction>({
          type: DECREMENT_COUNT,
          id: ingredientsData.bun._id,
          ingredients: [],
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

      dispatch<IIngredientsAction>({
        type: INCREMENT_COUNT,
        id: item._id,
        ingredients: [],
      });
    },
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
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

      dispatch<IConstructorAction>({
        type: MOVE_COMPONENT,
        components: newCards,
        item: undefined,
        id: "",
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
              text={`${ingredientsData.bun?.name} (верх)`}
              price={ingredientsData.bun ? ingredientsData.bun.price : 0}
              thumbnail={ingredientsData.bun ? ingredientsData.bun.image : ""}
            />
          </div>

          <div className={styles.itemsBox} ref={dropComponentRef}>
            {ingredientsData.components.map(
              (item: IIngredient, index: number) => (
                <BurgerComponent
                  key={item.dragId}
                  index={index}
                  item={item}
                  moveCard={moveCard}
                />
              )
            )}
          </div>
          <div className="pl-6 pr-6">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${ingredientsData.bun?.name}  (низ)`}
              price={ingredientsData.bun ? ingredientsData.bun.price : 0}
              thumbnail={ingredientsData.bun ? ingredientsData.bun.image : ""}
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

      {orderData.orderRequest && (
        <Modal header="Подождите..." onClose={() => {}}>
          <div className={styles.ldsripple}>
            <div></div>
            <div></div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
