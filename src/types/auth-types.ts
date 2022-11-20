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


export interface IUser {
  name: string;
  email: string;
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

export interface IUserAction {
  type: string;
  payload: IUserPayLoad;
}

export interface IAuthApiResponse {
  success: boolean;
  message: string;
}
