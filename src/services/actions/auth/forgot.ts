import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";

export const FORGOT_REQUEST = "FORGOT_REQUEST";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const FORGOT_FAILED = "FORGOT_FAILED";

interface IPostData {
  email: string;
}

export function sendForgot(
  postData: IPostData,
  toResetCallBack: { (): void; (): void }
) {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/password-reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      dispatch({
        type: FORGOT_SUCCESS,
        payload: data,
      });
      toResetCallBack();
    } catch (error) {
      dispatch({
        type: FORGOT_FAILED,
        payload: error,
      });
    }
  };
}
