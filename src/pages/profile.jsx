import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";
import styles from "./profile.module.css";

import AppHeader from "../components/app-header/app-header";
import Menu from "../components/menu/menu";

import { getUser, updateUser } from "../services/actions/auth/user";

export function ProfilePage() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (auth.user) {
      setEmail(auth.user.email);
      setName(auth.user.name);
    }
  }, [auth]);

  const save = () => {
    const postData = {
      email: email,
      name: name,
    };
    dispatch(updateUser(postData));
  };

  const cancel = () => {
    dispatch(getUser());
  };

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <Menu />
        <div className={commonStyles.inputs}>
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
          <div>
            <Button
              type="primary"
              size="medium"
              onClick={save}
              htmlType="button"
            >
              Сохранить
            </Button>

            <Button
              type="secondary"
              size="medium"
              onClick={cancel}
              htmlType="button"
            >
              Отмена
            </Button>
          </div>

          <p className="text text_type_main-medium p-6">{auth.message}</p>
        </div>
      </div>
    </>
  );
}
