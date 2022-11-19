import { RootState, AppDispatch } from "../store";

import {
  GET_INGREDIENTS,
  ADD_INGREDIENT,
  MOVE_COMPONENT,
  DELETE_COMPONENT,
  CLEAR_INGREDIENTS,
} from "../actions/constructor";
import { bunType } from "../../constants/constants";


interface IConstructorState {
  bun: any;
  components: any[] ;
  error: string;
  
}

interface IConstructorAction {
  type:  string;
  item: any;
  components: any[]; //todo detail
  id:string;
}


const initialState = {
  bun: null,
  components: [],
  error: "",
};

export const constructorReducer = (state: IConstructorState = initialState, action: IConstructorAction) => {
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
    case CLEAR_INGREDIENTS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
