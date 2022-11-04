import { useCallback, useState } from "react";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

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
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={location.state?.referrer || "/"}
      />
    );
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    logIn();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <p className="text text_type_main-medium pb-6">Вход</p>
        <form onSubmit={onFormSubmit} className={commonStyles.form}>
          <EmailInput
            type={"text"}
            placeholder={"E-mail"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            extraClass="pb-6"
          />
          <PasswordInput
            name={"Пароль"}
            value={password}
            onChange={(e) => setPass(e.target.value)}
            extraClass="pb-6"
          />
          <p className="pb-20">
            <Button type="primary" size="large" htmlType="submit">
              Войти
            </Button>
          </p>

          <div className={commonStyles.buttonsRow}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
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
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Button
              type="secondary"
              size="medium"
              onClick={reset}
              htmlType="button"
            >
              Восстановить пароль
            </Button>
          </div>
        </form>
        <p className="text text_type_main-medium p-6">{loginStore.message}</p>
      </div>
    </div>
  );
}
