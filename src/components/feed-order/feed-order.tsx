import { useEffect, FC, useState } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";

import { bunType, orderStatus } from "../../constants/constants";

import { IIngredient } from "../../types/ingredients-types";
import { getFeedOrder } from "../../services/actions/feed/feedOrder";
import { IFeedOrder, IFeedOrderAction } from "../../types/feed-types";

interface IOrderIngredient extends IIngredient {
  count: number;
}

interface IOrderState {
  orderIngredients: IOrderIngredient[];
  total: number;
}

const FeedOrder: FC = () => {
  interface MatchParams {
    orderNumber: string;
  }
  const { params } = useRouteMatch<MatchParams>();
  const orderNumber = Number.parseInt(params["orderNumber"]);

  const formatDate = (date: string | undefined): string => {
    if (!date) {
      return "";
    }

    const today = new Date();
    const dt = new Date(date);
    const dayDiff = getDayDiff(today, dt);
    let weekDay = "";

    if (dayDiff == 0) {
      weekDay = "сегодня";
    } else if (dayDiff == 1) {
      weekDay = "вчера";
    } else if (dayDiff == 11) {
      weekDay = `${dayDiff} дней назад`;
    } else if (dayDiff % 1) {
      weekDay = `${dayDiff} день назад`;
    } else if (dayDiff % 2 || dayDiff % 3 || dayDiff % 4) {
      weekDay = `${dayDiff} дней назад`;
    } else if (
      dayDiff % 0 ||
      dayDiff % 5 ||
      dayDiff % 6 ||
      dayDiff % 7 ||
      dayDiff % 8 ||
      dayDiff % 9
    ) {
      weekDay = `${dayDiff} дней назад`;
    }

    let resDt = dt.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${weekDay}, ${resDt}`;
  };

  function getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay
    );
  }

  const [orderState, setOrderState] = useState<IOrderState>({
    orderIngredients: [],
    total: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getFeedOrder(orderNumber));
  }, []);

  const { order } = useAppSelector((store) => ({
    order: store.feedOrder.order,
  }));

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));

  useEffect(() => {
    fillData();
  }, [order]);

  const fillData = () => {
    let tmporderIngredients: IOrderIngredient[] = [];
    let total = 0;
    let bunId = "";

    order?.ingredients.forEach((id) => {
      const ingredient = ingredients.filter((x) => x._id == id)[0];

      if (ingredient) {
        let exists = tmporderIngredients.filter(
          (x) => x._id == ingredient._id
        )[0];

        if (exists) {
          exists.count++;
          if (ingredient.type == bunType) {
            exists.count++;
            bunId = ingredient._id;
          }
        } else {
          let count = 1;
          if (ingredient.type == bunType) {
            count = 2;
            bunId = ingredient._id;
          }

          tmporderIngredients.push({
            ...ingredient,
            count: count,
          });

          total += ingredient.price * count;
        }
      }
    });

    setOrderState({ orderIngredients: tmporderIngredients, total: total });
  };

  return (
    <>
      {orderState.orderIngredients.length > 0 && (
        <div className={styles.box}>
          <div className={styles.title}>
            <p className="text text_type_digits-default pb-10">
              #{order?.number}
            </p>
          </div>
          <p className="text text_type_main-medium pb-3">{order?.name}</p>
          <div className={styles.status}>
            <p className="text text_type_main-defailt pb-15">
              {orderStatus[(order as IFeedOrder).status]}
            </p>
          </div>
          <p className="text text_type_main-medium pb-6">Состав:</p>

          <div className={styles.ingridientsBox}>
            {orderState.orderIngredients.map((item) => (
              <div className={styles.row} key={item._id}>
                <div className={styles.imgBox}>
                  <img
                    className={styles.img}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className={styles.name}>
                  <div className={styles.nameText}>
                    <p className="text text_type_main-defailt pl-6">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className={styles.price}>
                  <span className="text text_type_digits-default">
                    {item.count} x {item.price}
                  </span>
                  <span className="ml-2 mr-6">
                    <CurrencyIcon type="primary" />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.row}>
            <div className={styles.wideCol}>
              <span className="text text_type_main-default text_color_inactive pb-6">
                {formatDate(order?.updatedAt)}
              </span>
            </div>
            <div>
              <span className="text text_type_digits-default mt-4">
                {orderState.total}
              </span>
              <span className="mt-4  ml-2 ">
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FeedOrder;
