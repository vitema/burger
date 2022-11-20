import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";
import { ITokenAction, ITokenPayLoad } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/errors";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

interface IPostData {
  email: string;
  password: string;
}

export function sendLogin(postData: IPostData) {
  return async function (dispatch: AppDispatch) {
    dispatch<ITokenAction>({
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
      dispatch<ITokenAction>({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<ITokenAction>({
        type: LOGIN_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
}
