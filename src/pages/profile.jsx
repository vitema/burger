import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import AppHeader from "../components/app-header/app-header";
import Menu from "../components/menu/menu";

import { getUser, updateUser } from "../services/actions/auth/user";

export function ProfilePage() {
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChanged, setChanged] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    setChanged(true);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setChanged(true);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setChanged(true);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userStore.user) {
      setEmail(userStore.user.email);
      setName(userStore.user.name);
    }
  }, [userStore]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    save();
  };

  const save = () => {
    const postData = {
      email: email,
      name: name,
      password: password,
    };
    dispatch(updateUser(postData));
    setChanged(false);
  };

  const cancel = () => {
    dispatch(getUser());
    setChanged(false);
    setPassword("");
  };

  return (
    <>
      <AppHeader />

      <div className={commonStyles.row}>
        <Menu />
        {userStore.user && (
          <div className={commonStyles.inputs}>
            <form onSubmit={onFormSubmit}>
              <div className="pb-6">
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  name={"name"}
                  error={false}
                  errorText={"Ошибка"}
                  size={"default"}
                  onChange={onChangeName}
                  value={name}
                />
              </div>
              <div className="pb-6">
                <EmailInput
                  onChange={onChangeEmail}
                  value={email}
                  name={"email"}
                />
              </div>
              <div className="pb-6">
                <PasswordInput
                  onChange={onChangePassword}
                  value={password}
                  name={"password"}
                />
              </div>
              {isChanged && (
                <div>
                  <Button
                    type="primary"
                    size="medium"
                    onClick={save}
                    htmlType="submit"
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
              )}
            </form>
            <p className="text text_type_main-medium p-6">
              {userStore.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
