import { apiUrl, accessTokenName } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { USER_SET, TUpdateUserActions } from "./user";
import { AppDispatch, AppThunk } from "../../store";
import {
  IAuthApiResponse,
  IRequestAction,
  IUserAction,
} from "../../../types/auth-types";
import { getErrorMessage } from "../../../utils/errors";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export type TLogoutActions =
  | typeof LOGOUT_REQUEST
  | typeof LOGOUT_SUCCESS
  | typeof LOGOUT_FAILED;

export const sendLogout: AppThunk = (toLoginCallBack: {
  (): void;
  (): void;
}): ((dispatch: AppDispatch) => Promise<void>) => {
  return async function (dispatch: AppDispatch) {
    dispatch<IRequestAction<TLogoutActions>>({
      type: LOGOUT_REQUEST,
      payload: "",
    });
    try {
      const postData = {
        token: getCookie("refreshToken"),
      };
      const data = await request<IAuthApiResponse>(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getCookie(accessTokenName),
        },
        body: JSON.stringify(postData),
      });
      dispatch<IRequestAction<TLogoutActions>>({
        type: LOGOUT_SUCCESS,
        payload: data.message,
      });
      dispatch<IUserAction<TUpdateUserActions>>({
        type: USER_SET,
        payload: {
          user: undefined,
          refreshToken: "",
          accessToken: "",
          message: "",
        },
      });
      toLoginCallBack();
    } catch (error) {
      dispatch<IRequestAction<TLogoutActions>>({
        type: LOGOUT_FAILED,
        payload: getErrorMessage(error),
      });
    }
  };
};
