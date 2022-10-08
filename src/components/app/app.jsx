import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";

import { useState, useEffect } from "react";

function App() {
  const apiUrl = "https://norma.nomoreparties.space/api";

  const [state, setState] = useState({
    productData: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    setState({ ...state, loading: true });

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

  return (
    <>
      <AppHeader />
      {!state.loading ? (
        <div className={styles.row}>
          <BurgerIngredients data={state.productData} />
          <BurgerConstructor data={state.productData} />
        </div>
      ) : (
        <>
          <p>Loading Please wait...</p>
          <h1>{state.error.message}</h1>
        </>
      )}
    </>
  );
}

export default App;
