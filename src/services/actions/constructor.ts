export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const MOVE_COMPONENT: "MOVE_COMPONENT" = "MOVE_COMPONENT";
export const DELETE_COMPONENT: "DELETE_COMPONENT" = "DELETE_COMPONENT";
export const CLEAR_INGREDIENTS: "CLEAR_INGREDIENTS" = "CLEAR_INGREDIENTS";

export type TConstructorActions =
  | typeof GET_INGREDIENTS
  | typeof ADD_INGREDIENT
  | typeof MOVE_COMPONENT
  | typeof DELETE_COMPONENT
  | typeof CLEAR_INGREDIENTS;
