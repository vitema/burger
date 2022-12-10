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
import { IFeedOrder,  IFeed,IWSUserAction,IWSAction } from "../types/feed-types";

import { WS_CONNECTION_START } from "../services/actions/feed/wsActions";
import { WS_USER_CONNECTION_CLOSE } from "../services/actions/feed/wsUserActions";

export function FeedPage() {
  const { feed, message } = useAppSelector((store) => ({
    feed: store.feed.feed,
    message: store.feed.message
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {

    dispatch<IWSUserAction>({ type: WS_USER_CONNECTION_CLOSE, payload: {
      feed: {} as IFeed,
      message:""
    }});

    dispatch<IWSAction>({ type: WS_CONNECTION_START, payload: {
      feed: {} as IFeed,
      message:""
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
            <FeedOrders feed={feed} ingredients={ingredients} title={"Лента заказов"} path={"feed"} showStatus={false} />
            <FeedTotal feed={feed} ingredients={ingredients} />
          </div>
        </div>
      )}
       <p className="text text_type_main-medium p-6">{message}</p>
    </>
  );
}

export default FeedPage;
