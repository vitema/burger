import { IIngredient } from "../../types/ingredients-types";
import {
  GET_INGREDIENTS,
  ADD_INGREDIENT,
  MOVE_COMPONENT,
  DELETE_COMPONENT,
  CLEAR_INGREDIENTS,
} from "../actions/constructor";

import { constructorReducer } from "./constructor";
import { bunType } from "../../constants/constants";

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

const components: IIngredient[] = [item];

describe("constructor reducer", () => {
  it("should handle GET_INGREDIENTS", () => {
    expect(
      constructorReducer(undefined, {
        type: GET_INGREDIENTS,
        item: undefined,
        components: [],
        id: "",
      })
    ).toEqual({
      bun: undefined,
      components: [],
      error: "",
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      constructorReducer(undefined, {
        type: ADD_INGREDIENT,
        item: item,
        components: [],
        id: "",
      })
    ).toEqual({
      bun: undefined,
      components: [item],
      error: "",
    });
  });

  it("should handle ADD_INGREDIENT (bun)", () => {
    item.type = bunType;
    expect(
      constructorReducer(undefined, {
        type: ADD_INGREDIENT,
        item: item,
        components: [],
        id: "",
      })
    ).toEqual({
      bun: item,
      components: [],
      error: "",
    });
  });

  it("should handle MOVE_COMPONENT", () => {
    item.type = bunType;
    expect(
      constructorReducer(undefined, {
        type: MOVE_COMPONENT,
        item: item,
        components: [item],
        id: "",
      })
    ).toEqual({
      bun: undefined,
      components: [item],
      error: "",
    });
  });

  it("should handle DELETE_COMPONENT", () => {
    item.type = bunType;
    expect(
      constructorReducer(undefined, {
        type: DELETE_COMPONENT,
        item: item,
        components: [item],
        id: "notDragId",
      })
    ).toEqual({
      bun: undefined,
      components: [],
      error: "",
    });
  });

  it("should handle CLEAR_INGREDIENTS", () => {
    item.type = bunType;
    expect(
      constructorReducer(undefined, {
        type: CLEAR_INGREDIENTS,
        item: item,
        components: [item],
        id: "",
      })
    ).toEqual({
      bun: undefined,
      components: [],
      error: "",
    });
  });
});
