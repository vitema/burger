
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../services/reducers/rootReducer";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ForgotPasswordPage, HomePage, LoginPage, RegisterPage, ResetPasswordPage } from "../../pages";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
      </Switch>
      </Router>
    </Provider>
  );
}

export default App;
