import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../../actions/auth/register";

import { registerReducer } from "./register";
import { saveTokens } from "../../../utils/cookie";
jest.mock("../../../utils/cookie");
const mockedSaveTokens = jest.mocked(saveTokens);

describe("register reducer", () => {
  it("should handle REGISTER_REQUEST", () => {
    expect(
      registerReducer(undefined, {
        type: REGISTER_REQUEST,
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

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      registerReducer(undefined, {
        type: REGISTER_SUCCESS,
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

    expect(mockedSaveTokens).toBeCalledWith("refreshToken", "accessToken");
    expect(mockedSaveTokens).toHaveBeenCalledTimes(1);
  });

  it("should handle REGISTER_FAILED", () => {
    expect(
      registerReducer(undefined, {
        type: REGISTER_FAILED,
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
