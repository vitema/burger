import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";
import { AppDispatch } from "../store";

import {
  IIngredientsAction,
  IIngredientsApiResponse,
} from "../../types/ingredients-types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export const INCREMENT_COUNT: "INCREMENT_COUNT" = "INCREMENT_COUNT";
export const DECREMENT_COUNT: "DECREMENT_COUNT" = "DECREMENT_COUNT";
export const CLEAR_COUNTS: "CLEAR_COUNTS" = "CLEAR_COUNTS";

export type TIngredientsActions =
  | typeof GET_INGREDIENTS_REQUEST
  | typeof GET_INGREDIENTS_SUCCESS
  | typeof GET_INGREDIENTS_FAILED
  | typeof INCREMENT_COUNT
  | typeof DECREMENT_COUNT
  | typeof CLEAR_COUNTS;

export function getIngredients() {
  return async function (dispatch: AppDispatch) {
    dispatch<IIngredientsAction>({
      type: GET_INGREDIENTS_REQUEST,
      ingredients: [],
      id: "",
    });
    try {
      const data = await request<IIngredientsApiResponse>(
        `${apiUrl}/ingredients`,
        undefined
      );
      dispatch<IIngredientsAction>({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
        id: "",
      });
    } catch (error) {
      dispatch<IIngredientsAction>({
        type: GET_INGREDIENTS_FAILED,
        ingredients: [],
        id: "",
      });
    }
  };
}
