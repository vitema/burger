import { deleteTokens } from "../../../utils/cookie";

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../actions/auth/logout";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
        success:false,
        message: "",
      };
    }
    case LOGOUT_SUCCESS: {
      deleteTokens();
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case LOGOUT_FAILED: {
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
