import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";

import { AppDispatch, AppThunk } from "../../store";

import { getErrorMessage } from "../../../utils/errors";
import {
  IRequestAction,
  IAuthApiResponse,
  IUser,
} from "../../../types/auth-types";

export const FORGOT_REQUEST: "FORGOT_REQUEST" = "FORGOT_REQUEST";
export const FORGOT_SUCCESS: "FORGOT_SUCCESS" = "FORGOT_SUCCESS";
export const FORGOT_FAILED: "FORGOT_FAILED" = "FORGOT_FAILED";

export type TForgotActions =
  | typeof FORGOT_REQUEST
  | typeof FORGOT_SUCCESS
  | typeof FORGOT_FAILED;

export const sendForgot: AppThunk = (
  postData: IUser,
  toResetCallBack: { (): void; (): void }
): ((dispatch: AppDispatch) => Promise<void>) => {
  return async function (dispatch: AppDispatch) {
    dispatch<IRequestAction<TForgotActions>>({
      type: FORGOT_SUCCESS,
      payload: "",
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

      dispatch<IRequestAction<TForgotActions>>({
        type: FORGOT_SUCCESS,
        payload: data.message,
      });
      toResetCallBack();
    } catch (error) {
      dispatch<IRequestAction<TForgotActions>>({
        type: FORGOT_FAILED,
        payload: getErrorMessage(error),
      });
    }
  };
};
