export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';


export type TWSActions =
  | typeof WS_CONNECTION_START
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED
  | typeof WS_GET_MESSAGE

  
  // export const wsConnectionSuccess = () => {
  //   return {
  //     type: WS_CONNECTION_SUCCESS
  //   };
  // };
  
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
  
  // export const wsGetMessage = (message: any) => {
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