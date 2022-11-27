import { apiUrl, accessTokenName } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { AppDispatch } from "../../store";
import { IUser, IUserAction, IUserPayLoad } from "../../../types/auth-types";

import { getErrorMessage } from "../../../utils/errors";

export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_FAILED: "USER_FAILED" = "USER_FAILED";

export type TGetUserActions =
  | typeof USER_REQUEST
  | typeof USER_SUCCESS
  | typeof USER_FAILED;

export const USER_UPDATE_REQUEST: "USER_UPDATE_REQUEST" = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS: "USER_UPDATE_SUCCESS" = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILED: "USER_UPDATE_FAILED" = "USER_UPDATE_FAILED";
export const USER_SET: "USER_SET" = "USER_SET";
export type TUpdateUserActions =
  | typeof USER_UPDATE_REQUEST
  | typeof USER_UPDATE_SUCCESS
  | typeof USER_UPDATE_FAILED
  | typeof USER_SET;

export function getUser() {
  return async function (dispatch: AppDispatch) {
    dispatch<IUserAction<TGetUserActions>>({
      type: USER_REQUEST,
      payload: {
        message: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    try {
      const data = await request<IUserPayLoad>(`${apiUrl}/auth/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getCookie(accessTokenName),
        },
      });
      dispatch<IUserAction<TGetUserActions>>({
        type: USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<IUserAction<TGetUserActions>>({
        type: USER_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
}

export function updateUser(postData: IUser) {
  return async function (dispatch: AppDispatch) {
    dispatch<IUserAction<TUpdateUserActions>>({
      type: USER_UPDATE_REQUEST,
      payload: {
        message: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    try {
      const data = await request<IUserPayLoad>(`${apiUrl}/auth/user`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(postData),
      });
      dispatch<IUserAction<TUpdateUserActions>>({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<IUserAction<TUpdateUserActions>>({
        type: USER_UPDATE_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
}
