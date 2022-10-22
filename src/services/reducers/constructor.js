import {
  GET_INGREDIENTS,
  ADD_INGREDIENT,
  MOVE_COMPONENT,
  DELETE_COMPONENT,
} from "../actions/constructor";
import { bunType } from "../../constants/constants";

import { DECREMENT_COUNT, INCREMENT_COUNT } from "../actions/ingredients";

const initialState = {
  bun: null,
  components: [],
  error: "",
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return state;
    }
    case ADD_INGREDIENT: {
      if (action.item.type == bunType) {
          return {
            ...state,
            bun: action.item,
          };
      }

      return {
        ...state,
        components: [...state.components, action.item],
      };
    }
    case MOVE_COMPONENT: {
      return {
        ...state,
        components: [...action.components],
      };
    }
    case DELETE_COMPONENT: {
      return {
        ...state,
        components: [...state.components.filter((x) => x.dragId != action.id)],
      };
    }

    default: {
      return state;
    }
  }
};
