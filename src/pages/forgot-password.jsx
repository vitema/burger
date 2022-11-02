import { useCallback, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";
import { isAuth } from "../utils/isAuth";
import { refreshTokenName } from "../constants/constants";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";
import { sendForgot } from "../services/actions/auth/forgot";


export function ForgotPasswordPage() {
  const history = useHistory();
  const auth = useSelector((store) => store.auth);

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [error, setError] = useState();

  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const dispatch= useDispatch();

  const sendEmail =  () => {
    const postData = {
      email: value,
    };
    dispatch(sendForgot(postData))
  };


  if (auth()) {
    return (
      <Redirect
        to={ "/"}
      />
    );
  }

  if (!getCookie(refreshTokenName)) {
    return (
      <Redirect
        to={ "/login"}
      />
    );
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
            <EmailInput onChange={onChange} value={value} name={"email"} />
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

          <p className="text text_type_main-medium p-6">{error}</p>
        </div>
      </div>
    </>
  );
}
