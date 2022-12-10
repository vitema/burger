import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE,
} from "../../actions/feed/wsUserActions";

import { IFeedState,IFeed, IWSUserAction, IFeedOrder } from "../../../types/feed-types";
import FeedOrder from "../../../components/feed-order/feed-order";

const initialState: IFeedState = {
  wsConnected: false,
  feed:  {} as IFeed,
  tolalCost:0,
  message: ""
};

export const wsUserReducer = (
  state = initialState,
  action: IWSUserAction
) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START:
      return {
        ...state,
        wsConnected: true,
        message: ""
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        message: action.payload.message
      };


    case WS_USER_GET_MESSAGE:
      let data=action.payload.feed;
     
      const result3 = data.orders.sort((obj1, obj2) => {
        if (obj1.updatedAt > obj2.updatedAt) {
          return -1;
        }
      
        if (obj1.updatedAt < obj2.updatedAt) {
          return 1;
        }
      
        return 0;
      });
      data.orders=result3;
      return {
        ...state,
       feed:data
      };
   

    default:
      return state;
  }
};
