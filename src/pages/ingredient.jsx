import { useCallback, useEffect, useState } from "react";
import {
  useHistory,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";
import { login } from "../services/actions/login";

import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { SET_INGREDIENT } from "../services/actions/ingredient";

import { getIngredients } from "../services/actions/ingredients";

export function IngredientPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, ingredientsFailed } = useSelector((store) => ({
    data: store.ingredients.items,
    ingredientsFailed: store.ingredients.ingredientsFailed,
  }));

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { params } = useRouteMatch();
  

  useEffect(() => {
    const item = data.filter((x) => x._id == params["ingredientId"])[0];
    dispatch({ type: SET_INGREDIENT, item });
  }, [data]);

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <div className={commonStyles.column}>
          <IngredientDetails />
          <p className="text text_type_main-medium p-6">
            {ingredientsFailed ? "Ошибка получения данных" : ""}
          </p>
        </div>
      </div>
    </>
  );
}
