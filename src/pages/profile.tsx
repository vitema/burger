import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./page.module.css";

import Menu from "../components/menu/menu";

import { getUser, updateUser } from "../services/actions/auth/user";
import { IUser } from "../types/auth-types";

import { useForm } from "../hooks/useForm";

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((store) => store.user);

  const { values, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [isChanged, setChanged] = useState(false);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ [e.target.name]: e.target.value });
    setChanged(true);
  };

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userStore.user) {
      setValues({
        ...values,
        ["email"]: userStore.user.email,
        ["name"]: userStore.user.name,
      });
    }
  }, [userStore]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    save();
  };

  const save = (): void => {
    const postData: IUser = {
      email: values["email"],
      name: values["name"],
      password: values["password"],
    };
    dispatch<any>(updateUser(postData));
    setChanged(false);
  };

  const cancel = (): void => {
    dispatch<any>(getUser());
    setChanged(false);
    setValues({ password: "" });
  };

  return (
    <div className={commonStyles.row}>
      <Menu description={"В этом разделе вы можете изменить свои персональные данные"} />
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
              onChange={onChangeValue}
              value={values["name"]}
              extraClass="pb-6"
            />
            <EmailInput
              onChange={onChangeValue}
              value={values["email"]}
              name={"email"}
              extraClass="pb-6"
            />
            <PasswordInput
              onChange={onChangeValue}
              value={values["password"]}
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
