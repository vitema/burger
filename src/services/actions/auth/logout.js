import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export function sendLogout() {
  return async function (dispatch) {
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
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILED,
      });
    }
  };
}
