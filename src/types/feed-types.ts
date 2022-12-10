import { TWSUserActions } from "../services/actions/feed/wsUserActions";
import { TWSActions } from "../services/actions/feed/wsActions";
import { TFeedOrderActions } from "../services/actions/feed/feedOrder";


export interface IFeedOrder {
  ingredients: string[];
  _id:string;
  status:string;
  number:number;
  createdAt:string;
  updatedAt:string;
  name:string;
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

// export interface IFeedOrderApiResponse {
//   success: boolean;
//   name: string;
//   order: IFeedOrder;
// }

/*{"success":true,"orders":[{"_id":"6393fe7c99a25c001cd666e5","ingredients":["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733cd","60d3b41abdacab0026a733cc","60d3b41abdacab0026a733c7"],"owner":"63920baa99a25c001cd6533b","status":"done","name":"Space spicy флюоресцентный бургер","createdAt":"2022-12-10T03:35:24.146Z","updatedAt":"2022-12-10T03:35:24.846Z","number":33183,"__v":0}]}*/

export interface IFeed {
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
  success: boolean;
}


interface IFeedPayload{
  feed: IFeed;
 // url: string
 message:string;
}

// export interface IFeedAction {
//   type: TWSActions;
//   payload: IFeedPayload;
// }


// export interface IWSBaseAction {
//   type: string;
//   payload: IFeedPayload;
// }


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
  feed: IFeed,
  tolalCost: number;
  message:string
}





