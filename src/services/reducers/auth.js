import { setCookie, deleteCookie } from "../../utils/cookie";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/auth/login";
import { useHistory } from "react-router-dom";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../actions/auth/register";

import { TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED } from "../actions/auth/token";

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/auth/logout";

import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from "../actions/auth/user";

import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from "../actions/auth/forgot";

import { RESET_REQUEST, RESET_SUCCESS, RESET_FAILED } from "../actions/auth/reset";

const initialState = {
  request: false,
  success: false,
  user: null,
  message: "",
  forgot: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGIN_SUCCESS: {
      setCookie("refreshToken", action.payload.refreshToken);
      setCookie("accessToken", action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        user: action.payload.user,
        message: "",
        forgot: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload,
      };
    }
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        user: action.payload.user,
        message: "",
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload,
      };
    }
    case TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case TOKEN_SUCCESS: {
      setCookie("refreshToken", action.payload.refreshToken);
      setCookie("accessToken", action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        accessToken: action.payload.accessToken,
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
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGOUT_SUCCESS: {
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
      return {
        ...state,
        request: false,
        success: true,
        message: "",
        user: null
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

    case REGISTER_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case REGISTER_SUCCESS: {
      setCookie("refreshToken", action.payload.refreshToken);
      setCookie("accessToken", action.payload.accessToken);
      return {
        ...state,
        request: false,
        success: true,
        user: action.payload.user,
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

    case FORGOT_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case FORGOT_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        forgot: true,
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

    case RESET_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case RESET_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        forgot: false,
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
