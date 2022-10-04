import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Data from "../../utils/data";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <AppHeader />
      <div className={styles.row}>
        <BurgerIngredients data={Data} />
        <BurgerConstructor data={Data} />
      </div>
    </>
  );
}

export default App;
