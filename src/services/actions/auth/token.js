import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILED = "TOKEN_FAILED";

export function sendToken() {
  return async function (dispatch) {
    dispatch({
      type: TOKEN_REQUEST,
    });
    try {
      const postData = {
        token: getCookie("refreshToken")
      };

      const data = await request(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: TOKEN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOKEN_FAILED,
      });
    }
  };
}
