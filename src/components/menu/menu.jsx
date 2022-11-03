import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendLogout } from "../../services/actions/auth/logout";
import { deleteTokens } from "../../utils/cookie";

import styles from "./menu.module.css";
import { useEffect } from "react";

const Menu = () => {
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);

  const history = useHistory();

  const logout = () => {
    dispatch(sendLogout());

    deleteTokens(); 
    history.replace("/login");
  };

  // useEffect(() => {
  //   if (auth.success) {
  //     history.replace("/login");
  //   }
  // }, [auth]);

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
