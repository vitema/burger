import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        orderRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        order: getOrderData(action.order),
        // Запрос закончил своё выполнение
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        orderFailed: true,
        // Запрос закончил своё выполнение
        orderRequest: false,
        order: getFailOrderData(),
      };
    }
    default: {
      return state;
    }
  }
};

const getOrderData = (data) => {
  return {
    number: data.order.number + "",
    status: {
      value: 1,
      text: "Ваш заказ начали готовить",
      description: "Дождитесь готовности на орбитальной станции",
    },
  };
};

const getFailOrderData = () => {
  return {
    number: "",
    status: {
      value: 2,
      text: "При оформлении заказа произошла ошибка",
      description: "Обратитесь к администратору",
    },
  };
};
