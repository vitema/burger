import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../services/store";

import { sendLogout } from "../../services/actions/auth/logout";

import styles from "./menu.module.css";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logoutStore = useSelector((store:RootState) => store.logout);

  const history = useHistory();

  const logout = () => {
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

      <p className="text text_type_main-medium p-6">{logoutStore.message}</p>
    </div>
  );
};

export default Menu;
