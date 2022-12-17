import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from "../../actions/auth/refresh";

import { refreshReducer } from "./refresh";
import {saveTokens} from "../../../utils/cookie"
jest.mock("../../../utils/cookie");
const mockedSaveTokens= jest.mocked(saveTokens);


describe("refresh reducer", () => {
  it("should handle TOKEN_REQUEST", () => {
    expect(
      refreshReducer(
        undefined,
        {
          type: TOKEN_REQUEST,
          payload: {
            refreshToken: "",
            accessToken: "",
            message: "",
          },
        }
      )
    ).toEqual({
      request: true,
      success: false,
      message: "",
    });
  });

  it("should handle TOKEN_SUCCESS", () => {
    expect(
      refreshReducer(
        undefined,
        {
          type: TOKEN_SUCCESS,
          payload: {
            refreshToken: "refreshToken",
            accessToken: "accessToken",
            message: "",
          },
        }
      )
    ).toEqual({
      request: false,
      success: true,
      message: "",
    });

    expect(mockedSaveTokens).toBeCalledWith("refreshToken","accessToken" );
    expect(mockedSaveTokens).toHaveBeenCalledTimes(1);
  });

  it("should handle TOKEN_FAILED", () => {
    expect(
      refreshReducer(
        undefined,
        {
          type: TOKEN_FAILED,
          payload: {
            refreshToken: "refreshToken",
            accessToken: "accessToken",
            message: "test",
          },
        }
      )
    ).toEqual({
      success: false,
      request: false,
      message: "test",
    });
  });
});
