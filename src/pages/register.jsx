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

import { sendRegister } from "../services/actions/auth/register";
import { isAuth } from "../utils/cookie";

export function RegisterPage() {
  const history = useHistory();
  const registerStore = useSelector((store) => store.register);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const dispatch = useDispatch();

  const save = () => {
    const postData = {
      password: password,
      name: name,
      email: email,
    };
    dispatch(sendRegister(postData));
  };
  if (isAuth()) {
    return <Redirect to={"/"} />;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    save();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <p className="text text_type_main-medium pb-6">Регистрация</p>
        <form onSubmit={onFormSubmit}>
          <p className="pb-6">
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
          </p>
          <p className="pb-6">
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
            />
          </p>
          <p className="pb-6">
            <PasswordInput
              name={"Пароль"}
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </p>
          <p className="pb-20">
            <Button type="primary" size="large" htmlType="submit">
              Зарегистрироваться
            </Button>
          </p>

          <div className={commonStyles.buttonsRow}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
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
        <p className="text text_type_main-medium p-6">
          {registerStore.message}
        </p>
      </div>
    </div>
  );
}
