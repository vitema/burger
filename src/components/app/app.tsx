import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import { ProtectedRoute } from "../protected-route/protected-route";

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
  FeedPage,
  FeedOrderPage
} from "../../pages";

import { getIngredients } from "../../services/actions/ingredients";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import AppHeader from "../app-header/app-header";

import { store } from "../../services/store";
import { Location } from "history";

import {useAppDispatch} from "../../hooks/useStore";

type TLocationState = {
  background: Location;
};

function App() {
  const ModalSwitch = () => {
    const location = useLocation<TLocationState>();
    const history = useHistory();

    const background = location.state && location.state.background;

    const handleModalClose = () => {
      history.goBack();
    };

    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch<any>(getIngredients());
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
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
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          <Route path="/feed/:orderId" exact={true}>
            <FeedOrderPage />
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
          <Route path="/ingredients/:ingredientId" exact={true}>
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
