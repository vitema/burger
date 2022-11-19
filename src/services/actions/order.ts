import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";
import { getCookie } from "../../utils/cookie";
import { AppDispatch } from "../store";
import { IOrderAction } from "../../utils/types";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const CLEAR_ORDER = "CLEAR_ORDER";

//todo описать ingredients
export function getOrder(postData: { ingredients: any[] }) {
  return async function (dispatch: AppDispatch) {
    dispatch<IOrderAction>({
      type: GET_ORDER_REQUEST,
      order: null
    });
    try {
      const data = await request(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": getCookie("accessToken"),
        },
        body: JSON.stringify(postData),
      });
      dispatch<IOrderAction>({
        type: GET_ORDER_SUCCESS,
        order: data,
      });
    } catch (error) {
      dispatch<IOrderAction>({
        type: GET_ORDER_FAILED,
        order: null
      });
    }
  };
}
