import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { IngridientsContext } from "../../services/ingriedientsContext";
import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "../constants/constants";

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
        const res = await fetch(`${apiUrl}/ingredients`);

        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }

        const data = await res.json();
        setState({ productData: data.data, loading: false, error: "" });
      } catch (error) {
        setState({ ...state, error: error });
      }
    };

    getProductData();
  }, []);

  const addIngredient = (item) => {
    const bunType = "bun";
    const bun = constructorItems.filter((x) => x.type == bunType)[0];
    debugger;

    if (bun && item.type == bunType) {
      setState({
        ...state,
        error: {message: "Еще один компонент булки не может быть добавлен"}
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
