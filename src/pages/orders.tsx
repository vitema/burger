import { useEffect } from "react";
import Menu from "../components/menu/menu";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import commonStyles from "./page.module.css";
import styles from "./orders.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import { IWSUserAction } from "../types/feed-types";

import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSE,
} from "../services/actions/feed/wsUserActions";

export function OrdersPage() {
  const { feed, message } = useAppSelector((store) => ({
    feed: store.userFeed.feed,
    message: store.feed.message,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch<IWSUserAction>({
      type: WS_USER_CONNECTION_START,
      payload: {
        feed: undefined,
        message: "",
      },
    });

    return () => {
      dispatch<IWSUserAction>({
        type: WS_USER_CONNECTION_CLOSE,
        payload: {
          feed: undefined,
          message: "",
        },
      });
    };
  }, []);

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  return (
    <div className={commonStyles.row}>
      <Menu
        description={
          "В этом разделе вы можете просмотреть свою историю заказов"
        }
      />
      {feed && feed.orders?.length > 0 && (
        <div className={commonStyles.row}>
          <div className={styles.box}>
            <FeedOrders
              feed={feed}
              ingredients={ingredients}
              title={""}
              path={"profile/orders"}
              showStatus={true}
            />
          </div>
        </div>
      )}
      <p className="text text_type_main-medium p-6">{message}</p>
    </div>
  );
}

export default OrdersPage;
