import { saveTokens } from "../../../utils/cookie";

import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from "../../actions/auth/refresh";

const initialState = {
  request: false,
  success: false,
  user: null,
  message: "",
};

export const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
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
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
