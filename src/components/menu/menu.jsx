import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendLogout } from "../../services/actions/auth/logout";

import styles from "./menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(sendLogout());
    history.replace("/");
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
    </div>
  );
};

export default Menu;
