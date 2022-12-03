import {
  WS_USER_NAME_UPDATE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../actions/feed/wsActions";

import { IFeedState,IFeed, IFeedAction, IFeedOrder } from "../../../types/feed-types";

const initialState: IFeedState = {
  wsConnected: false,
  feed:  {} as IFeed,
  tolalCost:0
};

export const wsReducer = (
  state = initialState,
  action: IFeedAction
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        feed: action.payload,
        total:0
      };
   

    default:
      return state;
  }
};
