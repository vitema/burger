import { saveTokens } from "../../../utils/cookie";
import { IRequestState, ITokenAction } from "../../../types/auth-types";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../../actions/auth/login";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const loginReducer = (
  state: IRequestState = initialState,
  action: ITokenAction
): IRequestState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case LOGIN_SUCCESS: {
      saveTokens(action.payload.refreshToken, action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload?.message,
      };
    }
    default: {
      return state;
    }
  }
};
