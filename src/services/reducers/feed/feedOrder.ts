import {
  GET_FEEDORDER_REQUEST,
  GET_FEEDORDER_SUCCESS,
  GET_FEEDORDER_FAILED,
  CLEAR_FEEDORDER,
} from "../../actions/feed/feedOrder";

import {
  IFeedOrderState,
  IFeedOrderAction,
} from "../../../types/feed-types";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: undefined,
};

export const feedOrderReducer = (
  state: IFeedOrderState = initialState,
  action: IFeedOrderAction
) => {
  switch (action.type) {
    case GET_FEEDORDER_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        orderRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        orderFailed: false,
      };
    }
    case GET_FEEDORDER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        order: action.order,
        // Запрос закончил своё выполнение
        orderRequest: false,
      };
    }
    case GET_FEEDORDER_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        orderFailed: true,
        // Запрос закончил своё выполнение
        orderRequest: false,
        order: action.order,
      };
    }
    case CLEAR_FEEDORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
