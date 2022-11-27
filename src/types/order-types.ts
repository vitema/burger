import { TOrderActions } from "../services/actions/order";

export interface IOrderStatus {
  value: number;
  text: string;
  description?: string;
}

export interface IOrder {
  number: string;
  status: IOrderStatus;
}

export interface IOrderState {
  orderRequest: boolean;
  orderFailed: boolean;
  order?: IOrder;
}

export interface IOrderAction {
  type: TOrderActions;
  order?: IOrder;
}

export interface IOrderApiResponse {
  success: boolean;
  name: string;
  order: IOrder;
}
