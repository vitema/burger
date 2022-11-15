import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";
import { AppDispatch } from "../store";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREMENT_COUNT = "INCREMENT_COUNT";
export const DECREMENT_COUNT = "DECREMENT_COUNT";
export const CLEAR_COUNTS = "CLEAR_COUNTS";

export function getIngredients() {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/ingredients`);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    }
  };
}
