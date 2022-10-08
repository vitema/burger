import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
//import Data from "../../utils/data";
import styles from "./app.module.css";

import { useState, useEffect } from "react";

function App() {
  const apiUrl = "https://norma.nomoreparties.space/api";

  const [state, setState] = useState({
    productData: null,
    loading: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
// fetch((`${apiUrl}/ingredients`))
// .then(res=>res.json)
// .then(res=>res.json)
    const getProductData = async () => {
      setState({ ...state, loading: true });
      const res = await fetch(`${apiUrl}/ingredients`);
      const data = await res.json();
      setState({ productData: data.data, loading: false });
    };

    getProductData();
  }, []);

  return (
    <div id="main" >
      <AppHeader />
      {!state.loading ? (
        <div className={styles.row}>
          <BurgerIngredients data={state.productData} />
          <BurgerConstructor data={state.productData} />
        </div>
      ) : (
        <p>Loading Please wait...</p>
      )}
    </div>
  );
}

export default App;
