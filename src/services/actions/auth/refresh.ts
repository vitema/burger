import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { getCookie } from "../../../utils/cookie";
import { AppDispatch, AppThunk } from "../../store";
import { ITokenAction, ITokenPayLoad } from "../../../types/auth-types";
import { getErrorMessage } from "../../../utils/errors";

export const TOKEN_REQUEST: "TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS: "TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN_FAILED: "TOKEN_FAILED" = "TOKEN_FAILED";

export type TRefreshActions =
  | typeof TOKEN_REQUEST
  | typeof TOKEN_SUCCESS
  | typeof TOKEN_FAILED;

export const refreshToken: AppThunk = (): ((
  dispatch: AppDispatch
) => Promise<void>) => {
  return async function (dispatch: AppDispatch) {
    dispatch<ITokenAction<TRefreshActions>>({
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

      const data = await request<ITokenPayLoad>(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch<ITokenAction<TRefreshActions>>({
        type: TOKEN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<ITokenAction<TRefreshActions>>({
        type: TOKEN_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
};
