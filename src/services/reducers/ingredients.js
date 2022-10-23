import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from "../actions/ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  items: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        ingredientsRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        items: action.ingredients,
        // Запрос закончил своё выполнение
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        ingredientsFailed: true,
        // Запрос закончил своё выполнение
        ingredientsRequest: false,
      };
    }
    case INCREMENT_COUNT: {
      return {
        ...state,
        items: increment(action.id, state.items),
      };
    }
    case DECREMENT_COUNT: {
      return {
        ...state,
        items: decrement(action.id, state.items),
      };
    }
    default: {
      return state;
    }
  }
};

const increment = (id, items) => {
  const newItems = [...items];
  const item = newItems.filter((x) => x._id == id)[0];
  if (item.count) {
    item.count++;
  } else {
    item.count = 1;
  }
  return newItems;
};

const decrement = (id, items) => {
  const newItems = [...items];
  const item = newItems.filter((x) => x._id == id)[0];
  if (item.count) {
    item.count--;
  }
  return newItems;
};
