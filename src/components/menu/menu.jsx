import {NavLink} from  'react-router-dom';

import styles from "./menu.module.css";

const Menu = () => {
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

      <NavLink
        to={{ pathname: `` }}
        className={styles.link}
        activeClassName={styles.active}
      >
         <p className="text text_type_main-medium pb-6">Выход</p>
      </NavLink>
    </div>
  );
};

export default Menu;
