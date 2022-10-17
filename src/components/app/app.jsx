import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { IngridientsContext } from "../../services/ingriedientsContext";
import { useState, useEffect, useCallback } from "react";
import { apiUrl, bunType } from "../../constants/constants";
import { request } from "../../utils/request";

function App() {
  const [state, setState] = useState({
    productData: null,
    loading: true,
    error: "",
  });

  const [constructorItems, setConstructorItems] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        setState({ ...state, loading: true });
        const data = await request(`${apiUrl}/ingredients`);

        setState({ productData: data.data, loading: false, error: "" });
      } catch (error) {
        setState({ ...state, error: error });
      }
    };

    getProductData();
  }, []);

  const addIngredient = (item) => {
    const bun = constructorItems.filter((x) => x.type == bunType)[0];

    if (bun && item.type == bunType) {
      setState({
        ...state,
        error: { message: "Еще один компонент булки не может быть добавлен" },
      });
      return;
    }
    if (constructorItems.filter((x) => x._id == item._id)) {
      setState({
        ...state,
        error: { message: `Компонент ${item.name} уже добавлен` },
      });
      return;
    }

    setConstructorItems([...constructorItems, item]);
  };

  /*todo remove after realize drag&drop */
  const addIngredients = (items) => {
    setConstructorItems(items);
  };

  return (
    <>
      <AppHeader />
      {!state.loading ? (
        <div className={styles.row}>
          <BurgerIngredients
            data={state.productData}
            addIngredient={addIngredient}
            addIngredients={addIngredients}
          />
          <IngridientsContext.Provider value={constructorItems}>
            <BurgerConstructor />
          </IngridientsContext.Provider>
        </div>
      ) : (
        <>
          <p>Loading Please wait...</p>
        </>
      )}
      <h1>{state.error.message}</h1>
    </>
  );
}

export default App;
