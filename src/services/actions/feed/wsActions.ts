export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export type TWSActions =
  | typeof WS_CONNECTION_START
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSE
  | typeof WS_GET_MESSAGE;