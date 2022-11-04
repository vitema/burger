import { saveTokens } from "../../../utils/cookie";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../../actions/auth/register";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
   

    case REGISTER_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case REGISTER_SUCCESS: {
      saveTokens(action.payload.refreshToken, action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case REGISTER_FAILED: {
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