import {  IFeed, IWSAction, IWSUserAction } from "../../types/feed-types";

import { Middleware } from "redux";
import { RootState, AppDispatch, TApplicationActions } from "../store";


import { wsUrl, accessTokenName } from "../../constants/constants";
import { getCookie } from "../../utils/cookie";
import type { MiddlewareAPI } from "redux";
export type TwsActionTypes = {
  connect: IWSAction | IWSUserAction ;
  close: IWSAction | IWSUserAction;
  wsError: IWSAction | IWSUserAction;
  wsMessage: IWSAction | IWSUserAction;
};

export const socketMiddleware = (
  actionTypes: TwsActionTypes,
  useToken: boolean
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: IWSAction | IWSUserAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const { connect, close, wsMessage, wsError } = actionTypes;

      if (type == connect.type) {
        const subpath =
          useToken == true
            ? `?token=${getCookie(accessTokenName).replace("Bearer ", "")}`
            : "/all";
        socket = new WebSocket(`${wsUrl}${subpath}`);
      }

      if (type == close.type && socket) {
        socket.close();
      }

      // if (type === "WS_CONNECTION_START") {
      //   // объект класса WebSocket
      //   socket = new WebSocket(wsUrl);
      // }
      if (socket) {
        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: wsError.type, payload: { feed: {} as IFeed, message: "error websocket" } });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: wsMessage.type,
            payload: { feed: parsedData, message:"" },
          });
        };
        // функция, которая вызывается при закрытии соединения
        // socket.onclose = event => {
        //   dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        // };
      }

      next(action);
    };
  }) as Middleware;
};
