import { TConstructorActions } from "../services/actions/constructor";
import { TIngredientActions } from "../services/actions/ingredient";
import { TIngredientsActions } from "../services/actions/ingredients";

export interface IIngredientsState {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  items: IIngredient[];
}

export interface IIngredientsAction {
  ingredients: IIngredient[];
  type: TIngredientsActions;
  id: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  dragId?: string;
  index?: number;
  count?: number;
}

export interface IIngredientsApiResponse {
  success: boolean;
  data: IIngredient[];
}

export interface IIngredientState {
  item?: IIngredient;
}

export interface IIngredientAction {
  item?: IIngredient;
  type: TIngredientActions;
}

export interface IConstructorState {
  bun?: IIngredient;
  components: IIngredient[];
  error: string;
}

export interface IConstructorAction {
  type: TConstructorActions;
  item?: IIngredient;
  components: IIngredient[];
  id: string;
}
