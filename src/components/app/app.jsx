import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../services/reducers/rootReducer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  OrdersPage,
  OrderPage,
  IngredientPage,
} from "../../pages";

import { ProtectedRoute } from "../protected-route/protected-route";
import useModal from "../../hooks/useModal";
import Modal from "../modal/modal";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory(); // для react-router 5
    let background = location.state && location.state.background;
    const { modalVisible, handleOpenModal, handleCloseModal } = useModal();

    const handleModalClose = () => {
      // dispatch({
      //   type: RESET_ITEM_TO_VIEW,
      // });
      history.goBack(); // для react-router 5
    };
    return (
      <>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <OrderPage />
          </ProtectedRoute>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/ingredients/:ingredientId" exact>
            <IngredientPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
        </Switch>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            children={
              <Modal onClose={handleModalClose} header="Детали ингридиента">
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    );
  };
  return (
    <Provider store={store}>
      <Router>
        <ModalSwitch />
      </Router>
    </Provider>
  );
}

export default App;
