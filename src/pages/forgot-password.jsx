import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";
import { apiUrl } from "../constants/constants";
import { request } from "../utils/request";

export function ForgotPasswordPage() {
  const history = useHistory();
  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [error, setError] = useState();

  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const sendEmail = async () => {
    const postData = {
      email: value,
    };
    try {
      const data = await request(`${apiUrl}/password-reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (data.success) {
        history.replace({ pathname: "/reset-password" });
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
