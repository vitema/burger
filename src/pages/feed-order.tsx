import React, { useEffect, useRef, createRef, FC } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";

import Menu from "../components/menu/menu";

import commonStyles from "./page.module.css";
import { IFeedOrder, IFeedAction, IFeed } from "../types/feed-types";
import FeedOrder from "../components/feed-order/feed-order";

import { WS_CONNECTION_START } from "../services/actions/feed/wsActions";

export function FeedOrderPage() {
  type FeedOrderRouteParams = {
    orderId: string;
  };
  const dispatch = useAppDispatch();
  let item: IFeedOrder = {} as IFeedOrder;

  const { feed } = useAppSelector((store) => ({
    feed: store.feed.feed,
  }));
  const { params } = useRouteMatch<FeedOrderRouteParams>();

  useEffect(() => {
    dispatch<IFeedAction>({ type: WS_CONNECTION_START, payload: {} as IFeed });
    
      item = feed.orders.filter((x) => x._id == params["orderId"])[0];
   
  }, []);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  return (
    <div className={commonStyles.row}>
     
        <FeedOrder order={item} ingredients={ingredients}></FeedOrder>
    </div>
  );
}

export default FeedOrderPage;
