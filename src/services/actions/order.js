import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";
import { getCookie } from "../../utils/cookie";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function getOrder(postData) {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
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
      dispatch({
        type: GET_ORDER_SUCCESS,
        order: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_FAILED,
      });
    }
  };
}
