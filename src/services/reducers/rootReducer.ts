import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { ingredientReducer } from "./ingredient";

import { forgotReducer } from "./auth/forgot";
import { loginReducer } from "./auth/login";
import { logoutReducer } from "./auth/logout";
import { refreshReducer } from "./auth/refresh";
import { registerReducer } from "./auth/register";
import { resetReducer } from "./auth/reset";
import { userReducer } from "./auth/user";
import { wsReducer } from "./feed/wsReducer";
import { wsUserReducer } from "./feed/wsUserReducer";
import { feedOrderReducer } from "./feed/feedOrder";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorReducer,
  order: orderReducer,
  feedOrder: feedOrderReducer,
  ingredient: ingredientReducer,
  forgot: forgotReducer,
  login: loginReducer,
  logout: logoutReducer,
  refresh: refreshReducer,
  register: registerReducer,
  reset: resetReducer,
  user: userReducer,
  feed:wsReducer,
  userFeed:wsUserReducer
});
