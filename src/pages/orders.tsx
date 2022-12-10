import React, { useEffect, useRef, createRef, FC } from "react";
import { NavLink } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import Menu from "../components/menu/menu";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import commonStyles from "./page.module.css";
import styles from "./orders.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedTotal from "../components/feed-total/feed-total";
import { IFeedOrder,  IFeed } from "../types/feed-types";
import { TWSUserActions } from "../services/actions/feed/wsUserActions";
import { getCookie } from "../utils/cookie";
import { accessTokenName } from "../constants/constants";
import {IWSUserAction,IWSAction } from "../types/feed-types"

import { WS_USER_CONNECTION_START } from "../services/actions/feed/wsUserActions";
import { WS_CONNECTION_CLOSE } from "../services/actions/feed/wsActions";

export function OrdersPage() {
  const { feed, message } = useAppSelector((store) => ({
    feed: store.userFeed,
    message: store.userFeed.message,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch<IWSAction>({ type: WS_CONNECTION_CLOSE, payload: {
      feed: {} as IFeed,
      message:""
    }});
    dispatch<IWSUserAction>({ type: WS_USER_CONNECTION_START, payload: {
      feed: {} as IFeed,
      message:""
    }});
  }, []);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  return (
    <div className={commonStyles.row}>
      <Menu description={"В этом разделе вы можете просмотреть свою историю заказов"} />
      {feed && feed.feed.orders && feed.feed.orders.length>0 && ingredients && ingredients.length>0 && (
        <div className={commonStyles.row}>
          <div className={styles.box}>
            <FeedOrders feed={feed.feed} ingredients={ingredients} title={""} path={"profile/orders"} showStatus={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
