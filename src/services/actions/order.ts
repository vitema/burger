import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";
import { getCookie } from "../../utils/cookie";
import { AppDispatch } from "../store";
import { IOrderAction, IOrderApiResponse } from "../../types/order-types";

export const GET_ORDER_REQUEST= "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED= "GET_ORDER_FAILED";
export const CLEAR_ORDER= "CLEAR_ORDER";

export type TOrderActions =
  | typeof GET_ORDER_REQUEST
  | typeof GET_ORDER_SUCCESS
  | typeof GET_ORDER_FAILED
  | typeof CLEAR_ORDER;

export function getOrder(postData: {
  ingredients: string[];
}): (dispatch: AppDispatch) => Promise<void> {
  return async function (dispatch: AppDispatch) {
    dispatch<IOrderAction>({
      type: GET_ORDER_REQUEST,
      order: undefined,
    });
    try {
      const data = await request<IOrderApiResponse>(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(postData),
      });
      dispatch<IOrderAction>({
        type: GET_ORDER_SUCCESS,
        order: data.order,
      });
    } catch (error) {
      dispatch<IOrderAction>({
        type: GET_ORDER_FAILED,
        order: undefined,
      });
    }
  };
}
