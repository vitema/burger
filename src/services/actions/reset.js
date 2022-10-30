import { apiUrl } from "../../constants/constants";
import { request } from "../../utils/request";

export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILED = "RESET_FAILED";
export function reset (postData) {
  return async function (dispatch) {
    dispatch({
      type: RESET_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/password-reset`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: RESET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_FAILED,
        payload: error,
      });
    }
  };
}
