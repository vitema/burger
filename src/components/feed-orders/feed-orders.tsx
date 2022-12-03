import React, { useEffect, useRef, createRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

import { IIngredient } from "../../types/ingredients-types";

import { WS_CONNECTION_START } from "../../services/actions/feed/wsActions";
import { IFeedAction, IFeed } from "../../types/feed-types";

interface FeedOrderstProps {
  feed: IFeed | undefined;
  ingredients: IIngredient[];
}

const FeedOrders: FC<FeedOrderstProps> = ({ feed, ingredients }) => {
  const [current, setCurrent] = React.useState<string>();

  const data = feed?.orders;

  const dispatch = useAppDispatch();

  const formatDate = (date: string): string => {
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

    // 👇️ explicitly calling getTime()
    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay
    );
  }

  interface IImage {
    url: string;
    count: string;
    id: string;
    alt: string;
  }

  interface IIngredientsInfo {
    images: IImage[];
    totalCost: number;
  }

  const getIngredientsInfo = (ids: string[]) => {
    let info: IIngredientsInfo = {
      images: [],
      totalCost: 0,
    };

    const bun = ingredients.filter((x) => x.type == bunType)[0];
    let imgCount = 1;
    info.images.push({
      url: bun.image,
      count: "",
      id: bun._id,
      alt: "",
    });

    ids.forEach((id) => {
      const ingredient = ingredients.filter((y) => y._id == id)[0];

      if (imgCount <= 6) {
        if (info.images.filter((x) => x.id == ingredient._id).length == 0) {
          imgCount++;
          info.images.push({
            url: ingredient.image,
            count: imgCount == 6 ? `+${ingredients.length - 6}` : "",
            id: ingredient._id,
            alt: ingredient.name,
          });
        }
      }

      info.totalCost +=
        ingredient.type == bunType ? ingredient.price * 2 : ingredient.price;
    });

    return (
      <div className={styles.row}>
        <div className={styles.leftColumn}>
          <div className={styles.row}>
            {info.images.map((img: IImage) => (
              <>
                <div className={styles.imgBox}>
                  <img
                    className={img.count ? styles.imgLast : styles.img}
                    src={img.url}
                    alt={img.alt}
                  />
                </div>
                {img.count ? (
                  <span className={styles.imgCount}>{img.count}</span>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </div>
        <span className="text text_type_digits-default mt-4">
          {info.totalCost}
        </span>
        <span className="mt-4  ml-2">
          {" "}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    );
  };

  useEffect(() => {
    dispatch<IFeedAction>({ type: WS_CONNECTION_START, payload: undefined });
  }, []);

  return (
    <div className={styles.box}>
      <p className="text text_type_main-large pb-10">Лента заказов</p>

      {data && data.length > 0 && (
        <div className={styles.ingridientsBox}>
          {data.map((item: any) => (
            <div className={styles.orderBox}>
              <div className={styles.row}>
                <div className={styles.leftColumn}>
                  <span className="text text_type_digits-default">
                    #{item.number}
                  </span>
                </div>
                <span className="text text_type_main-default text_color_inactive pb-6">
                  {formatDate(item.updatedAt)}
                </span>
              </div>
              <div className={styles.row}>
                <p className="text text_type_main-medium pb-6">{item.name}</p>
              </div>

              {getIngredientsInfo(item.ingredients)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FeedOrders;
