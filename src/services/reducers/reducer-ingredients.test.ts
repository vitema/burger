import { IIngredient } from "../../types/ingredients-types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CLEAR_COUNTS,
} from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

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

describe("constructor reducer", () => {
  it("should handle SET_INGREDIENT", () => {
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_REQUEST,
        ingredients: [item],
        id: "id",
      })
    ).toEqual({
      ingredientsRequest: true,
      ingredientsFailed: false,
      items: [],
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: [item],
        id: "id",
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: false,
      items: [item],
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_FAILED,
        ingredients: [item],
        id: "id",
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [],
    });
  });

  it("should handle INCREMENT_COUNT", () => {
    const state = {
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    };

    expect(
      ingredientsReducer(state, {
        type: INCREMENT_COUNT,
        ingredients: [item],
        id: "1",
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    });

    expect(item.count).toEqual(2);
  });

  it("should handle DECREMENT_COUNT", () => {
    const state = {
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    };

    expect(
      ingredientsReducer(state, {
        type: DECREMENT_COUNT,
        ingredients: [item],
        id: "1",
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    });

    expect(item.count).toEqual(1);
  });

  it("should handle CLEAR_COUNTS", () => {
    const state = {
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    };

    expect(
      ingredientsReducer(state, {
        type: CLEAR_COUNTS,
        ingredients: [item],
        id: "1",
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
      items: [item],
    });

    expect(item.count).toEqual(0);
  });
});
