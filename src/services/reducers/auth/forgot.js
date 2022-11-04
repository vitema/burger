import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from "../../actions/auth/forgot";

const initialState = {
  request: false,
  success: false,
  message: "",
  forgot: false,
};

export const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
