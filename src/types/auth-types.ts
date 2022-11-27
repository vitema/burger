export interface IRequestState {
  request: boolean;
  success: boolean;
  message: string;
}

export interface IRequestAction<T> {
  type: T;
  payload: string;
}

export interface ITokenPayLoad {
  refreshToken: string;
  accessToken: string;
  message: string;
}

export interface ITokenAction<T> {
  type: T;
  payload: ITokenPayLoad;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
}

export interface IReset {
  password: string;
  token: string;
}

export interface IUserPayLoad {
  refreshToken: string;
  accessToken: string;
  message: string;
  user?: IUser;
}

export interface IUserState {
  request: boolean;
  success: boolean;
  message: string;
  user?: IUser;
}

export interface IUserAction<T> {
  type: T;
  payload: IUserPayLoad;
}

export interface IAuthApiResponse {
  success: boolean;
  message: string;
}
