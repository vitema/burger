import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
} from "../../actions/auth/reset";

import { resetReducer } from "./reset";
import { deleteCookie } from "../../../utils/cookie";

jest.mock("../../../utils/cookie");
const mockedDeleteCookie = jest.mocked(deleteCookie);

describe("reset reducer", () => {
   it("should handle RESET_REQUEST", () => {
    expect(
      resetReducer(
        undefined,
        {
          type: RESET_REQUEST,
          payload: ""
        }
      )
    ).toEqual({
      request: true,
      success: false,
      message: "",
    });
  });

  it("should handle RESET_SUCCESS", () => {
    expect(
      resetReducer(
        undefined,
        {
          type: RESET_SUCCESS,
          payload: ""
        }
      )
    ).toEqual({
      request: false,
      success: true,
      message: "",
    });

    expect(mockedDeleteCookie).toBeCalledTimes(1)
  });

  it("should handle RESET_FAILED", () => {
    expect(
      resetReducer(
        undefined,
        {
          type: RESET_FAILED,
          payload: "test",
        }
      )
    ).toEqual({
      success: false,
      request: false,
      message: "test",
    });
  });
});
