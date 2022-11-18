import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { USER_SET } from "./user";
import { AppDispatch } from "../../store";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export function sendLogout(toLoginCallBack: { (): void; (): void }) {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    try {
      const postData = {
        token: getCookie("refreshToken"),
      };
      const data = await request(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_SET,
        payload: { user: null },
      });
      toLoginCallBack();
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILED,
        payload: error,
      });
    }
  };
}