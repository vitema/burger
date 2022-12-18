import { IIngredient } from "../../types/ingredients-types";
import { SET_INGREDIENT } from "../actions/ingredient";
import { ingredientReducer } from "./ingredient";

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
      ingredientReducer(undefined, {
        type: SET_INGREDIENT,
        item: item,
      })
    ).toEqual({
      item: item,
    });
  });
});
