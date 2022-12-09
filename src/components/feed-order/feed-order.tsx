import React, { useEffect, useRef, createRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";

import { availableTypes, bunType } from "../../constants/constants";

import { SET_INGREDIENT } from "../../services/actions/ingredient";

import IngredientsGroup from "../ingredients-group/ingredients-group";
import Ingridient from "../burger-ingredient/burger-ingredient";

import { IIngredient } from "../../types/ingredients-types";

import { IWSAction, IFeed, IFeedOrder } from "../../types/feed-types";

import { orderStatus } from "../../constants/constants";

interface FeedOrdertProps {
  order: IFeedOrder;
  ingredients: IIngredient[];
}

interface IOrderIngredient extends IIngredient {
  count: number;
}

const FeedOrder: FC<FeedOrdertProps> = ({ order, ingredients }) => {
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

    // 👇️ explicitly calling getTime()
    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay
    );
  }

  let orderIngredients: IOrderIngredient[] = [];

  let bunId = "";
  let total = 0;
  order.ingredients.forEach((id) => {
    const ingredient = ingredients.filter((x) => x._id == id)[0];

    if (ingredient) {
      let exists = orderIngredients.filter((x) => x._id == ingredient._id)[0];

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

        orderIngredients.push({
          ...ingredient,
          count: count,
        });

        total += ingredient.price * count;
      }
    }
  });

  const bun = orderIngredients.filter((item) => item._id == bunId)[0];
  orderIngredients = orderIngredients.filter((item) => item._id !== bunId);
  orderIngredients.unshift(bun);

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <p className="text text_type_digits-default pb-10">#{order?.number}</p>
      </div>
      <p className="text text_type_main-medium pb-3">{order?.name}</p>
      <div className={styles.status}>
        <p className="text text_type_main-defailt pb-15">
          {orderStatus[order?.status]}
        </p>
      </div>
      <p className="text text_type_main-medium pb-6">Состав:</p>

      <div className={styles.ingridientsBox}>
        {orderIngredients.map((item) => (
          <div className={styles.row} key={item._id}>
            <div className={styles.imgBox}>
              <img className={styles.img} src={item.image} alt={item.name} />
            </div>
            <div className={styles.name}>
              <div className={styles.nameText}>
                <p className="text text_type_main-defailt pl-6"> {item.name}</p>
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
          <span className="text text_type_digits-default mt-4">{total}</span>
          <span className="mt-4  ml-2 ">
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};
export default FeedOrder;
