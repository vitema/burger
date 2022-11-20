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

import { RootState, AppDispatch } from "../services/store";
import { IUser } from "../types/auth-types";

import { useForm } from "../hooks/useForm";

export function RegisterPage() {
  const history = useHistory();
  const registerStore = useSelector((store: RootState) => store.register);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const save = () => {
    const postData : IUser = {
      password: values["password"],
      name: values["name"],
      email: values["email"],
    };
    dispatch<any>(sendRegister(postData));
  };
  if (isAuth()) {
    return <Redirect to={"/"} />;
  }

  const onFormSubmit =  (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    save();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <p className="text text_type_main-medium pb-6">Регистрация</p>
        <form onSubmit={onFormSubmit} className={commonStyles.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={handleChange}
            value={values["name"]}
            extraClass="pb-6"
          />
          <EmailInput
            onChange={handleChange}
            value={values["email"]}
            name={"email"}
            extraClass="pb-6"
          />
          <PasswordInput
            name={"password"}
            onChange={handleChange}
            value={values["password"]}
            extraClass="pb-6"
          />
          <p className="pb-20">
            <Button type="primary" size="large" htmlType="submit">
              Зарегистрироваться
            </Button>
          </p>
        </form>
        <div className={commonStyles.buttonsRow}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Button
            type="secondary"
            size="medium"
            onClick={ login}
            htmlType="button"
          >
            Войти
          </Button>
        </div>

        <p className="text text_type_main-medium p-6">
          {registerStore.message}
        </p>
      </div>
    </div>
  );
}
