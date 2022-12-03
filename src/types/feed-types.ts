import {TWSActions} from "../services/actions/feed/wsActions"


export interface IFeedOrder {
  ingredients: string[];
  _id:string;
  status:string;
  number:number;
  createdAt:string;
  updatedAt:string;
  name:string;
}


export interface IFeed {
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
  success: boolean;
}


export interface IFeedAction {
  type: TWSActions;
  payload: IFeed;
}


export interface IFeedState {
  wsConnected: boolean;
  feed: IFeed,
  tolalCost: number;
}





