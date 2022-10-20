import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { IngridientsContext } from "../../services/ingriedientsContext";
import { useState, useEffect } from "react";
import { apiUrl, bunType } from "../../constants/constants";
import { request } from "../../utils/request";

import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import { rootReducer } from "../../services/reducers/rootReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <div className={styles.row}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </Provider>
  );
}

export default App;
