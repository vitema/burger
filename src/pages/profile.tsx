import { SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import Menu from "../components/menu/menu";

import { getUser, updateUser } from "../services/actions/auth/user";
import { RootState, AppDispatch } from "../services/store";

export function ProfilePage() {
  const dispatch: AppDispatch = useDispatch();
  const userStore = useSelector((store: RootState) => store.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChanged, setChanged] = useState(false);

  const onChangeName = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
    setChanged(true);
  };
  const onChangeEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
    setChanged(true);
  };
  const onChangePassword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
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

  const onFormSubmit = (e: { preventDefault: () => void }) => {
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
    <div className={commonStyles.row}>
      <Menu />
      {userStore.user && (
        <div className={commonStyles.inputs}>
          <form onSubmit={onFormSubmit} className={commonStyles.form}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={onChangeName}
              value={name}
              extraClass="pb-6"
            />
            <EmailInput
              onChange={onChangeEmail}
              value={email}
              name={"email"}
              extraClass="pb-6"
            />
            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={"password"}
              extraClass="pb-6"
            />
            {isChanged && (
              <div>
                <Button type="primary" size="medium" htmlType="submit">
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
        </div>
      )}
      <p className="text text_type_main-medium p-6">{userStore.message}</p>
    </div>
  );
}
