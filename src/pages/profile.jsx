import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";
import styles from "./profile.module.css";

import AppHeader from "../components/app-header/app-header";
import Menu from "../components/menu/menu";

import { apiUrl } from "../constants/constants";
import { request } from "../utils/request";
import { user } from "../services/actions/user";
import { token } from "../services/actions/token";

export function ProfilePage() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const history = useHistory();

  const login = useCallback(() => {
    history.replace({ pathname: "/login" });
  }, [history]);

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  useEffect(() => {
   dispatch(token());
    if (!auth.accessToken) {
      dispatch(token());
    }

     dispatch(user(auth.accessToken));
  }, [dispatch]);

  useEffect(() => {
    // if (!auth.success && auth.message) {
    //   history.replace({ pathname: "/login" });
    // }
    setEmail(auth.user.email);
    setName(auth.user.name);
    setPass("");
  }, [auth]);

  const save = async () => {
    const postData = {
      password: password,
      name: name,
      email: email,
    };
    try {
      const data = await request(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (data.success) {
        history.replace({ pathname: "/login" });
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
        <Menu />
        <div className={commonStyles.inputs}>
          <p className="text text_type_main-medium pb-6">Регистрация</p>
          <span className="pb-6">
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
          </span>
          <span className="pb-6">
            <EmailInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
            />
          </span>
          <span className="pb-6">
            <PasswordInput
              name={"Пароль"}
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </span>

          <p className="text text_type_main-medium p-6">{error}</p>
        </div>
      </div>
    </>
  );
}
