import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../actions/auth/logout";

import { logoutReducer } from "./logout";
import { deleteTokens } from "../../../utils/cookie";
jest.mock("../../../utils/cookie");
const mockedDeleteTokens = jest.mocked(deleteTokens);

describe("logout reducer", () => {
  it("should handle LOGOUT_REQUEST", () => {
    expect(
      logoutReducer(undefined, {
        type: LOGOUT_REQUEST,
        payload: "",
      })
    ).toEqual({
      request: true,
      success: false,
      message: "",
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      logoutReducer(undefined, {
        type: LOGOUT_SUCCESS,
        payload: "",
      })
    ).toEqual({
      request: false,
      success: true,
      message: "",
    });

    expect(mockedDeleteTokens).toHaveBeenCalledTimes(1);
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(
      logoutReducer(undefined, {
        type: LOGOUT_FAILED,
        payload: "test",
      })
    ).toEqual({
      success: false,
      request: false,
      message: "test",
    });
    expect(mockedDeleteTokens).toHaveBeenCalledTimes(1);
  });
});
