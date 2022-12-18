import {
  GET_FEEDORDER_REQUEST,
  GET_FEEDORDER_SUCCESS,
  GET_FEEDORDER_FAILED,
  CLEAR_FEEDORDER,
} from "../../actions/feed/feedOrder";

import { feedOrderReducer } from "./feedOrder";

const order = {
  ingredients: [],
  _id: "id",
  status: "status",
  number: 1,
  createdAt: "2000-01-01",
  updatedAt: "2000-01-01",
  name: "name",
};

describe("feedOrder reducer", () => {
  it("should handle FEEDORDER_REQUEST", () => {
    expect(
      feedOrderReducer(undefined, {
        type: GET_FEEDORDER_REQUEST,
        order: order,
      })
    ).toEqual({
      orderRequest: true,
      orderFailed: false,
      order: undefined,
    });
  });

  it("should handle FEEDORDER_SUCCESS", () => {
    expect(
      feedOrderReducer(undefined, {
        type: GET_FEEDORDER_SUCCESS,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: order,
    });
  });

  it("should handle FEEDORDER_FAILED", () => {
    expect(
      feedOrderReducer(undefined, {
        type: GET_FEEDORDER_FAILED,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: true,
      order: order,
    });
  });

  it("should handle CLEAR_FEEDORDER", () => {
    expect(
      feedOrderReducer(undefined, {
        type: CLEAR_FEEDORDER,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: undefined,
    });
  });
});
