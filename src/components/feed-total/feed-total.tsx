import React, { useEffect, useRef, createRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-total.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

import { IIngredient } from "../../types/ingredients-types";

import { WS_CONNECTION_START } from "../../services/actions/feed/wsActions";
import {  IFeedOrder, IFeed } from "../../types/feed-types";
import { IOrder } from "../../types/order-types";

interface FeedTotaltProps {
  feed: IFeed;
  ingredients: IIngredient[];
}

const FeedTotal: FC<FeedTotaltProps> = ({ feed, ingredients }) => {

  /**created, pending, done, cancelled */

  const chunkSize = 10;
  const chunks = function (array: IFeedOrder[] | undefined, size: number) {
    var results: IFeedOrder[][] = [];
    if (!array) {
      return results;
    }

    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  };

  const doneOrders = chunks(
    feed.orders.filter((x) => x.status == "done").slice(0, 30),
    chunkSize
  );
  const pendingOrders = chunks(
    feed.orders.filter((x) => x.status == "pending").slice(0, 30),
    chunkSize
  );

  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <div>
          <p className="text text_type_main-medium pb-6">Готовы:</p>

          <div className={styles.leftCol}>
            {doneOrders.map((chunk, index) => (
              <div key={index}>
                {chunk.map((order) => (
                  <p  key={order._id} className="text text_type_digits-default pr-2">
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.rightCol}>
            {pendingOrders.map((chunk, index) => (
              <div key={index}>
                {chunk.map((order) => (
                  <p  key={order._id}  className="text text_type_digits-default pr-2">
                    {order.number}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium pt-15">
        Выполнено за все время:
      </p>
      <p className="text text_type_digits-large pr-2">{feed?.total}</p>

      <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large pr-2">{feed?.totalToday}</p>
    </div>
  );
};

export default FeedTotal;
