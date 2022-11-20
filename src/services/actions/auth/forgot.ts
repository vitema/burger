import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { IRequestAction, IAuthApiResponse } from "../../../utils/types";
import { AppDispatch } from "../../store";

import { getErrorMessage } from "../../../utils/errors";

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
    dispatch<IRequestAction>({
      type: FORGOT_REQUEST,
      payload:""
    });
    try {
      const data = await request<IAuthApiResponse>(`${apiUrl}/password-reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      dispatch<IRequestAction>({
        type: FORGOT_SUCCESS,
        payload: data.message,
      });
      toResetCallBack();
    } catch (error) {
      dispatch<IRequestAction>({
        type: FORGOT_FAILED,
        payload: getErrorMessage(error),
      });
    }
  };
}
