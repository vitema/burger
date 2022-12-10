import React, { useEffect, useRef, createRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { useLocation, Link } from "react-router-dom";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders.module.css";

import { availableTypes, bunType } from "../../constants/constants";


import { IIngredient } from "../../types/ingredients-types";

import {  IFeed, IFeedOrder } from "../../types/feed-types";
import { orderStatus } from "../../constants/constants";
interface FeedOrderstProps {
  feed: IFeed | undefined;
  ingredients: IIngredient[];
  title: string;
  path: string;
  showStatus: boolean;
}

const FeedOrders: FC<FeedOrderstProps> = ({
  feed,
  ingredients,
  title,
  path,
  showStatus,
}) => {
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

    let imgCount = 0;
    // info.images.push({
    //   url: bun.image,
    //   count: "",
    //   id: bun._id,
    //   alt: "",
    // });
    // debugger;
    let bunId = "";
    ids.forEach((id) => {
      const ingredient = ingredients.filter((y) => y._id == id)[0];
      if (info.images.filter((x) => x.id == ingredient._id).length == 0) {
        imgCount++;
        if (imgCount <= 6) {
          info.images.push({
            url: ingredient.image,
            count: imgCount == 6 ? `+${ingredients.length - 6}` : "",
            id: ingredient._id,
            alt: ingredient.name,
          });
        }
      }

      if (ingredient.type == bunType) {
        bunId = ingredient._id;
      }
      info.totalCost +=
        ingredient.type == bunType ? ingredient.price * 2 : ingredient.price;
    });

    // const bun = info.images.filter((item) => item.id == bunId)[0];
    // info.images = info.images.filter((item) => item.id !== bunId);
    // info.images.unshift(bun);

    return (
      <div className="pt-6">
      <div className={styles.row}>
        <div className={styles.leftColumn}>
          <div className={styles.row}>
            {info.images.map((img: IImage) => (
              <div key={img.id} className={styles.row}>
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
              </div>
            ))}
          </div>
        </div>
        <span className="text text_type_digits-default mt-4">
          {info.totalCost}
        </span>
        <span className="mt-4  ml-2">
          <CurrencyIcon type="primary" />
        </span>
      </div>
      </div>
    );
  };

  const location = useLocation();
  return (
    <div className={styles.box}>
      <p className="text text_type_main-large pb-10">{title}</p>

      {data && data.length > 0 && (
        <div className={styles.ingridientsBox}>
          {data.map((item: IFeedOrder) => (
            <Link
              key={item._id}
              to={{
                pathname: `/${path}/${item.number}`,
                 state: { background: location },
              }}
              className={styles.link}
            >
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
                <div className={styles.column}>
                  <p className="text text_type_main-medium pb-1">{item.name}</p>

                  {showStatus && (
                    <div
                      className={item.status == "done" ? styles.doneStatus : ""}
                    >
                      <p className="text text_type_main-default">
                        {orderStatus[item.status]}
                      </p>
                    </div>
                  )}
                </div>

                {getIngredientsInfo(item.ingredients)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default FeedOrders;
