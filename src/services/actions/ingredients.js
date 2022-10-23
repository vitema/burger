import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREMENT_COUNT = "INCREMENT_COUNT";
export const DECREMENT_COUNT = "DECREMENT_COUNT";

export function getIngredients() {
  return async function (dispatch) {
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
