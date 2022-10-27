import { useCallback } from 'react';
import { useHistory } from 'react-router-dom'; 

import AppHeader from "../components/app-header/app-header";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  Input,
  PasswordInput,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import commonStyles from "./page.module.css";

export function ResetPasswordPage() {

  const history = useHistory(); 

  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  ); 

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
              type={"text"}
              placeholder={"E-mail"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </span>

          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </span>
            <Button type="secondary" size="medium" onClick={login}>
              Войти
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
