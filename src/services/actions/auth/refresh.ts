import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { AppDispatch } from "../../store";
import { ITokenAction } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/errors";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILED = "TOKEN_FAILED";

export function refreshToken() {
  return async function (dispatch: AppDispatch) {
    dispatch<ITokenAction>({
      type: TOKEN_REQUEST,
      payload: {
        message: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    try {
      const postData = {
        token: getCookie("refreshToken"),
      };

      const data = await request(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch<ITokenAction>({
        type: TOKEN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<ITokenAction>({
        type: TOKEN_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
}
