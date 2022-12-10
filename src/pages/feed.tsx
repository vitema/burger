import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";

import commonStyles from "./page.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedTotal from "../components/feed-total/feed-total";
import { IFeed, IWSAction } from "../types/feed-types";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from "../services/actions/feed/wsActions";

export function FeedPage() {
  const { feed, message } = useAppSelector((store) => ({
    feed: store.feed.feed,
    message: store.feed.message,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<IWSAction>({
      type: WS_CONNECTION_START,
      payload: {
        feed: {} as IFeed,
        message: "",
      },
    });

    return () => {
      dispatch<IWSAction>({
        type: WS_CONNECTION_CLOSE,
        payload: {
          feed: {} as IFeed,
          message: "",
        },
      });
    };
  }, []);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  return (
    <>
      {feed?.orders?.length > 0 && (
        <div className={commonStyles.row}>
          <div className={commonStyles.row}>
            <FeedOrders
              feed={feed}
              ingredients={ingredients}
              title={"Лента заказов"}
              path={"feed"}
              showStatus={false}
            />
            <FeedTotal feed={feed} ingredients={ingredients} />
          </div>
        </div>
      )}
      <p className="text text_type_main-medium p-6">{message}</p>
    </>
  );
}

export default FeedPage;
