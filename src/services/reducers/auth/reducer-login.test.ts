import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../../actions/auth/login";

import { loginReducer } from "./login";
import {saveTokens} from "../../../utils/cookie"
jest.mock("../../../utils/cookie");
const mockedSaveTokens= jest.mocked(saveTokens);

describe("login reducer", () => {
   it("should handle LOGIN_REQUEST", () => {
    expect(
      loginReducer(undefined, {
        type: LOGIN_REQUEST,
        payload: {
          refreshToken: "",
          accessToken: "",
          message: "",
        },
      })
    ).toEqual({
      request: true,
      success: false,
      message: "",
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      loginReducer(undefined, {
        type: LOGIN_SUCCESS,
        payload: {
          refreshToken: "refreshToken",
          accessToken: "accessToken",
          message: "",
        },
      })
    ).toEqual({
      request: false,
      success: true,
      message: "",
    });

    expect(mockedSaveTokens).toBeCalledWith("refreshToken","accessToken" );
    expect(mockedSaveTokens).toHaveBeenCalledTimes(1);
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      loginReducer(undefined, {
        type: LOGIN_FAILED,
        payload: {
          refreshToken: "",
          accessToken: "",
          message: "test",
        },
      })
    ).toEqual({
      success: false,
      request: false,
      message: "test",
    });
  });
});
