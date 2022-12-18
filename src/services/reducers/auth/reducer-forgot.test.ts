import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from "../../actions/auth/forgot";

import { forgotReducer } from "./forgot";
import { setCookie } from "../../../utils/cookie";
import { sendForgotEmail } from "../../../constants/constants";

jest.mock("../../../utils/cookie");
const mockedSetCookie = jest.mocked(setCookie);

describe("forgot reducer", () => {
  it("should handle FORGOT_REQUEST", () => {
    expect(
      forgotReducer(undefined, {
        type: FORGOT_REQUEST,
        payload: "",
      })
    ).toEqual({
      request: true,
      success: false,
      message: "",
    });
  });

  it("should handle FORGOT_SUCCESS", () => {
    expect(
      forgotReducer(undefined, {
        type: FORGOT_SUCCESS,
        payload: "",
      })
    ).toEqual({
      request: false,
      success: true,
      message: "",
    });

    expect(mockedSetCookie).toBeCalledWith(sendForgotEmail, "true", undefined);
    expect(mockedSetCookie).toBeCalledTimes(1);
  });

  it("should handle FORGOT_FAILED", () => {
    expect(
      forgotReducer(undefined, {
        type: FORGOT_FAILED,
        payload: "test",
      })
    ).toEqual({
      success: false,
      request: false,
      message: "test",
    });
  });
});
