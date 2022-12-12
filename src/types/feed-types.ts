import { TWSUserActions } from "../services/actions/feed/wsUserActions";
import { TWSActions } from "../services/actions/feed/wsActions";
import { TFeedOrderActions } from "../services/actions/feed/feedOrder";

export interface IFeedOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IFeedOrderState {
  orderRequest: boolean;
  orderFailed: boolean;
  order?: IFeedOrder;
}

export interface IFeedOrderAction {
  type: TFeedOrderActions;
  order?: IFeedOrder;
}

export interface IFeed {
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
  success: boolean;
}

interface IFeedPayload {
  feed?: IFeed;
  message: string;
}

export interface IWSAction {
  type: TWSActions;
  payload: IFeedPayload;
}

export interface IWSUserAction {
  type: TWSUserActions;
  payload: IFeedPayload;
}

export interface IFeedState {
  wsConnected: boolean;
  feed?: IFeed;
  message: string;
}