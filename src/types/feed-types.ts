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


interface IFeedPayload{
  feed: IFeed,
  url: string
}

export interface IFeedAction {
  type: TWSActions;
  payload: IFeedPayload;
}


export interface IFeedState {
  wsConnected: boolean;
  feed: IFeed,
  tolalCost: number;
}





