import { IFeed, IWSAction, IWSUserAction } from "../../types/feed-types";

import { Middleware } from "redux";
import { RootState, AppDispatch } from "../store";

import { wsUrl, accessTokenName } from "../../constants/constants";
import { getCookie } from "../../utils/cookie";
import type { MiddlewareAPI } from "redux";
export type TwsActionTypes = {
  connect: IWSAction | IWSUserAction;
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
      const { dispatch } = store;
      const { type } = action;

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

      if (socket) {
        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({
            type: wsError.type,
            payload: { feed: {} as IFeed, message: "websocket error" },
          });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: wsMessage.type,
            payload: { feed: parsedData, message: "" },
          });
        };
      }

      next(action);
    };
  }) as Middleware;
};
