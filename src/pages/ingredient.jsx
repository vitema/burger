
import commonStyles from "./page.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export function IngredientPage() {
  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <IngredientDetails />
      </div>
    </div>
  );
}
