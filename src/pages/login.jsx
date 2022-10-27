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

export function LoginPage() {

  const history = useHistory(); 

  const register = useCallback(
    () => {
        history.replace({ pathname: '/register' });
    },
    [history]
  ); 

  const reset = useCallback(
    () => {
        history.replace({ pathname: '/reset-password' });
    },
    [history]
  ); 

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <div className={commonStyles.column}>
          <p className="text text_type_main-medium pb-6">Вход</p>
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
          <span className="pb-6">
            <PasswordInput name={"Пароль"} />
          </span>
          <span className="pb-20">
            <Button type="primary" size="large" htmlType="button">
              Войти
            </Button>
          </span>

          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </span>
            <Button type="secondary" size="medium" onClick={register}>
              Зарегистрироваться
            </Button>
          </div>
          <div className={commonStyles.buttonsRow}>
            <span className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </span>
            <Button type="secondary" size="medium" onClick={reset}>
              Восстановить пароль
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
