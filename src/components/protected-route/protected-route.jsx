import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuth } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
        isAuth() ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: "/login",
              // В from сохраним текущий маршрут
              state: { referrer: location },
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
