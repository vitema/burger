import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export function register(postData) {
  return async function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payLoad: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };
}
