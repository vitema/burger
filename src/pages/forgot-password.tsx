import { useCallback, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../services/store";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { isAuth } from "../utils/cookie";
import { sendForgot } from "../services/actions/auth/forgot";

import commonStyles from "./page.module.css";
import { IUser } from "../types/auth-types";

export function ForgotPasswordPage() {
  const history = useHistory();
  const forgotStore = useSelector((store: RootState) => store.forgot);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [email, setEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const sendEmail = () => {
    const postData: IUser = {
      email: email,
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

  const onFormSubmit = (e: { preventDefault: () => void }) => {
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
