import { refreshTokenName, accessTokenName } from "../constants/constants";
import { getCookie } from "./cookie";

export const isAuth = () => {
  return getCookie(accessTokenName) ? true : false;
};


