import { IFeed } from "../../../types/feed-types";
import {IActionCreator} from "../../../types/action-creator"
import { match } from "assert";

export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';



export type TWSUserActions =
  | typeof WS_USER_CONNECTION_SUCCESS
  // | typeof WS_CONNECTION_SUCCESS
  // | typeof WS_CONNECTION_ERROR
  // | typeof WS_CONNECTION_CLOSED
  | typeof WS_USER_GET_MESSAGE

  
  // export const wsConnectionSuccess:IActionCreator<string> = () => {
  //  match:(type: string): boolean => WS_CONNECTION_START === type;

  // }
  
  // export const wsConnectionError = () => {
  //   return {
  //     type: WS_CONNECTION_ERROR
  //   };
  // };
  
  // export const wsConnectionClosed = () => {
  //   return {
  //     type: WS_CONNECTION_CLOSED
  //   };
  // };
  
  // export const wsGetMessage = (message: IFeed) => {
  //   return {
  //     type: WS_GET_MESSAGE,
  //     payload: message
  //   };
  // };
  
  // export const wsSendMessage = (message: any) => {
  //   return {
  //     type: WS_SEND_MESSAGE,
  //     payload: message
  //   };
  // };
  
//   export const wsUserNameUpdate = userName => {
//     return {
//       type: WS_USER_NAME_UPDATE,
//       payload: userName
//     };
//   };