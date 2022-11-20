import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";
import { ITokenAction, ITokenPayLoad, IUser } from "../../../types/auth-types";
import { getErrorMessage } from "../../../utils/errors";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export function sendRegister(
  postData: IUser
): (dispatch: AppDispatch) => Promise<void> {
  return async function (dispatch: AppDispatch) {
    dispatch<ITokenAction>({
      type: REGISTER_REQUEST,
      payload: {
        message: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    try {
      const data = await request<ITokenPayLoad>(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch<ITokenAction>({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<ITokenAction>({
        type: REGISTER_FAILED,
        payload: {
          message: getErrorMessage(error),
          refreshToken: "",
          accessToken: "",
        },
      });
    }
  };
}
