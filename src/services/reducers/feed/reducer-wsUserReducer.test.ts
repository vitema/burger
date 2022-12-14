import { IFeedPayload } from "../../../types/feed-types";
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE,
} from "../../actions/feed/wsUserActions";

import { wsUserReducer } from "./wsUserReducer";

const order1 = {
  ingredients: [],
  _id: "id1",
  status: "status",
  number: 1,
  createdAt: "2000-01-01",
  updatedAt: "2000-01-01",
  name: "name",
};

const order2 = {
  ingredients: [],
  _id: "id2",
  status: "status",
  number: 1,
  createdAt: "2000-01-01",
  updatedAt: "2000-01-02",
  name: "name",
};

const payload: IFeedPayload = {
  feed: {
    orders: [order1, order2],
    total: 1,
    totalToday: 1,
    success: true,
  },
  message: "",
};

describe("wsUserReducer reducer", () => {
  it("should handle WS_USER_CONNECTION_START", () => {
    expect(
      wsUserReducer(undefined, {
        type: WS_USER_CONNECTION_START,
        payload: {
          feed: undefined,
          message: "message",
        },
      })
    ).toEqual({
      wsConnected: true,
      message: "",
      feed: undefined,
    });
  });

  it("should handle WS_USER_CONNECTION_ERROR", () => {
    expect(
      wsUserReducer(undefined, {
        type: WS_USER_CONNECTION_ERROR,
        payload: {
          feed: undefined,
          message: "message",
        },
      })
    ).toEqual({
      wsConnected: false,
      message: "message",
      feed: undefined,
    });
  });

  it("should handle WS_USER_GET_MESSAGE", () => {
    expect(
      wsUserReducer(undefined, {
        type: WS_USER_GET_MESSAGE,
        payload: payload,
      })
    ).toEqual({
      wsConnected: false,
      message: "",
      feed: {
        orders: [order2, order1],
        total: 1,
        totalToday: 1,
        success: true,
      },
    });
  });
});
