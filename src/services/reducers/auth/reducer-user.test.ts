import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_SET,
} from "../../actions/auth/user";

import { userReducer } from "./user";
import { setCookie } from "../../../utils/cookie";

const payload = {
  refreshToken: "refreshToken",
  accessToken: "accessToken",
  message: "message",
  user: {
    name: "name",
    email: "email",
    password: "password",
  },
};

describe("user reducer", () => {
  it("should handle USER_REQUEST", () => {
    expect(
      userReducer(undefined, {
        type: USER_REQUEST,
        payload: payload
      })
    ).toEqual({
      request: true,
      success: false,
      message: "",
      user: undefined,
    });
  });

  it("should handle USER_SUCCESS", () => {
    expect(
      userReducer(undefined, {
        type: USER_SUCCESS,
        payload: payload
      })
    ).toEqual({
      request: false,
      success: true,
      message: "",
      user: {
        name: "name",
        email: "email",
        password: "password",
      },
    });
  });

  it("should handle USER_FAILED", () => {
    expect(
      userReducer(undefined, {
        type: USER_FAILED,
        payload: {
          refreshToken: "refreshToken",
          accessToken: "accessToken",
          message: "message",
          user: {
            name: "name",
            email: "email",
            password: "password",
          },
        }
      })
    ).toEqual({
      success: false,
      request: false,
      message: "message",
      user: undefined
    });
  });

  it("should handle USER_UPDATE_REQUEST", () => {
    expect(
      userReducer(undefined, {
        type: USER_UPDATE_REQUEST,
        payload: payload
      })
    ).toEqual({
      request: true,
      success: false,
      message: "",
      user: undefined,
    });
  });

  it("should handle USER_UPDATE_SUCCESS", () => {
    expect(
      userReducer(undefined, {
        type: USER_UPDATE_SUCCESS,
        payload: payload
      })
    ).toEqual({
      request: false,
      success: true,
      message: "",
      user: {
        name: "name",
        email: "email",
        password: "password",
      },
    });
  });

  it("should handle USER_UPDATE_FAILED", () => {
    expect(
      userReducer(undefined, {
        type: USER_UPDATE_FAILED,
        payload: {
          refreshToken: "refreshToken",
          accessToken: "accessToken",
          message: "message",
          user: {
            name: "name",
            email: "email",
            password: "password",
          },
        }
      })
    ).toEqual({
      success: false,
      request: false,
      message: "message",
      user: undefined
    });
  });

  it("should handle USER_SET", () => {
    expect(
      userReducer(undefined, {
        type: USER_SET,
        payload: payload
      })
    ).toEqual({
      success: false,
      request: false,
      message: "",
      user: {
        name: "name",
        email: "email",
        password: "password",
      },
    });
  });
});
