import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Data from './utils/data';

function App() {
  return (
    <>
    <AppHeader />
    <div style={{display:"flex"}}><BurgerIngredients data={Data}/><BurgerConstructor data={Data}/></div>
    </>
  );
}

export default App;