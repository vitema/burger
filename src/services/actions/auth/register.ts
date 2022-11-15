import { apiUrl } from "../../../constants/constants";
import { request } from "../../../utils/request";
import { AppDispatch } from "../../store";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

interface IPostData {
  password: string;
  name: string;
  email: string;
}

export function sendRegister(postData: IPostData) {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const data = await request(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: { message: error },
      });
    }
  };
}
