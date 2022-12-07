import {
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
} from "../../actions/feed/wsUserActions";

import { IFeedState,IFeed, IWSAction, IFeedOrder } from "../../../types/feed-types";

const initialState: IFeedState = {
  wsConnected: false,
  feed:  {} as IFeed,
  tolalCost:0
};

export const wsUserReducer = (
  state = initialState,
  action: IWSAction
) => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        feed: action.payload.feed,
        
      };
   

    default:
      return state;
  }
};
