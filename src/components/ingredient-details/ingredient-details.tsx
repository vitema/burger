import styles from "./ingredient-details.module.css";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { IIngredient } from "../../types/ingredients-types";

const IngredientDetails = () => {

  const { data } = useSelector((store:RootState) => ({
    data: store.ingredients.items,
    ingredientsFailed: store.ingredients.ingredientsFailed,
  }));

  interface MatchParams {
    ingredientId: string;
  }
  const { params } = useRouteMatch<MatchParams>();
  const item = data.filter((x: IIngredient) => x._id == params["ingredientId"])[0];

  return (
    <div>
      {item && (
        <div className={styles.box}>
          <img src={item.image_large} alt={item.name} />
          <p className="text text_type_main-medium mt-4 mb-8">{item.name} </p>
          <div className={styles.componentsRow}>
            <div className={styles.componentsColumn}>
              <p className="text text_type_main-small text_color_inactive">
                Калории, ккал
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {item.calories}
              </p>
            </div>
            <div className={styles.componentsColumn}>
              <p className="text text_type_main-small text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {item.proteins}
              </p>
            </div>
            <div className={styles.componentsColumn}>
              <p className="text text_type_main-small text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {item.fat}
              </p>
            </div>
            <div className={styles.componentsColumn}>
              <p className="text text_type_main-small text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {item.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientDetails;
