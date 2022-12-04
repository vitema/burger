import { IFeedAction } from "../../types/feed-types";
import { WS_CONNECTION_START,WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/feed/wsActions";

export const socketMiddleware = (wsUrl: string, wsActions: any) => {
    return (store: { dispatch: any; getState: any; }) => {
      let socket: WebSocket | null = null;
  
      return (next: (arg0: any) => void) => (action: IFeedAction ) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
    
        if (type === WS_CONNECTION_START && payload.url) {
          socket = new WebSocket(`${wsUrl}${payload.url}`);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({ type: WS_CONNECTION_SUCCESS });
          };
  
          // socket.onerror = event => {
          //   dispatch({ type: onError, payload: event });
          // };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: WS_GET_MESSAGE, payload: {feed: restParsedData, url: "" }});
          };
  
          // socket.onclose = event => {
          //   dispatch({ type: onClose, payload: event });
          // };
  
          // if (type === wsSendMessage) {
          //   const message = { ...payload, 
          //      // token: user.token 
          //   };
          //   socket.send(JSON.stringify(message));
          // }
        }
  
        next(action);
      };
    };
  };