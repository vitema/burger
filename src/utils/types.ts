import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
  dragId: PropTypes.string,
});

const orderStatusType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const orderType = PropTypes.shape({
  number: PropTypes.string.isRequired,
  status: orderStatusType.isRequired,
});

export interface IRequestState {
  request: boolean;
  success: boolean;
  message: string;
}

export interface IRequestAction {
  type: string;
  payload: string;
}

export interface ITokenPayLoad {
  refreshToken: string;
  accessToken: string;
  message: string;
}

export interface ITokenAction {
  type: string;
  payload: ITokenPayLoad;
}

export interface IUserPayLoad {
  refreshToken: string;
  accessToken: string;
  message: string;
  user?: IUser;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IUserState {
  request: boolean;
  success: boolean;
  message: string;
  user?: IUser;
}

export interface IUserAction {
  type: string;
  payload: IUserPayLoad;
}

export interface IIngredientsState {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  items: any[];
}

export interface IIngredientsAction {
  ingredients: any[]; //deatailed
  type: string;
  id: string;
}


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

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  dragId?: string;
  index?: number;
  count?: number;
}


export interface IConstructorState {
  bun: any;
  components: any[];
  error: string;
}

export interface IConstructorAction {
  type: string;
  item?: IIngredient;
  components: any[]; //todo detail
  id: string;
}

//

export interface IAuthApiResponse {
  success: boolean;
  message: string;
}

export interface IIngredientsApiResponse {
  success: boolean;
  data: IIngredient[];
}

 

