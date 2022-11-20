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
  type: string;
  order?: IOrder;
}

export interface IOrderApiResponse {
  success: boolean;
  name:string,
  order: IOrder
}
