import { IFeedPayload } from "../../../types/feed-types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from "../../actions/feed/wsActions";

import { wsReducer } from "./wsReducer";

const payload: IFeedPayload = {
   feed: {
    orders: [
      {
          ingredients: [],
          _id: "id1",
          status: "status",
          number: 1,
          createdAt: "2000-01-01",
          updatedAt: "2000-01-01",
          name: "name",
      },
      {
        ingredients: [],
        _id: "id2",
        status: "status",
        number: 1,
        createdAt: "2000-01-01",
        updatedAt: "2000-02-01",
        name: "name",
    }
    ],
    total: 1,
    totalToday: 1,
    success: true,
  },
  message: "",
};

describe("wsReducer reducer", () => {

  it("should handle WS_CONNECTION_START", () => {
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_START,
        payload:  {
          feed: undefined,
          message: "message",
        }
      })
    ).toEqual({
      wsConnected: true,
      message: "",
      feed: undefined,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_ERROR,
        payload:  {
          feed: undefined,
          message: "message",
        }
      })
    ).toEqual({
      wsConnected: false,
      message: "message",
      feed: undefined,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: payload,
        
      })
    ).toEqual({
      wsConnected: false,
      message: "",
      feed: payload.feed,
    });
  });

 
});
