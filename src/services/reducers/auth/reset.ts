import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
} from "../../actions/auth/reset";
import { IRequestState, IRequestAction } from "../../../types/auth-types";

import { sendForgotEmail } from "../../../constants/constants";
import { deleteCookie } from "../../../utils/cookie";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const resetReducer = (
  state: IRequestState = initialState,
  action: IRequestAction
) => {
  switch (action.type) {
    case RESET_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case RESET_SUCCESS: {
      deleteCookie(sendForgotEmail);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case RESET_FAILED: {
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
