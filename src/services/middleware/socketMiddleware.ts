import { IFeedAction } from "../../types/feed-types";
import { WS_CONNECTION_START,WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/feed/wsActions";

export const socketMiddleware = (wsUrl: string, wsActions: any) => {
    return (store: { dispatch: any; getState: any; }) => {
      let socket: WebSocket | null = null;
  
      return (next: (arg0: any) => void) => (action: IFeedAction ) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
      //  const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
       // const { user } = getState().user;
       //&& user
        if (type === WS_CONNECTION_START ) {
         // socket = new WebSocket(`${wsUrl}?token=${user.token}`);
          socket = new WebSocket(`${wsUrl}`);
        }
        if (socket) {
          socket.onopen = event => {
           // dispatch({ type: onOpen, payload: event });
            dispatch({ type: WS_CONNECTION_SUCCESS });
          };
  
          // socket.onerror = event => {
          //   dispatch({ type: onError, payload: event });
          // };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
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