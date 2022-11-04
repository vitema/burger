import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
} from "../../actions/auth/reset";

const initialState = {
  request: false,
  success: false,
  message: "",
};

export const resetReducer = (state = initialState, action) => {
  switch (action.type) {
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
