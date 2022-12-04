import React, { useEffect, useRef, createRef, FC } from "react";
import { NavLink } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import Menu from "../components/menu/menu";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import commonStyles from "./page.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedTotal from "../components/feed-total/feed-total";
import { IFeedOrder, IFeedAction, IFeed } from "../types/feed-types";
import { getCookie } from "../utils/cookie";
import { accessTokenName } from "../constants/constants";

import { WS_CONNECTION_START } from "../services/actions/feed/wsActions";

export function OrdersPage() {
  const { feed } = useAppSelector((store) => ({
    feed: store.feed.feed,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch<IFeedAction>({ type: WS_CONNECTION_START, payload: {
      feed: {} as IFeed,
      url: `?token=${getCookie(accessTokenName).replace('Bearer ', '')}`
    }});
  }, []);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  return (
    <>
      {feed && feed.orders && feed.orders.length>0 && ingredients && ingredients.length>0 && (
        <div className={commonStyles.row}>
          <div className={commonStyles.row}>
            <FeedOrders feed={feed} ingredients={ingredients} title={"История заказов"} path={"profile/orders"} />
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersPage;
