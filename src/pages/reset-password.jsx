import { useCallback, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";
import { isAuth } from "../utils/isAuth";
import { sendReset } from "../services/actions/auth/reset";

import AppHeader from "../components/app-header/app-header";

export function ResetPasswordPage() {
  const history = useHistory();
  const auth = useSelector((store) => store.auth);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [password, setPass] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const save = () => {
    const postData = {
      password: password,
      token: token,
    };
    dispatch(sendReset(postData));
  };

  if (isAuth()) {
    return <Redirect to={"/"} />;
  }

  if (auth.forgot) {
    <Redirect to={"/forgot-password"} />;
  }

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <div className={commonStyles.column}>
          <p className="text text_type_main-medium pb-6">
            Восстановление пароля
          </p>
          <span className="pb-6">
            <PasswordInput
              name={"Введите новый пароль"}
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </span>
          <span className="pb-6">
            <Input
              type={"text"}
              placeholder={"Введите текст из письма"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={(e) => setToken(e.target.value)}
              value={token}
            />
          </span>

          <span className="pb-20">
            <Button size="medium" onClick={save} htmlType="button">
              Сохранить
            </Button>
          </span>

          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </span>
            <Button
              type="secondary"
              size="medium"
              onClick={login}
              htmlType="button"
            >
              Войти
            </Button>
          </div>
          <p className="text text_type_main-medium p-6">{auth.message}</p>
        </div>
      </div>
    </>
  );
}
