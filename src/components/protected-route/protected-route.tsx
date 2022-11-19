import { FC, PropsWithChildren } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../utils/cookie";

 interface ProtectedRouteProps{
  path:string;
  exact:boolean
 }

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  ...rest
}) => {
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
};

