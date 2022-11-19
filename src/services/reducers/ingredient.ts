import { SET_INGREDIENT } from "../actions/ingredient";


interface IIngredientState {
  item:any;
}

interface IIngredientAction {
  item: any;
  type: string;
}


const initialState = {
  item: null,
};

export const ingredientReducer = (state: IIngredientState = initialState, action:IIngredientAction) => {
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
