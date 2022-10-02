import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Data from './utils/data';
import styles from './App.module.css';

function App() {
  return (
    <>
    <AppHeader />
    <div className={styles.row}><BurgerIngredients data={Data}/><BurgerConstructor data={Data}/></div>
    </>
  );
}

export default App;