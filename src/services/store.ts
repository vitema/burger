import {
  compose,
  createStore,
  applyMiddleware,
  Action,
  ActionCreator,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import { rootReducer } from "../services/reducers/rootReducer";
import {
  IConstructorAction,
  IIngredientsAction,
} from "../types/ingredients-types";
import {
  IRequestAction,
  ITokenAction,
  IUserAction,
} from "./../types/auth-types";
import { TForgotActions } from "./actions/auth/forgot";
import { TLoginActions } from "./actions/auth/login";
import { TLogoutActions } from "./actions/auth/logout";
import { TRefreshActions } from "./actions/auth/refresh";
import { TRegisterActions } from "./actions/auth/register";
import { TResetActions } from "./actions/auth/reset";
import { TGetUserActions, TUpdateUserActions } from "./actions/auth/user";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { TwsActionTypes } from "../../src/services/middleware/socketMiddleware";
import { IFeedOrderAction } from "../types/feed-types";
import { IOrderAction } from "../types/order-types";

import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_GET_MESSAGE,
} from "./actions/feed/wsActions";

import {
  WS_USER_CONNECTION_CLOSE,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_GET_MESSAGE,
} from "./actions/feed/wsUserActions";

import { IFeed, IWSAction } from "../types/feed-types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions: TwsActionTypes = {
  connect: {
    type: WS_CONNECTION_START,
    payload: { message: "", feed: undefined },
  },
  wsMessage: {
    type: WS_GET_MESSAGE,
    payload: { message: "", feed: undefined },
  },
  close: {
    type: WS_CONNECTION_CLOSE,
    payload: { message: "", feed: undefined },
  },
  wsError: {
    type: WS_CONNECTION_ERROR,
    payload: { message: "", feed: undefined},
  },
};

const wsUserActions: TwsActionTypes = {
  connect: {
    type: WS_USER_CONNECTION_START,
    payload: { message: "", feed: undefined},
  },
  wsMessage: {
    type: WS_USER_GET_MESSAGE,
    payload: { message: "", feed: undefined},
  },
  close: {
    type: WS_USER_CONNECTION_CLOSE,
    payload: { message: "", feed: undefined },
  },
  wsError: {
    type: WS_USER_CONNECTION_ERROR,
    payload: { message: "", feed:undefined },
  },
};

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsActions, false),
    socketMiddleware(wsUserActions, true)
  )
);

export type TApplicationActions =
  | IRequestAction<TForgotActions>
  | IRequestAction<TLogoutActions>
  | IRequestAction<TResetActions>
  | ITokenAction<TLoginActions>
  | ITokenAction<TRefreshActions>
  | ITokenAction<TRegisterActions>
  | IUserAction<TGetUserActions>
  | IUserAction<TUpdateUserActions>
  | IConstructorAction
  | IWSAction
  | IFeedOrderAction
  | IOrderAction
  | IIngredientsAction;

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
