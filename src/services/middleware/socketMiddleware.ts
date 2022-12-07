import { IWSAction, IFeed } from "../../types/feed-types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/feed/wsActions";
import { Middleware } from "redux";
import { RootState, AppDispatch, TApplicationActions } from "../store";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

import { wsUrl, accessTokenName } from "../../constants/constants";
import { getCookie } from "../../utils/cookie";
import type { MiddlewareAPI } from "redux";
export type TwsActionTypes = {
  connect: IWSAction;
  // disconnect: IAction<string>,
  // wsConnecting: IAction<string>,
  // wsOpen: IAction<string>,
  // wsClose: IAction<string>,
  // wsError:IAction<string>,
  wsMessage: IWSAction;
};


export const socketMiddleware = (
  actionTypes: TwsActionTypes,
  useToken: boolean
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: IWSAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const { connect, wsMessage } = actionTypes;

      if (type == connect.type) {
        const subpath = useToken==true
          ? `?token=${getCookie(accessTokenName).replace("Bearer ", "")}`
          : "/all";
        socket = new WebSocket(`${wsUrl}${subpath}`);
      }

      // if (type === "WS_CONNECTION_START") {
      //   // объект класса WebSocket
      //   socket = new WebSocket(wsUrl);
      // }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        // socket.onopen = event => {
        //   dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        // };

        //         // функция, которая вызывается при ошибке соединения
        // socket.onerror = event => {
        //   dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        // };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data) ;
         debugger;
          dispatch({ type: wsMessage.type, payload:{url:"", feed:parsedData}  });
        };
        // функция, которая вызывается при закрытии соединения
        // socket.onclose = event => {
        //   dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        // };

        // if (type === 'WS_SEND_MESSAGE') {
        //   const message = payload;
        //             // функция для отправки сообщения на сервер
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  }) as Middleware;
};
