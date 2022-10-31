import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";
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
          Authorization: getCookie("accessToken"),
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
