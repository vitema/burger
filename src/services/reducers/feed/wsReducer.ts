import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_MESSAGE,
} from "../../actions/feed/wsActions";

import { IFeedState,IFeed, IWSAction, IFeedOrder } from "../../../types/feed-types";

const initialState: IFeedState = {
  wsConnected: false,
  feed:  {} as IFeed,
  tolalCost:0,
  message: ""
};

export const wsReducer = (
  state = initialState,
  action: IWSAction
) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: true,
        message:""
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        message:action.payload.message
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        feed: action.payload.feed,
        message:""
        
      };
    default:
      return state;
  }
};
