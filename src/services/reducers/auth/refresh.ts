import { saveTokens } from "../../../utils/cookie";

import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from "../../actions/auth/refresh";

interface IState {
  request: boolean;
  success: boolean;
  message: string;
  user: any; //todo  типизировать
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
  user: null,
  message: "",
};

export const refreshReducer = (state: IState  = initialState, action: IAction) => {
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
