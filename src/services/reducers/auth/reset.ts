// import {
//   RESET_REQUEST,
//   RESET_SUCCESS,
//   RESET_FAILED,
// } from "../../actions/auth/reset";

import { RESET_TYPES } from "../../actions/auth/reset";

import { sendForgotEmail } from "../../../constants/constants";
import { deleteCookie } from "../../../utils/cookie";


interface IState {
  request: boolean;
  success: boolean;
  message: string;
}

interface IAction {
  type:  RESET_TYPES;
  payload: string;
}

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const resetReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case "RESET_REQUEST": {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
      };
    }
    case "RESET_SUCCESS": {
      deleteCookie(sendForgotEmail);
      return {
        ...state,
        request: false,
        success: true,
        message: "",
      };
    }
    case "RESET_FAILED": {
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
