import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie, setCookie } from "../../../utils/cookie";
import { refreshToken } from "./refresh";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const USER_UPDATE_REQUEST = "USER_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_SUCCESS";
export const USER_UPDATE_FAILED = "USER_FAILED";

export function getUser() {
  return async function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/auth/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": getCookie("accessToken"),
        },
      });
      dispatch({
        type: USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FAILED,
        payload: error,
      });
    }
  };
}

export function updateUser(postData) {
  return async function (dispatch) {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": getCookie("accessToken"),
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAILED,
        payload: error,
      });
    }
  };
}
