import { SET_INGREDIENT } from "../actions/ingredient";

const initialState = {
  item: null,
};

export const ingredientReducer = (state = initialState, action) => {
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
