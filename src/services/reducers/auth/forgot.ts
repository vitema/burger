import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from "../../actions/auth/forgot";
import { setCookie } from "../../../utils/cookie";
import { sendForgotEmail } from "../../../constants/constants";

import { IRequestState, IRequestAction } from "../../../types/auth-types";


const initialState: IRequestState = {
  request: false,
  success: false,
  message: "",
};

export const forgotReducer = (
  state: IRequestState = initialState,
  action: IRequestAction
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
      setCookie(sendForgotEmail, "true", undefined);
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
