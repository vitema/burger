import React, { useEffect, useRef, createRef, FC, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";

import Menu from "../components/menu/menu";

import commonStyles from "./page.module.css";
import { IFeedOrder, IFeedAction, IFeed } from "../types/feed-types";
import FeedOrder from "../components/feed-order/feed-order";

import { WS_CONNECTION_START } from "../services/actions/feed/wsActions";
import { getCookie } from "../utils/cookie";
import { accessTokenName } from "../constants/constants";

export function OrderPage() {
  type FeedOrderRouteParams = {
    id: string;
  };
  const dispatch = useAppDispatch();

  const { feed, wsConnected } = useAppSelector((store) => ({
    feed: store.feed.feed,
    wsConnected: store.feed.wsConnected,
  }));
  const { params } = useRouteMatch<FeedOrderRouteParams>();

  useEffect(() => {
    if (!wsConnected) {
      dispatch<IFeedAction>({
        type: WS_CONNECTION_START,
        payload: {
          feed: {} as IFeed,
      url: `?token=${getCookie(accessTokenName).replace('Bearer ', '')}`
        }
      });
    }
  }, []);

  const [item, setItem] = useState({} as IFeedOrder);

  useEffect(() => {
    if (feed?.orders) {
      const a=feed.orders.filter((x) => x._id == params["id"])[0]
      setItem(a);
    }
  }, [feed]);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));
  return (
    <>
      {item?.ingredients?.length > 0 ? (
        <div className={commonStyles.row}>
          <FeedOrder order={item} ingredients={ingredients}></FeedOrder>
        </div>
      ) : (
        <div>Падажите</div>
      )}
    </>
  );
}

export default OrderPage;
