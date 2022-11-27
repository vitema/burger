import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch, AppThunk } from "../../store";
import { ITokenAction, ITokenPayLoad, IUser } from "../../../types/auth-types";
import { getErrorMessage } from "../../../utils/errors";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export type TLoginActions =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAILED;

export const sendLogin: AppThunk = (
  postData: IUser
): ((dispatch: AppDispatch) => Promise<void>) => {
  return async function (dispatch: AppDispatch) {
    dispatch<ITokenAction<TLoginActions>>({
      type: LOGIN_REQUEST,
      payload: {
        message: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    try {
      const data = await request<ITokenPayLoad>(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch<ITokenAction<TLoginActions>>({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<ITokenAction<TLoginActions>>({
        type: LOGIN_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
};
