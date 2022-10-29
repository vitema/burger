import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import AppHeader from "../components/app-header/app-header";

import { apiUrl } from "../constants/constants";
import { request } from "../utils/request";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";

export function ResetPasswordPage() {
  const history = useHistory();

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [password, setPass] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const save = async () => {
    const postData = {
      password: password,
      token: token
    };
    try {
      const data = await request(`${apiUrl}/password-reset/reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (data.success) {
        history.replace({ pathname: "/login" });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error);
    }
  };

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
            <Button type="secondary" size="medium" onClick={login} htmlType="button">
              Войти
            </Button>
          </div>
          <p className="text text_type_main-medium p-6">{error}</p>
        </div>
      </div>
    </>
  );
}
