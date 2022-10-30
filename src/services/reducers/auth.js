import { setCookie } from "../../utils/cookie";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/login";
import { useHistory } from "react-router-dom";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../actions/register";

import { TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED } from "../actions/token";

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/logout";

import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
} from "../actions/user";

const initialState = {
  request: false,
  success: false,
  user: {
    email: "",
    name: "",
  },
  accessToken: "",
  refreshToken: "",
  message:""
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

      setCookie('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        request: false,
        success:true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        message: ""
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload
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
        success:true,
        user: action.payload.user,
        message: ""
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload
      };
    }
    case TOKEN_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case TOKEN_SUCCESS: {
      setCookie('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        request: false,
        success:true,
        accessToken: action.payload.accessToken,
        message: ""
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGOUT_SUCCESS: {
      setCookie('refreshToken', "");
      return {
        ...state,
        request: false,
        success:true,
        accessToken:" action.payload.accessToken",
        message: ""
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
