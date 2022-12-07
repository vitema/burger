export interface IAction<T> {
  type: string;
  payload: T | undefined;
}

export interface IActionCreator<T> {
  (type: string, payload: T): IAction<T>;
   match(type: string): boolean;
}



