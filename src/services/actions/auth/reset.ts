import { type } from "os";
import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";

// export const RESET_REQUEST = "RESET_REQUEST";
// export const RESET_SUCCESS = "RESET_SUCCESS";
// export const RESET_FAILED = "RESET_FAILED";

export type RESET_TYPES = "RESET_REQUEST" | "RESET_SUCCESS" | "RESET_FAILED"; 


interface IPostData {
  password: string;
  token: string;
}

export function sendReset(
  postData: IPostData,
  toLoginCallBack: { (): void; (): void }
) {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: "RESET_REQUEST" ,
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
      dispatch({
        type: "RESET_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "RESET_FAILED",
        payload: error,
      });
    }
  };
}
