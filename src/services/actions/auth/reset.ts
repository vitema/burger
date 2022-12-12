import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch, AppThunk } from "../../store";
import {
  IRequestAction,
  IAuthApiResponse,
  IReset,
} from "../../../types/auth-types";
import { getErrorMessage } from "../../../utils/errors";

export const RESET_REQUEST: "RESET_REQUEST" = "RESET_REQUEST";
export const RESET_SUCCESS: "RESET_SUCCESS" = "RESET_SUCCESS";
export const RESET_FAILED: "RESET_FAILED" = "RESET_FAILED";

export type TResetActions =
  | typeof RESET_REQUEST
  | typeof RESET_SUCCESS
  | typeof RESET_FAILED;

export const sendReset: AppThunk = (
  postData: IReset,
  toLoginCallBack: { (): void; (): void }
): ((dispatch: AppDispatch) => Promise<void>) => {
  return async function (dispatch: AppDispatch) {
    dispatch<IRequestAction<TResetActions>>({
      type: RESET_REQUEST,
      payload: "",
    });
    try {
      const data = await request<IAuthApiResponse>(
        `${apiUrl}/password-reset/reset`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      toLoginCallBack();
      dispatch<IRequestAction<TResetActions>>({
        type: RESET_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch<IRequestAction<TResetActions>>({
        type: RESET_FAILED,
        payload: getErrorMessage(error),
      });
    }
  };
};
