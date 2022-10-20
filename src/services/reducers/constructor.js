import { GET_INGREDIENTS, ADD_INGREDIENT } from "../actions/constructor";
import { bunType } from "../../constants/constants";

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
        if (state.bun) {
          return {
            ...state,
            error: "Еще один компонент булки не может быть добавлен",
          };
        } else {
          return {
           ...state,
            bun: action.item
          };
        }
      }
      if (state.components.filter((x) => x._id == action.item._id).length > 0) {
        return {
          ...state,
          error: `Компонент ${action.item.name} уже добавлен`,
        };
      }
      return {
        ...state,
        components: [...state.components, action.item],
      };
    }

    default: {
      return state;
    }
  }
};
