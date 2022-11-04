import { useCallback, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { isAuth } from "../utils/cookie";
import { sendForgot } from "../services/actions/auth/forgot";

import commonStyles from "./page.module.css";
import AppHeader from "../components/app-header/app-header";

export function ForgotPasswordPage() {
  const history = useHistory();
  const forgotStore = useSelector((store) => store.forgot);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const sendEmail = () => {
    const postData = {
      email: email,
    };
    dispatch(sendForgot(postData, toResetCallBack));
  };

  const toResetCallBack = () => {
    history.replace("/reset-password");
  };

  if (isAuth()) {
    return <Redirect to={"/"} />;
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
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
            />
          </span>
          <span className="pb-20">
            <Button size="medium" onClick={sendEmail} htmlType="button">
              Восстановить
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

          <p className="text text_type_main-medium p-6">
            {forgotStore.message}
          </p>
        </div>
      </div>
    </>
  );
}
