import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE,
} from "../../actions/feed/wsUserActions";

import {
  IFeedState,
  IFeed,
  IWSUserAction,
  IFeedOrder,
} from "../../../types/feed-types";

const initialState: IFeedState = {
  wsConnected: false,
  feed: {} as IFeed,
  message: "",
};

export const wsUserReducer = (state = initialState, action: IWSUserAction) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START:
      return {
        ...state,
        wsConnected: true,
        message: "",
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        message: action.payload.message,
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        feed: {
          ...action.payload.feed ,
          orders: action.payload.feed.orders.sort(orderCompareFunc)
        }
      };

    default:
      return state;
  }
};

const orderCompareFunc = (obj1: IFeedOrder, obj2: IFeedOrder) => {
  if (obj1.updatedAt > obj2.updatedAt) {
    return -1;
  }

  if (obj1.updatedAt < obj2.updatedAt) {
    return 1;
  }
  return 0;
};
