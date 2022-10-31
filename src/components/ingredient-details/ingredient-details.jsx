import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  Link
} from "react-router-dom";

const IngredientDetails = () => {
  const item = useSelector((store) => store.ingredient.item);
  const location = useLocation();

  return (
   
    <div>
      {item && (
      //    <Link
      //    key={item._id}
      //    to={{
      //      // Тут мы формируем динамический путь для нашего ингредиента
      //      // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
      //      pathname: `/ingredients/${item._id}`,
      //      state: { background: location },
      //    }}
      //   className={styles.link}
      //  >
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
        // </Link>
      )}
    </div>
  );
};

export default IngredientDetails;
