import React, { useCallback } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { isAuth } from "../utils/cookie";
import { sendForgot } from "../services/actions/auth/forgot";

import commonStyles from "./page.module.css";
import { IUser } from "../types/auth-types";

import { useForm } from "../hooks/useForm";

export function ForgotPasswordPage() {
  const history = useHistory();
  const forgotStore = useAppSelector((store) => store.forgot);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const { handleChange, values } = useForm({ email: "" });

  const dispatch = useAppDispatch();

  const sendEmail = () => {
    const postData: IUser = {
      email: values["email"],
      name: "",
    };
    dispatch<any>(sendForgot(postData, toResetCallBack));
  };

  const toResetCallBack = () => {
    history.replace("/reset-password");
  };

  if (isAuth()) {
    return <Redirect to={"/"} />;
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <form onSubmit={onFormSubmit} className={commonStyles.form}>
          <p className="text text_type_main-medium pb-6">
            Восстановление пароля
          </p>
          <EmailInput
            onChange={handleChange}
            value={values["email"]}
            name={"email"}
            extraClass="pb-6"
          />
          <p className="pb-20">
            <Button size="medium" htmlType="submit">
              Восстановить
            </Button>
          </p>
        </form>
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

        <p className="text text_type_main-medium p-6">{forgotStore.message}</p>
      </div>
    </div>
  );
}
