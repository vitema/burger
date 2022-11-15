import { saveTokens } from "../../../utils/cookie";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../../actions/auth/register";


interface IState {
  request: boolean;
  success: boolean;
  message: string;
}

interface IPayLoad{
  refreshToken:string;
  accessToken: string;
  message: string;
}

interface IAction {
  type:  string;
  payload: IPayLoad;
}

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const registerReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        request: true,
        success: false,
        message: "",
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
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};
