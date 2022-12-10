import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { AppDispatch } from "../../store";
import { IFeedOrderAction, IFeed } from "../../../types/feed-types";

export const GET_FEEDORDER_REQUEST:"GET_FEEDORDER_REQUEST"= "GET_FEEDORDER_REQUEST";
export const GET_FEEDORDER_SUCCESS:"GET_FEEDORDER_SUCCESS" = "GET_FEEDORDER_SUCCESS";
export const GET_FEEDORDER_FAILED:"GET_FEEDORDER_FAILED"= "GET_FEEDORDER_FAILED";
export const CLEAR_FEEDORDER:"CLEAR_FEEDORDER"= "CLEAR_FEEDORDER";

export type TFeedOrderActions =
  | typeof GET_FEEDORDER_REQUEST
  | typeof GET_FEEDORDER_SUCCESS
  | typeof GET_FEEDORDER_FAILED
  | typeof CLEAR_FEEDORDER;

export function getFeedOrder(number: number): (dispatch: AppDispatch) => Promise<void> {
  return async function (dispatch: AppDispatch) {
    dispatch<IFeedOrderAction>({
      type: GET_FEEDORDER_REQUEST,
      order: undefined,
    });
    try {
      debugger;
      const data = await request<IFeed>(`${apiUrl}/orders/${number}`, {
        method: "GET",
      });
      dispatch<IFeedOrderAction>({
        type: GET_FEEDORDER_SUCCESS,
        order: data.orders[0],
      });
    } catch (error) {
      dispatch<IFeedOrderAction>({
        type: GET_FEEDORDER_FAILED,
        order: undefined,
      });
    }
  };
}
