
export interface IIngredientsState {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  items: IIngredient[];
}

export interface IIngredientsAction {
  ingredients: IIngredient[]; //deatailed
  type: string;
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


export interface IConstructorState {
  bun?: IIngredient;
  components: IIngredient[];
  error: string;
}

export interface IConstructorAction {
  type: string;
  item?: IIngredient;
  components: IIngredient[];
  id: string;
}
