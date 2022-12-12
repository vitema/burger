import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_SET,
} from "../../actions/auth/user";

import { IUserState, IUserAction } from "../../../types/auth-types";
import { TGetUserActions, TUpdateUserActions } from "../../actions/auth/user";

const initialState = {
  request: false,
  success: false,
  user: undefined,
  message: "",
};

export const userReducer = (
  state: IUserState = initialState,
  action: IUserAction<TGetUserActions> | IUserAction<TUpdateUserActions>
) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        user: action.payload?.user,
        message: "",
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload?.message,
        user: undefined,
      };
    }
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        user: action.payload?.user,
        message: "",
      };
    }
    case USER_UPDATE_FAILED: {
      return {
        ...state,
        success: false,
        request: false,
        message: action.payload?.message,
      };
    }
    case USER_SET: {
      return {
        ...state,
        user: action.payload?.user,
        request: false,
      };
    }

    default: {
      return state;
    }
  }
};
