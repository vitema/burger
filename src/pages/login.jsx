import { useCallback, useState, useEffect } from "react";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";
import { sendLogin } from "../services/actions/auth/login";
import { isAuth } from "../utils/cookie";


export function LoginPage() {
  const history = useHistory();
  const loginStore = useSelector((store) => store.login);

  const register = useCallback(() => {
    history.replace({ pathname: "/register" });
  }, [history]);

  const reset = useCallback(() => {
    history.replace({ pathname: "/forgot-password" });
  }, [history]);

  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const logIn = () => {
    const postData = {
      email: email,
      password: password,
    };

    dispatch(sendLogin(postData));
  };

  const location = useLocation();
  if (isAuth()) {
    console.log(location.state?.referrer);
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={location.state?.referrer  || "/"}
      />
    );
  }

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <div className={commonStyles.column}>
          <p className="text text_type_main-medium pb-6">Вход</p>
          <span className="pb-6">
            <EmailInput
              type={"text"}
              placeholder={"E-mail"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span className="pb-6">
            <PasswordInput
              name={"Пароль"}
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </span>
          <span className="pb-20">
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={logIn}
            >
              Войти
            </Button>
          </span>

          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </span>
            <Button
              type="secondary"
              size="medium"
              onClick={register}
              htmlType="button"
            >
              Зарегистрироваться
            </Button>
          </div>
          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </span>
            <Button
              type="secondary"
              size="medium"
              onClick={reset}
              htmlType="button"
            >
              Восстановить пароль
            </Button>
          </div>

          <p className="text text_type_main-medium p-6">{loginStore.message}</p>
        </div>
      </div>
    </>
  );
}
