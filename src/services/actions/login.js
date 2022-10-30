import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export function login(postData) {
  return async function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error
      });
    }
  };
}
