import { useCallback, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";

import { sendRegister } from "../services/actions/auth/register";

export function RegisterPage() {
  const history = useHistory();
  const auth = useSelector((store) => store.auth);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const dispatch = useDispatch();

  const save = async () => {
    const postData = {
      password: password,
      name: name,
      email: email,
    };
    dispatch(sendRegister(postData));
  };

  if (auth.user) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={"/"}
      />
    );
  }

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <div className={commonStyles.column}>
          <p className="text text_type_main-medium pb-6">Регистрация</p>
          <span className="pb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </span>
          <span className="pb-6">
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
            />
          </span>
          <span className="pb-6">
            <PasswordInput
              name={"Пароль"}
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </span>
          <span className="pb-20">
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={save}
            >
              Зарегистрироваться
            </Button>
          </span>

          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
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
          <p className="text text_type_main-medium p-6">{error}</p>
        </div>
      </div>
    </>
  );
}
