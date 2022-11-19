import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";
import { IRequestAction } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/errors";

export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILED = "RESET_FAILED";

interface IPostData {
  password: string;
  token: string;
}

export function sendReset(
  postData: IPostData,
  toLoginCallBack: { (): void; (): void }
): (dispatch: AppDispatch) => Promise<void> {
  return async function (dispatch: AppDispatch) {
    dispatch<IRequestAction>({
      type: RESET_REQUEST ,
      payload: ""
    });
    try {
      const data = await request(`${apiUrl}/password-reset/reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      toLoginCallBack();
      dispatch<IRequestAction>({
        type: RESET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch<IRequestAction>({
        type: RESET_FAILED,
        payload:  getErrorMessage(error),
      });
    }
  };
}
