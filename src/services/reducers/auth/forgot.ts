import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from "../../actions/auth/forgot";
import { setCookie } from "../../../utils/cookie";
import { sendForgotEmail } from "../../../constants/constants";

interface IState {
  request: boolean;
  success: boolean;
  message: string;
}

interface IAction {
  type: string;
  payload: string;
}

const initialState: IState = {
  request: false,
  success: false,
  message: "",
};

export const forgotReducer = (
  state: IState = initialState,
  action: IAction
) => {
  switch (action.type) {
    case FORGOT_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case FORGOT_SUCCESS: {
      setCookie(sendForgotEmail, true);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case FORGOT_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
