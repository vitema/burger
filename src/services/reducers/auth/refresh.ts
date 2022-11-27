import { saveTokens } from "../../../utils/cookie";
import { IRequestState, ITokenAction } from "../../../types/auth-types";

import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from "../../actions/auth/refresh";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const refreshReducer = (
  state: IRequestState = initialState,
  action: ITokenAction
) => {
  switch (action.type) {
    case TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case TOKEN_SUCCESS: {
      saveTokens(action.payload.refreshToken, action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};
