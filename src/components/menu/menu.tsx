import { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import { sendLogout } from "../../services/actions/auth/logout";

import styles from "./menu.module.css";

interface MenuProps {
  description: string;
}

const Menu: FC<MenuProps> = ({ description }) => {
  const dispatch = useAppDispatch();

  const logoutStore = useAppSelector((store) => store.logout);

  const history = useHistory();

  const logout = (): void => {
    dispatch<any>(sendLogout(toLoginCallBack));
  };

  const toLoginCallBack = () => {
    history.replace("/login");
  };

  return (
    <div className={styles.menu}>
      <NavLink
        to={{ pathname: `/profile` }}
        className={styles.link}
        activeClassName={styles.active}
      >
        <p className="text text_type_main-medium pb-6">Профиль</p>
      </NavLink>
      <NavLink
        to={{ pathname: `/profile/orders` }}
        className={styles.link}
        activeClassName={styles.active}
      >
        <p className="text text_type_main-medium pb-6">История заказов</p>
      </NavLink>

      <div className={styles.link} onClick={logout}>
        <p className="text text_type_main-medium pb-6 link">Выход</p>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        {description}
      </p>
      <p className="text text_type_main-medium p-6">{logoutStore.message}</p>
    </div>
  );
};

export default Menu;
