import { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";
import { sendReset } from "../services/actions/auth/reset";

import { isAuth, isForgot } from "../utils/cookie";

export function ResetPasswordPage() {
  const history = useHistory();
  const resetStore = useSelector((store) => store.reset);

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
    dispatch(sendReset(postData, toLoginCallBack));
  };

  const toLoginCallBack = () => {
    history.replace({ pathname: "/login" });
  };

  useEffect(() => {
    if (isAuth() || !isForgot()) {
      history.replace({ pathname: "/forgot-password" });
    }
  }, [history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    save();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
        <form onSubmit={onFormSubmit}>
          <p className="pb-6">
            <PasswordInput
              name={"Введите новый пароль"}
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </p>
          <p className="pb-6">
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
          </p>

          <p className="pb-20">
            <Button size="medium" htmlType="submit">
              Сохранить
            </Button>
          </p>

          <div className={commonStyles.buttonsRow}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </p>
            <Button
              type="secondary"
              size="medium"
              onClick={login}
              htmlType="button"
            >
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-medium p-6">{resetStore.message}</p>
      </div>
    </div>
  );
}
