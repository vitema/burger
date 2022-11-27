import { IIngredient } from "../../types/ingredients-types";
import { SET_INGREDIENT } from "../actions/ingredient";
import {
  IIngredientState,
  IIngredientAction,
} from "../../types/ingredients-types";

const initialState = {
  item: undefined,
};

export const ingredientReducer = (
  state: IIngredientState = initialState,
  action: IIngredientAction
) => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return {
        item: action.item,
      };
    }
    default: {
      return state;
    }
  }
};
