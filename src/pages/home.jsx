import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import commonStyles from "./page.module.css";
export function HomePage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={commonStyles.row}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}
