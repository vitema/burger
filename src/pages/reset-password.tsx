import { useCallback, useEffect } from "react";
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

import { RootState, AppDispatch } from "../services/store";
import { IReset, IUser } from "../types/auth-types";
import { useForm } from "../hooks/useForm";

export function ResetPasswordPage() {
  const history = useHistory();
  const resetStore = useSelector((store: RootState) => store.reset);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const { values, handleChange } = useForm({
    token: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const save = (): void => {
    const postData: IReset = {
      password: values["password"],
      token: values["token"],
    };
    dispatch<any>(sendReset(postData, toLoginCallBack));
  };

  const toLoginCallBack = (): void => {
    history.replace({ pathname: "/login" });
  };

  useEffect(() => {
    if (isAuth() || !isForgot()) {
      history.replace({ pathname: "/forgot-password" });
    }
  }, [history]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    save();
  };

  return (
    <div className={commonStyles.row}>
      <div className={commonStyles.column}>
        <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
        <form onSubmit={onFormSubmit} className={commonStyles.form}>
          <PasswordInput
            placeholder={"Введите пароль"}
            name={"password"}
            onChange={handleChange}
            value={values["password"]}
            extraClass="pb-6"
          />
          <Input
            type={"text"}
            placeholder={"Введите текст из письма"}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={handleChange}
            value={values["token"]}
            extraClass="pb-6"
          />
          <p className="pb-20">
            <Button size="medium" htmlType="submit">
              Сохранить
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

        <p className="text text_type_main-medium p-6">{resetStore.message}</p>
      </div>
    </div>
  );
}
