import { IIngredient } from "../../types/ingredients-types";
import { IOrder } from "../../types/order-types";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from "../actions/order";
import { orderReducer } from "./order";

const item: IIngredient = {
  _id: "1",
  name: "name",
  type: "type",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  __v: 1,
  dragId: "dragId1",
  index: 1,
  count: 1,
};

const order: IOrder = {
  number: "123",
  status: {
    value: 1,
    text: "text",
    description: "description",
  },
};

describe("constructor reducer", () => {
  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_REQUEST,
        order: order,
      })
    ).toEqual({
      orderRequest: true,
      orderFailed: false,
      order: undefined,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_SUCCESS,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: {
        number: "123",
        status: {
          value: 1,
          text: "Ваш заказ начали готовить",
          description: "Дождитесь готовности на орбитальной станции",
        },
      },
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_FAILED,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: true,
      order: {
        number: "",
        status: {
          value: 2,
          text: "При оформлении заказа произошла ошибка",
          description: "Обратитесь к администратору",
        },
      },
    });
  });

  it("should handle CLEAR_ORDER", () => {
    expect(
      orderReducer(undefined, {
        type: CLEAR_ORDER,
        order: order,
      })
    ).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: undefined,
    });
  });
});
