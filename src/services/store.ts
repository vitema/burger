import {
  compose,
  createStore,
  applyMiddleware,
  Action,
  ActionCreator,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import { rootReducer } from "../services/reducers/rootReducer";
import { IConstructorAction } from "../types/ingredients-types";
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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

type TApplicationActions =
  | IRequestAction<TForgotActions>
  | IRequestAction<TLogoutActions>
  | IRequestAction<TResetActions>
  | ITokenAction<TLoginActions>
  | ITokenAction<TRefreshActions>
  | ITokenAction<TRegisterActions>
  | IUserAction<TGetUserActions>
  | IUserAction<TUpdateUserActions>
  | IConstructorAction

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
